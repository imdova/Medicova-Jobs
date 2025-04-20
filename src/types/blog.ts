import {
  Type,
  Image,
  Donut,
  Code,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";

export type BlockType =
  | "h1"
  | "h2"
  | "h3"
  | "paragraph"
  | "image"
  | "button"
  | "html";
export interface Block {
  id: string;
  type: BlockType;
  content: string;
  imageUrl?: string;
  linkUrl?: string;
  styles: React.CSSProperties;
  gridProps?: {
    xs?: number;
    sm?: number;
    md?: number;
  };
}

export const blockTypes: {
  id: BlockType;
  icon: React.ElementType;
  label: string;
}[] = [
  { id: "h1", icon: Heading1, label: "Heading 1" },
  { id: "h2", icon: Heading2, label: "Heading 2" },
  { id: "h3", icon: Heading3, label: "Heading 3" },
  { id: "paragraph", icon: Type, label: "Paragraph" },
  { id: "image", icon: Image, label: "Image" },
  { id: "button", icon: Donut, label: "Button" },
  { id: "html", icon: Code, label: "HTML" },
];
