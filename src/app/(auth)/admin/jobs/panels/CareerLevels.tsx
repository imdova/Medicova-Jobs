import React, { useState } from "react";
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
import { Eye, Trash } from "lucide-react";
import CellOptions from "@/components/UI/CellOptions";

type CareerLevel = {
  id: string;
  name: string;
};

type CategoryData = {
  id: string;
  name: string;
  careerLevels: CareerLevel[];
};

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

  const categoryData = categoriesData.find((cat) => cat.id === categoryId);
  const careerLevels = categoryData?.careerLevels || [];

  const handleAddLevel = async () => {
    if (!newLevel.trim() || !categoryData) return;

    try {
      await onAddLevel(categoryId, newLevel.trim());
      setNewLevel("");
      setSuccess("Career level added successfully");
    } catch (err: any) {
      setError(err.message || "Failed to add career level");
    }
  };

  const handleDeleteLevel = async (levelId: string) => {
    try {
      await onDeleteLevel(categoryId, levelId);
      setSuccess("Career level deleted successfully");
    } catch (err: any) {
      setError(err.message || "Failed to delete career level");
    }
  };

  if (!categoryData) {
    return (
      <div className="h-full rounded-xl border bg-white p-4 shadow-sm">
        <Alert severity="warning">No category selected</Alert>
      </div>
    );
  }
  console.log(categoryData);
  console.log(checkedItems);
  return (
    <div className="h-full rounded-xl border bg-white p-4 shadow-sm">
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
          disabled={isLoading}
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
        >
          <Add />
        </IconButton>
      </div>

      {isLoading && careerLevels.length === 0 ? (
        <div className="flex justify-center p-4">
          <CircularProgress />
        </div>
      ) : careerLevels.length === 0 ? (
        <Alert severity="info">No career levels found</Alert>
      ) : (
        <List>
          {careerLevels.map((level) => (
            <ListItem
              className="mb-2 p-0"
              key={level.id}
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
                  disabled={isLoading}
                />
              </ListItemIcon>
              <ListItemText primary={level.name} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default CareerLevels;
