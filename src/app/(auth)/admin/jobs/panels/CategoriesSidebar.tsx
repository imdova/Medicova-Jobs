import React from "react";
import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Eye, Trash } from "lucide-react";
import CellOptions from "@/components/UI/CellOptions";

type Category = {
  id: string; // Changed to string to match typical API IDs
  name: string;
};

interface CategoriesSidebarProps {
  categoriesData: Category[];
  selected: string;
  onSelect: (categoryId: string) => void;
  onDeleteCategory: (id: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({
  categoriesData,
  selected,
  onSelect,
  onDeleteCategory,
  error = null,
}) => {
  const handleCategorySelect = (categoryId: string, categoryName: string) => {
    // You can use either ID or name for selection depending on your needs
    onSelect(categoryId); // Changed to use ID for more reliable selection
  };

  if (error) {
    return (
      <div className="flex h-full items-center justify-center border-r p-4">
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  if (categoriesData.length === 0) {
    return (
      <div className="flex h-full items-center justify-center border-r p-4">
        <Typography>No categories available</Typography>
      </div>
    );
  }

  return (
    <div className="mt-4 h-full">
      <List>
        {categoriesData.map((category) => (
          <ListItemButton
            key={category.id}
            className="mb-2 rounded-md"
            selected={selected === category.id}
            onClick={() => handleCategorySelect(category.id, category.name)}
            sx={{
              backgroundColor:
                selected === category.id ? "#2ba149 !important" : "transparent",
              color: selected === category.id ? "white" : "inherit",
              "&:hover": {
                backgroundColor:
                  selected === category.id ? "#258c3c" : "#f0f0f0",
              },
              position: "relative",
            }}
          >
            <ListItemText
              primary={category.name}
              primaryTypographyProps={{
                fontWeight: selected === category.id ? "bold" : "normal",
              }}
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
                  action: () => onDeleteCategory(category.id),
                },
              ]}
            />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};

export default CategoriesSidebar;
