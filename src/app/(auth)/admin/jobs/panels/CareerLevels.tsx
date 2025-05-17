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

  // Effect to check all career levels when category changes
  useEffect(() => {
    if (categoryId && careerLevels?.data) {
      const currentChecked = checkedItems[categoryId] || [];
      const allLevelsChecked = careerLevels.data.every((level) =>
        currentChecked.includes(level.id),
      );

      if (!allLevelsChecked) {
        careerLevels.data.forEach((level) => {
          if (!currentChecked.includes(level.id)) {
            onCheck(categoryId, level.id);
          }
        });
      }
    }
  }, [categoryId, careerLevels?.data, checkedItems, onCheck]);

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

    const currentChecked = checkedItems[categoryId] || [];
    const allChecked = careerLevels.data.every((level) =>
      currentChecked.includes(level.id),
    );

    careerLevels.data.forEach((level) => {
      const isChecked = currentChecked.includes(level.id);

      if (allChecked && isChecked) {
        onCheck(categoryId, level.id); // Uncheck
      } else if (!allChecked && !isChecked) {
        onCheck(categoryId, level.id); // Check
      }
    });
  };

  if (!categoryData) {
    return (
      <div className="shadow-soft h-full rounded-xl border bg-white p-4">
        <Alert severity="warning">No category selected</Alert>
      </div>
    );
  }

  return (
    <div className="shadow-soft h-full rounded-xl border bg-white p-4">
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
          className="bg-primary rounded-lg text-white hover:bg-black"
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
          <div className="mb-2">
            <Button
              variant="outlined"
              size="small"
              onClick={handleToggleAllLevels}
              disabled={isLoading}
            >
              {checkedItems[categoryId]?.length === careerLevels?.data.length
                ? "Uncheck All"
                : "Check All"}
            </Button>
          </div>
          <List>
            {careerLevels?.data.map((level) => (
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
                        icon: <Trash className="h-4 w-4 text-red-500" />,
                        action: () => handleDeleteLevel(level.id),
                      },
                    ]}
                  />
                }
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={
                      checkedItems[categoryId]?.includes(level.id) || false
                    }
                    onChange={() => onCheck(categoryId, level.id)}
                    disabled={isLoading || localLoading.delete}
                  />
                </ListItemIcon>
                <ListItemText primary={level.name} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );
};

export default CareerLevels;
