"use client";

import { EditorContent, type Editor } from "@tiptap/react";

interface EditorContentProps {
  editor: Editor;
}

export function EditorContentWrapper({ editor }: EditorContentProps) {
  return (
    <EditorContent
      editor={editor}
      placeholder="<p>Start writing...<p/>"
      className="prose prose-sm focus:outline-none"
    />
  );
}
