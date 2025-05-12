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
} from "@mui/material";
import { Add } from "@mui/icons-material";
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
  const [specialties, setSpecialties] = useState<Category[]>([]);
  const [careerLevels, setCareerLevels] = useState<Category[]>([]);
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
    [key: string]: Specialty[];
  }>({});
  const [checkedLevels, setCheckedLevels] = useState<{
    [key: string]: string[];
  }>({});

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
  // Fetch initial categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading((prev) => ({ ...prev, initial: true }));
        setError(null);

        const response = await fetchWithRetry(API_GET_CATEGORIES);
        const categoriesData = response.data.map((category: any) => ({
          id: category.id,
          name: category.name,
        }));

        setCategories(categoriesData);
        if (categoriesData.length > 0) {
          setSelectedCategoryId(categoriesData[0].id);
        }
      } catch (err: any) {
        console.error("Error fetching categories:", err);
        setError(err.message || "Failed to load categories");
      } finally {
        setIsLoading((prev) => ({ ...prev, initial: false }));
      }
    };

    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

        // Parse JSON responses
        const specialtiesData = await specialtiesResponse.json();
        const levelsData = await levelsResponse.json();
        setSpecialties(specialtiesData.data);
        setCareerLevels(levelsData.data);
        // Validate responses
        if (!specialtiesData?.data || !levelsData?.data) {
          throw new Error("Invalid API response structure");
        }

        // Update categories state with  new data
        setCategories((prev) =>
          prev.map((category) =>
            category.id === selectedCategoryId
              ? {
                  ...category,
                  specialties: specialtiesData.data.map((spec: any) => ({
                    id: spec.id,
                    created_at: spec.created_at,
                    updated_at: spec.updated_at,
                    deleted_at: spec.deleted_at,
                    _version: spec._version,
                    name: spec.name,
                  })),
                  careerLevels: levelsData.data.map((level: any) => ({
                    id: level.id,
                    created_at: level.created_at,
                    updated_at: level.updated_at,
                    deleted_at: level.deleted_at,
                    _version: level._version,
                    name: level.name,
                  })),
                }
              : category,
          ),
        );
      } catch (err: any) {
        console.error("Error fetching category details:", err);
        setError(err.message || "Failed to load category details");
      } finally {
        setIsLoading((prev) => ({ ...prev, action: false }));
      }
    };
    const fetchIndustries = async () => {
      try {
        const response = await fetch(API_GET_INDUSTRIES);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch industries");
        }

        const { data } = await response.json();
        setIndustries(data); // Assuming API returns: { data: [{ id, name }, ...] }
      } catch (err: any) {
        console.error("Error fetching industries:", err);
      }
    };
    fetchIndustries();
    fetchCategoryDetails();
  }, [selectedCategoryId]);

  console.log(careerLevels);
  console.log(specialties);
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
          // "Authorization": `Bearer ${yourToken}`, // Uncomment if authorization is needed
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
      console.log("New category response:", result); // Check the full response

      // Ensure the response structure is as expected
      const newCategory = result?.data; // Safeguard in case the data is nested

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

      setNewCategoryName(""); // Clear the input field after successful addition
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

  const handleCheckSpecialty = async (
    categoryId: string,
    specialty: Specialty,
  ) => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      // Optimistic update
      setCheckedSpecialties((prev) => {
        const existing = prev[categoryId] || [];
        const isChecked = existing.some((s) => s.id === specialty.id);
        return {
          ...prev,
          [categoryId]: isChecked
            ? existing.filter((s) => s.id !== specialty.id)
            : [...existing, specialty],
        };
      });

      // API call would go here
      // await api.checkSpecialty(categoryId, specialty.id, isSubSpecialty);

      setSuccess("Specialty updated successfully");
    } catch (err: any) {
      console.error("Error updating specialty:", err);
      setError(err.message || "Failed to update specialty");
      // Revert optimistic update
      setCheckedSpecialties((prev) => prev);
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const handleCheckLevel = async (categoryId: string, levelId: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      // Optimistic update
      setCheckedLevels((prev) => {
        const existing = prev[categoryId] || [];
        const isChecked = existing.includes(levelId);
        return {
          ...prev,
          [categoryId]: isChecked
            ? existing.filter((id) => id !== levelId)
            : [...existing, levelId],
        };
      });

      // API call would go here
      // await api.checkLevel(categoryId, levelId);

      setSuccess("Career level updated successfully");
    } catch (err: any) {
      console.error("Error updating level:", err);
      setError(err.message || "Failed to update level");
      // Revert optimistic update
      setCheckedLevels((prev) => prev);
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const handleAddSpecialty = async (categoryId: string, name: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      // Make the POST request
      const response = await fetch(API_CREATE_SPECIALITY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization if needed:
          // Authorization: `Bearer ${yourToken}`,
        },
        body: JSON.stringify({ categoryId, name }),
      });

      if (!response.ok) {
        throw new Error("Failed to add specialty");
      }

      const newSpecialty = await response.json();

      // Update local state
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
                    subSpecialties: newSpecialty.subSpecialties || [],
                  },
                ],
              }
            : cat,
        ),
      );

      setSuccess("Specialty added successfully");
    } catch (err: any) {
      console.error("Error adding specialty:", err);
      setError(err?.message || "Failed to add specialty");
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  console.log(careerLevels);
  console.log(specialties);
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
          categoriesIds: [categoryId], // must be an array
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
          // Authorization: `Bearer ${yourToken}`, // if required
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete level");
      }

      // Update local state
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
            // Authorization: `Bearer ${yourToken}`, // if required
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete Specialty");
      }

      // Update local state
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

      setSuccess("Specialty deleted successfully");
    } catch (err: any) {
      console.error("Error deleting Specialty:", err);
      setError(err.message || "Failed to delete Specialty");
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  console.log(checkedSpecialties);
  console.log(checkedLevels);
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
            >
              <Add />
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
              categoriesData={categories}
              checkedItems={checkedSpecialties}
              onCheck={handleCheckSpecialty}
              isLoading={isLoading.action}
              onAddSpecialty={handleAddSpecialty}
              onDeleteSpecialty={handleDeleteSpecialty}
            />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <CareerLevels
              categoryId={selectedCategoryId}
              categoriesData={categories}
              checkedItems={checkedLevels}
              onCheck={handleCheckLevel}
              onAddLevel={handleAddLevel}
              onDeleteLevel={handleDeleteLevel}
              isLoading={isLoading.action}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
