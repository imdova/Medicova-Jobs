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
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { Eye, Trash } from "lucide-react";
import CellOptions from "@/components/UI/CellOptions";
import useFetch from "@/hooks/useFetch";
import CareerLevelFetcher from "../../components/jobs/CareerLevelFetcher";

type CareerLevel = { id: string; name: string };

type CategoryData = { id: string; name: string; careerLevels: CareerLevel[] };

interface CareerLevelsProps {
  categoryId: string;
  categoriesData: CategoryData[];
  checkedItems: { [key: string]: string[] };
  onCheck: (categoryId: string, levelId: string) => void;
  onAddLevel: (categoryId: string, levelName: string) => Promise<void>;
  onDeleteLevel: (categoryId: string, levelId: string) => Promise<void>;
  isLoading?: boolean;
}

const CareerLevels: React.FC<CareerLevelsProps> = ({
  categoryId,
  categoriesData,
  checkedItems,
  onCheck,
  onAddLevel,
  onDeleteLevel,
  isLoading = false,
}) => {
  const [newLevel, setNewLevel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState({
    add: false,
    delete: false,
  });

  const categoryData = categoriesData.find((cat) => cat.id === categoryId);
  const { data: careerLevels, loading } = useFetch<
    PaginatedResponse<CareerLevel>
  >(
    `https://medicova.site/api/v1.0.0/admin/sys-configurations/career-level/categories?ids=${categoryId}`,
  );

  // Get current checked items for this category
  const currentCheckedItems = checkedItems[categoryId] || [];

  const handleAddLevel = async () => {
    if (!newLevel.trim() || !categoryData) return;

    try {
      setLocalLoading((prev) => ({ ...prev, add: true }));
      setError(null);
      await onAddLevel(categoryId, newLevel.trim());
      setNewLevel("");
      setSuccess("Career level added successfully");
    } catch (err: any) {
      setError(err.message || "Failed to add career level");
    } finally {
      setLocalLoading((prev) => ({ ...prev, add: false }));
    }
  };

  const handleDeleteLevel = async (levelId: string) => {
    try {
      setLocalLoading((prev) => ({ ...prev, delete: true }));
      setError(null);
      await onDeleteLevel(categoryId, levelId);
      setSuccess("Career level deleted successfully");
    } catch (err: any) {
      setError(err.message || "Failed to delete career level");
    } finally {
      setLocalLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  const handleToggleAllLevels = () => {
    if (!careerLevels?.data) return;

    const allCurrentlyChecked = careerLevels.data.every((level) =>
      currentCheckedItems.includes(level.id),
    );

    if (allCurrentlyChecked) {
      // Uncheck all
      careerLevels.data.forEach((level) => {
        if (currentCheckedItems.includes(level.id)) {
          onCheck(categoryId, level.id);
        }
      });
    } else {
      // Check all
      careerLevels.data.forEach((level) => {
        if (!currentCheckedItems.includes(level.id)) {
          onCheck(categoryId, level.id);
        }
      });
    }
  };

  if (!categoryData) {
    return (
      <div className="h-full rounded-xl border bg-white p-4 shadow-soft">
        <Alert severity="warning">No category selected</Alert>
      </div>
    );
  }

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

      <h3 className="mb-3 font-semibold">
        Manage Career Levels for {categoryData.name}
      </h3>

      <div className="mb-4 flex gap-2">
        <TextField
          size="small"
          value={newLevel}
          onChange={(e) => setNewLevel(e.target.value)}
          placeholder="New Career Level"
          variant="outlined"
          fullWidth
          disabled={isLoading || localLoading.add}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddLevel();
            }
          }}
        />
        <IconButton
          className="rounded-lg bg-primary text-white hover:bg-black"
          onClick={handleAddLevel}
          disabled={isLoading || localLoading.add}
        >
          {localLoading.add ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <Add />
          )}
        </IconButton>
      </div>

      {loading ? (
        <div className="flex justify-center p-4">
          <CircularProgress />
        </div>
      ) : careerLevels?.data.length === 0 ? (
        <Alert severity="info">No career levels found</Alert>
      ) : (
        <>
          <List>
            <CareerLevelFetcher categoryId={categoryId}>
              {({
                data: careerLevels,
                loading: levelsLoading,
                error,
                refresh,
              }) => {
                if (levelsLoading) {
                  return (
                    <div className="flex justify-center p-4">
                      <CircularProgress size={24} />
                    </div>
                  );
                }

                if (error) {
                  return (
                    <Alert severity="error" className="mb-2">
                      Failed to load career levels
                      <Button onClick={refresh} size="small" className="ml-2">
                        Retry
                      </Button>
                    </Alert>
                  );
                }

                if (!careerLevels || careerLevels.length === 0) {
                  return <Alert severity="info">No career levels found</Alert>;
                }

                return (
                  <List className="max-h-[300px] overflow-y-auto">
                    {careerLevels.map((level) => (
                      <ListItem
                        className="mb-2 p-0"
                        key={level.id}
                        secondaryAction={
                          <CellOptions
                            item={level}
                            options={[
                              {
                                label: "View",
                                icon: <Eye className="h-4 w-4" />,
                                action: () => console.log("Viewing", level),
                              },
                              {
                                label: "Delete",
                                icon: (
                                  <Trash className="h-4 w-4 text-red-500" />
                                ),
                                action: () => handleDeleteLevel(level.id),
                              },
                            ]}
                          />
                        }
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={currentCheckedItems.includes(level.id)}
                            onChange={() => onCheck(categoryId, level.id)}
                            disabled={isLoading || localLoading.delete}
                          />
                        </ListItemIcon>
                        <ListItemText primary={level.name} />
                      </ListItem>
                    ))}
                  </List>
                );
              }}
            </CareerLevelFetcher>
          </List>
        </>
      )}
    </div>
  );
};

export default CareerLevels;
