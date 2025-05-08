"use client";
import { Block } from "@/types/blog";
import { Button } from "@mui/material";
import { Save, Download, Eye, Pin } from "lucide-react";

function exportJSON(data: object, filename: string = "data.json"): void {
  const jsonStr: string = JSON.stringify(data, null, 2);
  const blob: Blob = new Blob([jsonStr], { type: "application/json" });
  const url: string = URL.createObjectURL(blob);

  const link: HTMLAnchorElement = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function EditorHeader({
  blocks,
  setPreview,
  onPreview,
}: {
  blocks: Block[];
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
  onPreview: boolean;
}) {
  return (
    <header className="flex max-h-[70px] items-center justify-between border-b border-gray-200 bg-white p-4">
      <div className="flex items-center">
        <h1 className="mr-4 text-xl font-bold">Blog Builder</h1>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={() => setPreview((pv) => !pv)}
          variant="outlined"
          size="small"
        >
          {onPreview ? (
            <Pin className="mr-2 h-4 w-4" />
          ) : (
            <Eye className="mr-2 h-4 w-4" />
          )}
          {onPreview ? "Edit" : "Preview"}
        </Button>

        <Button
          onClick={() => exportJSON(blocks)}
          variant="outlined"
          size="small"
        >
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
