import React, { useState } from "react";
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
import {
  Add,
  ExpandLess,
  ExpandMore,
  Save,
  RestartAlt,
} from "@mui/icons-material";
import { Eye, Trash } from "lucide-react";
import CellOptions from "@/components/UI/CellOptions";

type Specialty = {
  id: string;
  name: string;
};

interface SpecialtiesListProps {
  categoryId: string;
  specialties: Specialty[];
  checkedItems: string[];
  onCheck: (categoryId: string, specialtyId: string) => void;
  isLoading?: boolean;
  onAddSpecialty: (categoryId: string, name: string) => Promise<void>;
  onDeleteSpecialty: (categoryId: string, specialtyId: string) => Promise<void>;
  onSaveChanges?: () => void;
  onResetChanges?: () => void;
}

const SpecialtiesList: React.FC<SpecialtiesListProps> = ({
  categoryId,
  specialties,
  checkedItems,
  onCheck,
  isLoading = false,
  onAddSpecialty,
  onDeleteSpecialty,
  onSaveChanges,
  onResetChanges,
}) => {
  const [newSpecialtyName, setNewSpecialtyName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState({
    add: false,
    delete: false,
  });

  const handleAddSpecialty = async () => {
    const name = newSpecialtyName.trim();
    if (!name) return;

    try {
      setLocalLoading((prev) => ({ ...prev, add: true }));
      await onAddSpecialty(categoryId, name);
      setNewSpecialtyName("");
      setSuccess("Specialty added successfully");
    } catch (err: any) {
      setError(err.message || "Failed to add specialty");
    } finally {
      setLocalLoading((prev) => ({ ...prev, add: false }));
    }
  };

  const handleDeleteSpecialty = async (specialtyId: string) => {
    try {
      setLocalLoading((prev) => ({ ...prev, delete: true }));
      await onDeleteSpecialty(categoryId, specialtyId);
      setSuccess("Specialty deleted successfully");
    } catch (err: any) {
      setError(err.message || "Failed to delete specialty");
    } finally {
      setLocalLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  const handleCheckAll = () => {
    const allChecked =
      specialties.length > 0 && checkedItems.length === specialties.length;

    specialties.forEach((specialty) => {
      const isChecked = checkedItems.includes(specialty.id);
      if ((allChecked && isChecked) || (!allChecked && !isChecked)) {
        onCheck(categoryId, specialty.id);
      }
    });
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

      <h3 className="mb-4 text-lg font-semibold">Specialties</h3>

      {/* Add Specialty Input */}
      <div className="mb-4 flex gap-2">
        <TextField
          size="small"
          value={newSpecialtyName}
          onChange={(e) => setNewSpecialtyName(e.target.value)}
          placeholder="New Specialty"
          variant="outlined"
          fullWidth
          disabled={isLoading || localLoading.add}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddSpecialty();
            }
          }}
        />
        <IconButton
          className="rounded-lg bg-primary text-white hover:bg-black"
          onClick={handleAddSpecialty}
          disabled={isLoading || localLoading.add}
        >
          {localLoading.add ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <Add />
          )}
        </IconButton>
      </div>

      {/* Check All button */}
      <div className="mb-4">
        <Button
          variant="outlined"
          onClick={handleCheckAll}
          disabled={isLoading || specialties.length === 0}
        >
          {checkedItems.length === specialties.length && specialties.length > 0
            ? "Uncheck All"
            : "Check All"}
        </Button>
      </div>

      {/* Specialties List */}
      {specialties.length === 0 ? (
        <Alert severity="info" className="mb-4">
          No specialties found for this category
        </Alert>
      ) : (
        <List className="max-h-[300px] overflow-y-auto rounded-md border">
          {specialties.map((specialty) => (
            <ListItemButton key={specialty.id} className="hover:bg-gray-50">
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checkedItems.includes(specialty.id)}
                  onChange={() => onCheck(categoryId, specialty.id)}
                  disabled={isLoading || localLoading.delete}
                />
              </ListItemIcon>
              <ListItemText primary={specialty.name} />
              <CellOptions
                item={specialty}
                options={[
                  {
                    label: "View",
                    icon: <Eye className="h-4 w-4" />,
                    action: () => console.log("Viewing", specialty),
                  },
                  {
                    label: "Delete",
                    icon: <Trash className="h-4 w-4 text-red-500" />,
                    action: () => handleDeleteSpecialty(specialty.id),
                  },
                ]}
              />
            </ListItemButton>
          ))}
        </List>
      )}

      {/* Save and Reset buttons */}
      {(onSaveChanges || onResetChanges) && (
        <div className="mt-4 flex justify-end gap-2">
          {onResetChanges && (
            <Button
              variant="outlined"
              startIcon={<RestartAlt />}
              onClick={onResetChanges}
              disabled={isLoading}
            >
              Reset
            </Button>
          )}
          {onSaveChanges && (
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={onSaveChanges}
              disabled={isLoading}
            >
              Save Changes
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SpecialtiesList;
