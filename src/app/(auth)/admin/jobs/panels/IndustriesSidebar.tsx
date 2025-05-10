import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import CellOptions from "@/components/UI/CellOptions";
import { Eye, Trash } from "lucide-react";
const ADD_INDUSTRY_URL =
  "http://34.70.58.31/api/v1.0.0/admin/sys-configurations/industry";

type DataType = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _version: number;
  name: string;
};

const IndustriesSidebar: React.FC<{
  onSelect: (industry: string) => void;
  setIndustries: React.Dispatch<React.SetStateAction<DataType[]>>;
  selected: string;
  industriesData: DataType[];
  allCategoriesData: { [key: string]: DataType[] };
  setAllCategories: React.Dispatch<
    React.SetStateAction<{ [key: string]: DataType[] }>
  >;
}> = ({
  onSelect,
  selected,
  industriesData,
  setIndustries,
  setAllCategories,
}) => {
  const [newIndustry, setNewIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddIndustry = async () => {
    if (!newIndustry.trim()) return;
    if (industriesData.some((ind) => ind.name === newIndustry)) {
      setError("Industry already exists");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(ADD_INDUSTRY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newIndustry.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(
          response.status === 409
            ? "Industry already exists"
            : "Failed to create industry",
        );
      }

      const responseData = await response.json();

      // Add proper null checks here
      if (!responseData || !responseData.data) {
        throw new Error("Invalid response from server");
      }

      const newIndustryData: DataType = {
        id: responseData.data.id || Date.now().toString(), // Fallback ID if not provided
        name: responseData.data.name || newIndustry.trim(), // Fallback to input if name not in response
        created_at: responseData.data.created_at || new Date().toISOString(),
        updated_at: responseData.data.updated_at || new Date().toISOString(),
        deleted_at: responseData.data.deleted_at || null,
        _version: responseData.data._version || 1,
      };

      setIndustries((prev) => [...prev, newIndustryData]);
      setAllCategories((prev) => ({
        ...prev,
        [newIndustryData.name]: [],
      }));
      setNewIndustry("");
      setSuccess("Industry created successfully");
    } catch (err: any) {
      console.error("Error creating industry:", err);
      setError(err.message || "Failed to create industry");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteIndustry = async (industryToDelete: string) => {
    const industry = industriesData.find(
      (ind) => ind.name === industryToDelete,
    );
    if (!industry || !industry.id) {
      setError("Industry not found");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${ADD_INDUSTRY_URL}?id=${industry.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete industry");
      }

      setIndustries((prev) =>
        prev.filter((ind) => ind.name !== industryToDelete),
      );
      setAllCategories((prev) => {
        const newCategories = { ...prev };
        delete newCategories[industryToDelete];
        return newCategories;
      });
      setSuccess("Industry deleted successfully");
    } catch (err: any) {
      console.error("Error deleting industry:", err);
      setError(err.message || "Failed to delete industry");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl border bg-white p-3 shadow-soft lg:w-[300px]">
      <h3 className="mb-3 text-sm font-semibold md:text-lg">Industries</h3>
      <div className="mb-3 flex gap-2">
        <TextField
          size="small"
          value={newIndustry}
          onChange={(e) => setNewIndustry(e.target.value)}
          placeholder="New Industry"
          variant="outlined"
          fullWidth
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddIndustry();
            }
          }}
        />
        <IconButton
          className="rounded-lg bg-primary text-white hover:bg-black"
          onClick={handleAddIndustry}
        >
          <Add />
        </IconButton>
      </div>

      <List>
        {industriesData.map((industry) => {
          if (!industry || !industry.name) return null; // Skip invalid entries
          return (
            <ListItemButton
              className="mb-2 rounded-md"
              key={industry.id}
              selected={selected === industry.name}
              onClick={() => onSelect(industry.id)}
              disabled={isLoading}
              sx={{
                backgroundColor:
                  selected === industry.id
                    ? "#2ba149 !important"
                    : "transparent",
                color: selected === industry.id ? "white" : "inherit",
                "&:hover": {
                  backgroundColor:
                    selected === industry.id ? "#258c3c" : "#f0f0f0",
                },
              }}
            >
              <ListItemText primary={industry.name} />
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
                    action: () => handleDeleteIndustry(industry.name),
                  },
                ]}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* Error and success notifications */}
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

export default IndustriesSidebar;
