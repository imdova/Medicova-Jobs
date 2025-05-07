import React, { useState, useEffect } from "react";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import CellOptions from "@/components/UI/CellOptions";
import { Eye, Trash } from "lucide-react";

type DataType = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _version: number;
  name: string;
};

const API_BASE_URL = "http://34.70.58.31/api/v1.0.0/admin/sys-configurations";

const CategoryManagement: React.FC<{
  industry: string;
  industriesData: DataType[];
  setIndustries: React.Dispatch<React.SetStateAction<DataType[]>>;
  checkedCategories: { [key: string]: string[] };
  setCheckedCategories: React.Dispatch<
    React.SetStateAction<{ [key: string]: string[] }>
  >;
  setAllCategories: React.Dispatch<
    React.SetStateAction<{ [key: string]: DataType[] }>
  >;
}> = ({
  industry,
  industriesData,
  checkedCategories,
  setCheckedCategories,
  setAllCategories,
}) => {
  const [categories, setCategories] = useState<DataType[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Safely get industry data with null checks
  const industryData = React.useMemo(() => {
    return industriesData?.find((ind) => ind?.id === industry) || null;
  }, [industriesData, industry]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!industry) {
        setError("No industry selected");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/category/industries?ids=${industry}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(Array.isArray(data?.data) ? data.data : []);
      } catch (err: any) {
        console.error("Error fetching categories:", err);
        setError(err.message || "Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [industry]);

  useEffect(() => {
    if (industry) {
      setAllCategories((prev) => ({
        ...prev,
        [industry]: categories,
      }));

      const savedChecked = localStorage.getItem("checkedCategories");
      if (savedChecked) {
        try {
          setCheckedCategories(JSON.parse(savedChecked));
        } catch (e) {
          console.error("Error parsing checked categories", e);
        }
      }
    }
  }, [categories, industry, setAllCategories, setCheckedCategories]);

  useEffect(() => {
    localStorage.setItem(
      "checkedCategories",
      JSON.stringify(checkedCategories),
    );
  }, [checkedCategories]);

  const handleToggle = (categoryId: string) => {
    if (!industry) return;

    setCheckedCategories((prev) => {
      const updatedChecked = prev[industry] ? [...prev[industry]] : [];
      if (updatedChecked.includes(categoryId)) {
        return {
          ...prev,
          [industry]: updatedChecked.filter((c) => c !== categoryId),
        };
      } else {
        return { ...prev, [industry]: [...updatedChecked, categoryId] };
      }
    });
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    if (!industry) {
      setError("Please select an industry first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newCategory.trim(),
          industries: [industry],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const data = await response.json();
      const newCategoryData = data?.data;

      if (!newCategoryData?.id) {
        throw new Error("Invalid category data received");
      }

      setCategories((prev) => [...prev, newCategoryData]);
      setNewCategory("");
      setSuccess("Category added successfully");
    } catch (err: any) {
      console.error("Error adding category:", err);
      setError(err.message || "Failed to add category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/category?id=${categoryId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));

      setCheckedCategories((prev) => {
        if (!industry) return prev;
        const updatedChecked = prev[industry]
          ? prev[industry].filter((c) => c !== categoryId)
          : [];
        return { ...prev, [industry]: updatedChecked };
      });

      setSuccess("Category deleted successfully");
    } catch (err: any) {
      console.error("Error deleting category:", err);
      setError(err.message || "Failed to delete category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 rounded-xl border bg-white p-3">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h3 className="mb-3 w-full text-sm font-semibold md:text-lg">
          {industryData?.name
            ? `Manage Categories for ${industryData.name}`
            : "Select an industry to manage categories"}
        </h3>

        {industry && (
          <div className="flex w-full gap-2">
            <TextField
              size="small"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category"
              variant="outlined"
              fullWidth
              className="w-full md:min-w-[200px]"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddCategory();
                }
              }}
            />
            <IconButton
              className="rounded-lg bg-primary text-white hover:bg-black"
              onClick={handleAddCategory}
            >
              <Add />
            </IconButton>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center p-4">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="p-2 text-red-500">{error}</div>
      ) : !industry ? (
        <div className="p-4 text-gray-500">
          Please select an industry to view or manage categories
        </div>
      ) : categories.length === 0 ? (
        <div className="p-4 text-gray-500">
          No categories found for this industry
        </div>
      ) : (
        <List>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              secondaryAction={
                <CellOptions
                  item={undefined}
                  options={[
                    {
                      label: "View",
                      icon: <Eye className="h-4 w-4" />, // optional icon
                      action: (item) => console.log("Viewing", item),
                    },
                    {
                      label: "Delete",
                      icon: <Trash className="h-4 w-4 text-red-500" />,
                      action: () => handleDeleteCategory(category.id),
                    },
                  ]}
                />
              }
            >
              <ListItemIcon>
                <Checkbox
                  checked={
                    checkedCategories[industry]?.includes(category.id) || false
                  }
                  onChange={() => handleToggle(category.id)}
                  disabled={isLoading}
                />
              </ListItemIcon>
              <ListItemText primary={category.name || "Unnamed Category"} />
            </ListItem>
          ))}
        </List>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CategoryManagement;
