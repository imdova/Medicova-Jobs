"use client";
import { Button } from "@mui/material";
import { Save, Download, Eye, EyeOff } from "lucide-react";

export default function EditorHeader() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 max-h-[70px] bg-white p-4">
      <div className="flex items-center">
        <h1 className="mr-4 text-xl font-bold">Blog Builder</h1>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outlined" size="small">
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>

        <Button variant="outlined" size="small">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>

        <Button variant="contained" size="small">
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>
    </header>
  );
}
