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
    content: value as string,
  });

  useEffect(() => {
    if (editor && onChange) {
      const syntheticEvent = {
        target: { value: editor.getHTML() || "" },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
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
};

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

export default TextEditor;
