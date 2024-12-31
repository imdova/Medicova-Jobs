"use client";

import type { Editor } from "@tiptap/react";
import { ToolbarButton } from "./toolbar-button";
import { Divider } from "@mui/material";
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatUnderlined,
  Rotate90DegreesCcw,
} from "@mui/icons-material";

interface EditorToolbarProps {
  editor: Editor;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  return (
    <div className="flex items-center gap-1 border-b p-2">
      <ToolbarButton
        icon={FormatBold}
        label="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      />
      <ToolbarButton
        icon={FormatItalic}
        label="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      />
      <ToolbarButton
        icon={FormatUnderlined}
        label="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
      />
      <Divider />
      <ToolbarButton
        icon={FormatListBulleted}
        label="Bullet List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      />
      <Divider />
      <ToolbarButton
        icon={FormatAlignLeft}
        label="Align Left"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
      />
      <ToolbarButton
        icon={FormatAlignCenter}
        label="Align Center"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
      />
      <ToolbarButton
        icon={FormatAlignRight}
        label="Align Right"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
      />
      <div className="flex-1" />
      <ToolbarButton
        icon={Rotate90DegreesCcw}
        label="Clear Formatting"
        onClick={() =>
          editor.chain().focus().clearNodes().unsetAllMarks().run()
        }
      />
    </div>
  );
}
