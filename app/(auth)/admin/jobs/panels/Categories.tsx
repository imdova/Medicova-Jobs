import React, { useEffect, useState } from "react";
import CategoriesSidebar from "./CategoriesSidebar";
import SpecialtiesList from "./SpecialtiesList";
import CareerLevels from "./CareerLevels";
import {
  TextField,
  IconButton,
  Alert,
  Snackbar,
  Box,
  FormControl,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { Add, Save, RestartAlt } from "@mui/icons-material";
import {
  API_CREATE_CAREER_LEVEL,
  API_CREATE_CATEGORY,
  API_CREATE_SPECIALITY,
  API_DELETE_CAREER_LEVEL,
  API_DELETE_CATEGORY,
  API_DELETE_SPECIALITY,
  API_GET_CAREER_LEVELS_BY_CATEGORY,
  API_GET_CATEGORIES,
  API_GET_INDUSTRIES,
  API_GET_SPECIALITIES_BY_CATEGORY,
} from "@/api/admin";

export type Specialty = {
  id: string;
  name: string;
};

export type CareerLevel = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
  specialties: Specialty[];
  careerLevels: CareerLevel[];
};

const Categories: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [careerLevels, setCareerLevels] = useState<CareerLevel[]>([]);
  const [industries, setIndustries] = useState<{ id: string; name: string }[]>(
    [],
  );

  const [newCategoryName, setNewCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState({
    initial: true,
    action: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [checkedSpecialties, setCheckedSpecialties] = useState<{
    [key: string]: string[];
  }>({});
  const [checkedLevels, setCheckedLevels] = useState<{
    [key: string]: string[];
  }>({});

  // Store initial checked states for reset functionality
  const [initialCheckedStates, setInitialCheckedStates] = useState<{
    specialties: { [key: string]: string[] };
    levels: { [key: string]: string[] };
  }>({ specialties: {}, levels: {} });

  // Fetch data with retry logic
  const fetchWithRetry = async (url: string, retries = 3): Promise<any> => {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (err) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return fetchWithRetry(url, retries - 1);
      }
      throw err;
    }
  };

  // Fetch all data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading((prev) => ({ ...prev, initial: true }));
        setError(null);

        // Fetch categories
        const categoriesResponse = await fetchWithRetry(API_GET_CATEGORIES);
        const categoriesData = categoriesResponse.data.map((category: any) => ({
          id: category.id,
          name: category.name,
          specialties: [],
          careerLevels: [],
        }));

        setCategories(categoriesData);

        // Fetch industries
        const industriesResponse = await fetch(API_GET_INDUSTRIES);
        if (!industriesResponse.ok) {
          throw new Error("Failed to fetch industries");
        }
        const industriesData = await industriesResponse.json();
        setIndustries(industriesData.data);

        if (categoriesData.length > 0) {
          setSelectedCategoryId(categoriesData[0].id);
        }
      } catch (err: any) {
        console.error("Error fetching initial data:", err);
        setError(err.message || "Failed to load initial data");
      } finally {
        setIsLoading((prev) => ({ ...prev, initial: false }));
      }
    };

    fetchInitialData();
  }, []);

  // Fetch specialties and career levels when category is selected
  useEffect(() => {
    if (!selectedCategoryId) return;

    const fetchCategoryDetails = async () => {
      try {
        setIsLoading((prev) => ({ ...prev, action: true }));
        setError(null);

        const [specialtiesResponse, levelsResponse] = await Promise.all([
          fetch(`${API_GET_SPECIALITIES_BY_CATEGORY}${selectedCategoryId}`),
          fetch(
            `${API_GET_CAREER_LEVELS_BY_CATEGORY}?ids=${selectedCategoryId}`,
          ),
        ]);

        if (!specialtiesResponse.ok || !levelsResponse.ok) {
          throw new Error("Failed to fetch category details");
        }

        const specialtiesData = await specialtiesResponse.json();
        const levelsData = await levelsResponse.json();

        setSpecialties(specialtiesData.data);
        setCareerLevels(levelsData.data);

        // Update categories state with new data
        setCategories((prev) =>
          prev.map((category) =>
            category.id === selectedCategoryId
              ? {
                  ...category,
                  specialties: specialtiesData.data,
                  careerLevels: levelsData.data,
                }
              : category,
          ),
        );

        // Check all specialties and career levels by default when category is selected
        const allSpecialtyIds = specialtiesData.data.map(
          (spec: Specialty) => spec.id,
        );
        const allLevelIds = levelsData.data.map(
          (level: CareerLevel) => level.id,
        );

        setCheckedSpecialties((prev) => ({
          ...prev,
          [selectedCategoryId]: allSpecialtyIds,
        }));

        setCheckedLevels((prev) => ({
          ...prev,
          [selectedCategoryId]: allLevelIds,
        }));

        // Save initial checked states for reset functionality
        setInitialCheckedStates({
          specialties: {
            ...initialCheckedStates.specialties,
            [selectedCategoryId]: allSpecialtyIds,
          },
          levels: {
            ...initialCheckedStates.levels,
            [selectedCategoryId]: allLevelIds,
          },
        });
      } catch (err: any) {
        console.error("Error fetching category details:", err);
        setError(err.message || "Failed to load category details");
      } finally {
        setIsLoading((prev) => ({ ...prev, action: false }));
      }
    };

    fetchCategoryDetails();
  }, [selectedCategoryId]);

  const handleAddCategory = async () => {
    const trimmedName = newCategoryName.trim();
    if (!trimmedName || !selectedIndustryId) {
      setError("Category name and industry are required");
      return;
    }

    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      const response = await fetch(API_CREATE_CATEGORY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          industries: [selectedIndustryId],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add category");
      }

      const result = await response.json();
      const newCategory = result?.data;

      if (!newCategory || !newCategory.id || !newCategory.name) {
        throw new Error("Invalid category data from the API");
      }

      setCategories((prev) => [
        ...prev,
        {
          id: newCategory.id,
          name: newCategory.name,
          specialties: [],
          careerLevels: [],
        },
      ]);

      setNewCategoryName("");
      setSuccess("Category added successfully");
    } catch (err: any) {
      console.error("Error adding category:", err);
      setError(err.message || "Failed to add category");
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      const response = await fetch(`${API_DELETE_CATEGORY}?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete category");
      }

      setCategories((prev) => prev.filter((category) => category.id !== id));
      setSuccess("Category deleted successfully");

      if (selectedCategoryId === id) {
        setSelectedCategoryId(categories.length > 1 ? categories[0].id : "");
      }
    } catch (err: any) {
      console.error("Error deleting category:", err);
      setError(err.message || "Failed to delete category");
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const handleCheckSpecialty = (categoryId: string, specialtyId: string) => {
    setCheckedSpecialties((prev) => {
      const currentChecked = prev[categoryId] || [];
      const isChecked = currentChecked.includes(specialtyId);

      return {
        ...prev,
        [categoryId]: isChecked
          ? currentChecked.filter((id) => id !== specialtyId)
          : [...currentChecked, specialtyId],
      };
    });
  };

  const handleCheckLevel = (categoryId: string, levelId: string) => {
    setCheckedLevels((prev) => {
      const currentChecked = prev[categoryId] || [];
      const isChecked = currentChecked.includes(levelId);

      return {
        ...prev,
        [categoryId]: isChecked
          ? currentChecked.filter((id) => id !== levelId)
          : [...currentChecked, levelId],
      };
    });
  };

  const handleAddSpecialty = async (categoryId: string, name: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      const response = await fetch(API_CREATE_SPECIALITY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId, name }),
      });

      if (!response.ok) {
        throw new Error("Failed to add specialty");
      }

      const newSpecialty = await response.json();

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                specialties: [
                  ...cat.specialties,
                  {
                    id: newSpecialty.id,
                    name: newSpecialty.name,
                  },
                ],
              }
            : cat,
        ),
      );

      // Add the new specialty to checked items
      setCheckedSpecialties((prev) => ({
        ...prev,
        [categoryId]: [...(prev[categoryId] || []), newSpecialty.id],
      }));

      setSuccess("Specialty added successfully");
    } catch (err: any) {
      console.error("Error adding specialty:", err);
      setError(err?.message || "Failed to add specialty");
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const handleAddLevel = async (categoryId: string, name: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      const response = await fetch(API_CREATE_CAREER_LEVEL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoriesIds: [categoryId],
          name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message?.join?.(", ") || "Failed to add career level",
        );
      }

      const newLevel = await response.json();

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                careerLevels: [
                  ...cat.careerLevels,
                  {
                    id: newLevel.id,
                    name: newLevel.name,
                  },
                ],
              }
            : cat,
        ),
      );

      // Add the new level to checked items
      setCheckedLevels((prev) => ({
        ...prev,
        [categoryId]: [...(prev[categoryId] || []), newLevel.id],
      }));

      setSuccess("Career level added successfully");
    } catch (err: any) {
      console.error("Error adding level:", err);
      setError(err.message || "Failed to add level");
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const handleDeleteLevel = async (categoryId: string, levelId: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      const response = await fetch(`${API_DELETE_CAREER_LEVEL}?id=${levelId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete level");
      }

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                careerLevels: cat.careerLevels.filter((l) => l.id !== levelId),
              }
            : cat,
        ),
      );

      // Remove the deleted level from checked items
      setCheckedLevels((prev) => ({
        ...prev,
        [categoryId]: (prev[categoryId] || []).filter((id) => id !== levelId),
      }));

      setSuccess("Career level deleted successfully");
    } catch (err: any) {
      console.error("Error deleting level:", err);
      setError(err.message || "Failed to delete level");
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const handleDeleteSpecialty = async (
    categoryId: string,
    specialtyId: string,
  ) => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      const response = await fetch(
        `${API_DELETE_SPECIALITY}?id=${specialtyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete Specialty");
      }

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                specialties: cat.specialties.filter(
                  (l) => l.id !== specialtyId,
                ),
              }
            : cat,
        ),
      );

      // Remove the deleted specialty from checked items
      setCheckedSpecialties((prev) => ({
        ...prev,
        [categoryId]: (prev[categoryId] || []).filter(
          (id) => id !== specialtyId,
        ),
      }));

      setSuccess("Specialty deleted successfully");
    } catch (err: any) {
      console.error("Error deleting Specialty:", err);
      setError(err.message || "Failed to delete Specialty");
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      // Here you would typically make API calls to save the checked states
      // For now, we'll just show a success message

      setSuccess("Changes saved successfully");
    } catch (err: any) {
      console.error("Error saving changes:", err);
      setError(err.message || "Failed to save changes");
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const handleResetChanges = () => {
    if (!selectedCategoryId) return;

    setCheckedSpecialties((prev) => ({
      ...prev,
      [selectedCategoryId]: [
        ...(initialCheckedStates.specialties[selectedCategoryId] || []),
      ],
    }));

    setCheckedLevels((prev) => ({
      ...prev,
      [selectedCategoryId]: [
        ...(initialCheckedStates.levels[selectedCategoryId] || []),
      ],
    }));

    setSuccess("Changes reset successfully");
  };

  const selectedCategory = categories.find(
    (cat) => cat.id === selectedCategoryId,
  );

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-9">
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>

      <div className="col-span-4 rounded-xl border bg-white p-3 shadow-soft lg:col-span-3">
        <Box sx={{ flex: 1 }}>
          <Box sx={{ mb: 2, width: "100%" }}>
            <FormControl fullWidth size="small">
              <Select
                labelId="industry"
                value={selectedIndustryId}
                onChange={(e) => setSelectedIndustryId(e.target.value)}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select Industry
                </MenuItem>
                {industries.map((industry) => (
                  <MenuItem key={industry.id} value={industry.id}>
                    {industry.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <div className="flex gap-2">
            <TextField
              size="small"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New Category"
              variant="outlined"
              className="w-full"
              fullWidth
              disabled={isLoading.action}
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
            />
            <IconButton
              className="rounded-lg bg-primary text-white hover:bg-black"
              onClick={handleAddCategory}
              disabled={isLoading.action}
            >
              {isLoading.action ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <Add />
              )}
            </IconButton>
          </div>

          <CategoriesSidebar
            categoriesData={categories}
            selected={selectedCategoryId}
            onSelect={setSelectedCategoryId}
            onDeleteCategory={handleDeleteCategory}
            isLoading={isLoading.action}
          />
        </Box>
      </div>

      {selectedCategoryId && (
        <>
          <div className="col-span-1 lg:col-span-3">
            <SpecialtiesList
              categoryId={selectedCategoryId}
              specialties={selectedCategory?.specialties || []}
              checkedItems={checkedSpecialties[selectedCategoryId] || []}
              onCheck={handleCheckSpecialty}
              isLoading={isLoading.action}
              onAddSpecialty={handleAddSpecialty}
              onDeleteSpecialty={handleDeleteSpecialty}
            />
          </div>
          <div className="col-span-1 lg:col-span-3">
            {/* <CareerLevels
              categoryId={selectedCategoryId}
              levels={selectedCategory?.careerLevels || []}
              checkedItems={checkedLevels[selectedCategoryId] || []}
              onCheck={handleCheckLevel}
              onAddLevel={handleAddLevel}
              onDeleteLevel={handleDeleteLevel}
              isLoading={isLoading.action}
            /> */}

            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<RestartAlt />}
                onClick={handleResetChanges}
                disabled={isLoading.action}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSaveChanges}
                disabled={isLoading.action}
              >
                Save Changes
              </Button>
            </Box>
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
