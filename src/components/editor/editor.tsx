"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { extensions } from "./extensions";
import { BlockEditorToolbar, EditorToolbar } from "./editor-toolbar";
import { EditorContentWrapper } from "./editor-content";
import { useEffect } from "react";
import { Box } from "@mui/material";

interface TextEditorProps {
  value: string;
  onChange: (e: string) => void;
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  const editor = useEditor({
    extensions,
    content: value,
  });

  useEffect(() => {
    if (editor) {
      onChange(editor.getHTML());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.getHTML()]);

  if (!editor) {
    return null;
  }
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <EditorToolbar editor={editor} />
      <EditorContentWrapper editor={editor} />
    </div>
  );
}

export const BlockTextEditor: React.FC<{
  value: string;
  onChange: (e: string) => void;
  isSelected: Boolean;
}> = ({ value, onChange, isSelected }) => {
  const editor = useEditor({
    extensions,
    content: value,
  });

  useEffect(() => {
    if (editor) {
      onChange(editor.getHTML());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.getHTML()]);

  if (!editor) {
    return null;
  }

  return (
    <div className="mt-2 w-full">
      <div className={isSelected ? "block" : "hidden"}>
        <BlockEditorToolbar editor={editor} />
      </div>
      <Box
        sx={{
          "& .ProseMirror ": {
            border: "none",
            p: 0,
            minHeight: "unset",
          },
          "& .ProseMirror:focus": {
            border: "none",
          },
        }}
      >
        <EditorContent
          editor={editor}
          className="prose prose-sm w-full focus:border-none focus:outline-none"
        />
      </Box>
    </div>
  );
};
