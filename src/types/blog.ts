import {
  Type,
  Image,
  Donut,
  Code,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";

export interface Block {
  id: string;
  type: string;
  content: string;
  styles: {
    [key: string]: string;
  };
}

export const blockTypes = [
  { id: "h1", icon: Heading1, label: "Heading 1" },
  { id: "h2", icon: Heading2, label: "Heading 2" },
  { id: "h3", icon: Heading3, label: "Heading 3" },
  { id: "paragraph", icon: Type, label: "Paragraph" },
  { id: "image", icon: Image, label: "Image" },
  { id: "button", icon: Donut, label: "Button" },
  { id: "html", icon: Code, label: "HTML" },
];
