import React, { useState, useEffect } from "react";
import {
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import { Add, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Eye, Trash } from "lucide-react";
import CellOptions from "@/components/UI/CellOptions";
import { Category } from "./Categories";
import useFetch from "@/hooks/useFetch";
import SpecialtyFetcher from "../../components/jobs/SpecialtyFetcher";
import { SpecialtyItem } from "@/types";

type Specialty = { id: string; name: string };

type CategoryData = { id: string; name: string; specialties: Specialty[] };

interface SpecialtiesListProps {
  categoriesData: CategoryData[];
  categoryId: string;
  checkedItems: { [key: string]: Specialty[] };
  onCheck: (categoryId: string, specialty: Specialty) => void;
  isLoading?: boolean;
  onAddSpecialty: (categoryId: string, name: string) => Promise<void>;
  onDeleteSpecialty: (specialtyId: string, categoryId: string) => Promise<void>;
}

const SpecialtiesList: React.FC<SpecialtiesListProps> = ({
  categoriesData,
  categoryId,
  checkedItems,
  onCheck,
  isLoading = false,
  onAddSpecialty,
  onDeleteSpecialty,
}) => {
  const [newSpecialties, setNewSpecialties] = useState<{
    [key: string]: string;
  }>({});
  const [newSpecialtiesId, setNewSpecialtiesId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState({
    addSpecialty: false,
    deleteSpecialty: false,
  });
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const categoryData = categoriesData.find((cat) => cat.id === categoryId);

  // Effect to initialize expanded state
  useEffect(() => {
    if (categoryId) {
      // Expand the selected category
      setExpandedCategories((prev) => ({ ...prev, [categoryId]: true }));
      setNewSpecialtiesId(categoryId);
    }
  }, [categoryId]);

  const handleCategoryToggle = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
    setNewSpecialtiesId(categoryId);
  };

  const handleAddSpecialty = async (categoryId: string) => {
    const newName = newSpecialties[categoryId]?.trim();
    if (!newName) return;

    try {
      setLocalLoading((prev) => ({ ...prev, addSpecialty: true }));
      await onAddSpecialty(categoryId, newName);
      setNewSpecialties((prev) => ({ ...prev, [categoryId]: "" }));
      setSuccess("Specialty added successfully");
    } catch (err: any) {
      setError(err.message || "Failed to add specialty");
    } finally {
      setLocalLoading((prev) => ({ ...prev, addSpecialty: false }));
    }
  };

  const handleDeleteSpecialty = async (specialtyId: string) => {
    try {
      setLocalLoading((prev) => ({ ...prev, deleteSpecialty: true }));
      await onDeleteSpecialty(specialtyId, categoryId);
      setSuccess("Specialty deleted successfully");
    } catch (err: any) {
      setError(err.message || "Failed to delete specialty");
    } finally {
      setLocalLoading((prev) => ({ ...prev, deleteSpecialty: false }));
    }
  };

  const handleToggleAllSpecialties = (
    categoryId: string,
    specialties: SpecialtyItem[],
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.stopPropagation();
    const currentChecked = checkedItems[categoryId] || [];
    const allChecked = currentChecked.length === specialties.length;

    if (allChecked) {
      // Uncheck all
      currentChecked.forEach((specialty) => {
        onCheck(categoryId, specialty);
      });
    } else {
      // Check all
      specialties.forEach((specialty) => {
        if (!currentChecked.some((s) => s.id === specialty.id)) {
          onCheck(categoryId, specialty);
        }
      });
    }
  };

  const isCategoryAllChecked = (
    categoryId: string,
    specialties: SpecialtyItem[],
  ): boolean => {
    if (!specialties || specialties.length === 0) return false;
    const currentChecked = checkedItems[categoryId] || [];
    return currentChecked.length === specialties.length;
  };

  const isCategoryIndeterminate = (
    categoryId: string,
    specialties: SpecialtyItem[],
  ): boolean => {
    if (!specialties || specialties.length === 0) return false;
    const currentChecked = checkedItems[categoryId] || [];
    return (
      currentChecked.length > 0 && currentChecked.length < specialties.length
    );
  };

  return (
    <div className="h-full rounded-xl border bg-white p-4 shadow-soft">
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>

      <div className="">
        <h3 className="mb-3 font-semibold">
          Manage Specialties for {categoryData?.name}
        </h3>

        {/* Add Specialty Input */}
        <div className="mb-3 flex gap-2">
          <TextField
            size="small"
            value={newSpecialties[newSpecialtiesId] || ""}
            onChange={(e) =>
              setNewSpecialties((prev) => ({
                ...prev,
                [newSpecialtiesId]: e.target.value,
              }))
            }
            placeholder="New Specialty"
            variant="outlined"
            fullWidth
            disabled={isLoading || localLoading.addSpecialty}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSpecialty(newSpecialtiesId);
              }
            }}
          />
          <IconButton
            className="rounded-lg bg-primary text-white hover:bg-black"
            onClick={() => handleAddSpecialty(newSpecialtiesId)}
            disabled={isLoading || localLoading.addSpecialty}
          >
            {localLoading.addSpecialty ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <Add />
            )}
          </IconButton>
        </div>
      </div>
      {categoriesData.map((category) => {
        const isExpanded = expandedCategories[category.id];

        return (
          <div
            key={category.id}
            className="mb-4 rounded-md border bg-white p-2 shadow-sm"
          >
            {/* Category Header */}
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => handleCategoryToggle(category.id)}
            >
              <div className="flex items-center">
                <SpecialtyFetcher categoryId={category.id}>
                  {({ data: specialties }) => {
                    if (!specialties) return null;

                    return (
                      <Checkbox
                        checked={isCategoryAllChecked(category.id, specialties)}
                        indeterminate={isCategoryIndeterminate(
                          category.id,
                          specialties,
                        )}
                        onChange={(e) =>
                          handleToggleAllSpecialties(
                            category.id,
                            specialties,
                            e,
                          )
                        }
                        onClick={(e) => e.stopPropagation()}
                      />
                    );
                  }}
                </SpecialtyFetcher>
                <h3 className="font-semibold">{category.name}</h3>
              </div>
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </div>

            {isExpanded && (
              <div className="mt-2">
                <SpecialtyFetcher categoryId={category.id}>
                  {({ data: specialties, loading, error, refresh }) => {
                    if (loading) {
                      return (
                        <div className="flex justify-center p-4">
                          <CircularProgress size={24} />
                        </div>
                      );
                    }

                    if (error) {
                      return (
                        <Alert severity="error" className="mb-2">
                          Failed to load specialties
                          <Button
                            onClick={refresh}
                            size="small"
                            className="ml-2"
                          >
                            Retry
                          </Button>
                        </Alert>
                      );
                    }

                    if (!specialties || specialties.length === 0) {
                      return (
                        <Alert severity="info">No specialties found</Alert>
                      );
                    }

                    return (
                      <>
                        <List className="max-h-[300px] overflow-y-auto">
                          {specialties.map((specialty) => {
                            const isChecked =
                              checkedItems[category.id]?.some(
                                (s) => s.id === specialty.id,
                              ) || false;
                            return (
                              <ListItemButton
                                key={specialty.id}
                                className="mb-2"
                                dense
                                onClick={() => onCheck(category.id, specialty)}
                              >
                                <ListItemIcon>
                                  <Checkbox
                                    edge="start"
                                    checked={isChecked}
                                    tabIndex={-1}
                                    disableRipple
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={specialty.name}
                                  secondary={category.name}
                                />
                                <CellOptions
                                  item={specialty}
                                  options={[
                                    {
                                      label: "View",
                                      icon: <Eye className="h-4 w-4" />,
                                      action: () =>
                                        console.log("Viewing", specialty),
                                    },
                                    {
                                      label: "Delete",
                                      icon: (
                                        <Trash className="h-4 w-4 text-red-500" />
                                      ),
                                      action: () =>
                                        handleDeleteSpecialty(specialty.id),
                                    },
                                  ]}
                                />
                              </ListItemButton>
                            );
                          })}
                        </List>
                      </>
                    );
                  }}
                </SpecialtyFetcher>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SpecialtiesList;
