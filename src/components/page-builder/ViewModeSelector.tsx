import { Laptop, Smartphone, Tablet } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";

interface ViewModeSelectorProps {
  viewMode: "desktop" | "tablet" | "mobile";
  onViewModeChange: (mode: "desktop" | "tablet" | "mobile") => void;
}

export function ViewModeSelector({
  viewMode,
  onViewModeChange,
}: ViewModeSelectorProps) {
  return (
    <div className="flex gap-2">
      {[
        { mode: "desktop", icon: Laptop },
        { mode: "tablet", icon: Tablet },
        { mode: "mobile", icon: Smartphone },
      ].map(({ mode, icon: Icon }) => (
        <Button
          variant="outlined"
          key={mode}
          className={`border border-solid border-gray-200 ${
            viewMode === mode ? "bg-light-primary text-sm text-white hover:bg-light-primary" : ""
          }`}
          onClick={() =>
            onViewModeChange(mode as "desktop" | "tablet" | "mobile")
          }
        >
          <Icon className="h-4 w-4 mr-2" />
          <span className="text-sm">
          {mode}
          </span>
        </Button>
      ))}
    </div>
  );
}
