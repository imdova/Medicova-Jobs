"use client";

import { useEditor } from "@tiptap/react";
import { extensions } from "./extensions";
import { EditorToolbar } from "./editor-toolbar";
import { EditorContentWrapper } from "./editor-content";
import { useEffect } from "react";

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
{
  /* <EditorPreview editor={editor} /> */
}
