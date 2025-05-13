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
} from "@mui/material";
import { Add, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Eye, Trash } from "lucide-react";
import CellOptions from "@/components/UI/CellOptions";

type Specialty = {
  id: string;
  name: string;
};

type CategoryData = {
  id: string;
  name: string;
  specialties: Specialty[];
};

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
  const [newSpecialtiesId, setnewSpecialtiesId] = useState<string>("");
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

  const handleCategoryToggle = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
    setnewSpecialtiesId(categoryId);
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

  const handleCheckAll = (categoryId: string, specialties: Specialty[]) => {
    const alreadyCheckedIds = new Set(
      checkedItems[categoryId]?.map((s) => s.id),
    );
    const allChecked = specialties.every((s) => alreadyCheckedIds.has(s.id));

    specialties.forEach((s) => {
      const isChecked = alreadyCheckedIds.has(s.id);
      if (allChecked && isChecked) {
        // uncheck
        onCheck(categoryId, s);
      } else if (!allChecked && !isChecked) {
        // check
        onCheck(categoryId, s);
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
          >
            <Add />
          </IconButton>
        </div>
      </div>

      {categoriesData.map((category) => {
        const specialties = category.specialties || [];
        const isExpanded = expandedCategories[category.id];
        const checkedCount = checkedItems[category.id]?.length || 0;
        const allChecked =
          specialties.length > 0 && checkedCount === specialties.length;

        return (
          <div
            key={category.id}
            className="mb-4 rounded-md border bg-white p-2 shadow-sm"
          >
            {/* Header with toggle and "Check All" */}
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => handleCategoryToggle(category.id)}
            >
              <div className="flex items-center">
                <Checkbox
                  checked={allChecked}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent toggle
                    handleCheckAll(category.id, specialties);
                  }}
                />
                <h3 className="font-semibold">{category.name}</h3>
              </div>
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </div>

            {isExpanded && (
              <div className="mt-2">
                {/* Specialty List */}
                {specialties.length === 0 ? (
                  <Alert color="success" severity="info">
                    No specialties found
                  </Alert>
                ) : (
                  <List className="max-h-[300px] overflow-y-auto">
                    {specialties.map((specialty) => (
                      <ListItemButton key={specialty.id} className="mb-2">
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={
                              checkedItems[category.id]?.some(
                                (s) => s.id === specialty.id,
                              ) || false
                            }
                            onChange={() => onCheck(category.id, specialty)}
                            disabled={isLoading}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={specialty.name}
                          secondary={category.name}
                        />
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
                              action: () => handleDeleteSpecialty(specialty.id),
                            },
                          ]}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SpecialtiesList;
