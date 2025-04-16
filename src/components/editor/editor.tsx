"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { extensions } from "./extensions";
import { BlockEditorToolbar, EditorToolbar } from "./editor-toolbar";
import { EditorContentWrapper } from "./editor-content";
import { useEffect } from "react";
import { Box, TextFieldProps } from "@mui/material";

const TextEditor: React.FC<TextFieldProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions,
    content: value as string | undefined,
    onUpdate: ({ editor }) => {
      onChange &&
        onChange({
          target: { value: editor.getHTML() },
        } as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>);
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value as string);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <EditorToolbar editor={editor} />
      <EditorContentWrapper editor={editor} />
    </div>
  );
};

export const BlockTextEditor: React.FC<{
  value: string;
  onChange: (e: string) => void;
  isSelected: Boolean;
}> = ({ value, onChange, isSelected }) => {
  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value as string);
    }
  }, [value, editor]);

  // Remove the problematic effect that was creating issues
  // The onUpdate handler above will handle changes instead

  if (!editor) {
    return null;
  }

  return (
    <div className="mt-2 w-full">
      <div className={isSelected ? "block" : "hidden group-hover/item:block"}>
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

export default TextEditor;
