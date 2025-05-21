import { FieldConfig } from "@/types";
import { Block, BlockButton } from "@/types/blog";
import {
  AlignLeft,
  Code,
  Columns,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Quote,
  Square,
  Type,
  Video,
} from "lucide-react";

export const basicBlocks: BlockButton[] = [
  {
    id: "text",
    icon: <Type className="mr-2 h-4 w-4" />,
    label: "Text",
  },
  {
    id: "image",
    icon: <ImageIcon className="mr-2 h-4 w-4" />,
    label: "Image",
  },
  {
    id: "button",
    icon: <Square className="mr-2 h-4 w-4" />,
    label: "Button",
  },
  {
    id: "divider",
    icon: <AlignLeft className="mr-2 h-4 w-4" />,
    label: "Divider",
  },
];
export const layoutBlocks: BlockButton[] = [
  {
    id: "container",
    icon: <Square className="mr-2 h-4 w-4" />,
    label: "Container",
  },
  {
    id: "flex-row",
    icon: <Columns className="mr-2 h-4 w-4" />,
    label: "Flex Row",
  },
];
export const getBlockProps = (
  type: Block["type"],
  id: string,
): Partial<Block> => {
  if (type === "flex-row") {
    return {
      allowNesting: true,
      blocks: [
        {
          id: id + 1,
          type: "container",
          allowNesting: true,
          level: 2,
          content: "",
          styles: {
            width: "100%",
            flexGrow: 1,
            flex: "1 1 0%",
          },
          blocks: [],
        },
        {
          id: id + 2,
          type: "container",
          allowNesting: true,
          level: 2,
          content: "",
          styles: {
            width: "100%",
            flexGrow: 1,
            flex: "1 1 0%",
          },
          blocks: [],
        },
      ],
    };
  }
  if (type === "container") {
    return {
      allowNesting: true,
    };
  }
  return {};
};
export const contentBlocks: BlockButton[] = [
  {
    id: "h1",
    icon: <Heading1 className="mr-2 h-4 w-4" />,
    label: "H1",
  },
  {
    id: "h2",
    icon: <Heading2 className="mr-2 h-4 w-4" />,
    label: "H2",
  },
  {
    id: "h3",
    icon: <Heading3 className="mr-2 h-4 w-4" />,
    label: "H3",
  },
  {
    id: "paragraph",
    icon: <Type className="mr-2 h-4 w-4" />,
    label: "Paragraph",
  },
  {
    id: "quote",
    icon: <Quote className="mr-2 h-4 w-4" />,
    label: "Quote",
  },
  {
    id: "code",
    icon: <Code className="mr-2 h-4 w-4" />,
    label: "Code",
  },
  {
    id: "html",
    icon: <Code className="mr-2 h-4 w-4" />,
    label: "HTML",
  },
  {
    id: "video",
    icon: <Video className="mr-2 h-4 w-4" />,
    label: "Video",
  },
];

export const stylesFields: FieldConfig<React.CSSProperties>[] = [
  // Typography Fields
  {
    name: "fontFamily",
    label: "Font Family",
    type: "select",
    options: [
      { label: "Arial", value: "Arial, sans-serif" },
      { label: "Helvetica", value: "Helvetica, sans-serif" },
      { label: "Times New Roman", value: "Times New Roman, serif" },
      { label: "Georgia", value: "Georgia, serif" },
      { label: "Verdana", value: "Verdana, sans-serif" },
      { label: "System UI", value: "system-ui" },
    ],
    gridProps: { xs: 12, sm: 6 },
  },
  {
    name: "fontSize",
    label: "Font Size",
    textFieldProps: {
      placeholder: "Enter font size px, rem, em",
    },
    type: "text",
    gridProps: { xs: 12, sm: 6 },
  },
  {
    name: "fontWeight",
    label: "Font Weight",
    type: "select",
    options: [
      { label: "Normal (400)", value: "400" },
      { label: "Bold (700)", value: "700" },
      { label: "Light (300)", value: "300" },
      { label: "Semi-Bold (600)", value: "600" },
    ],
    gridProps: { xs: 12, sm: 6 },
  },
  // {
  //   name: "color",
  //   label: "Text Color",
  //   type: "color",
  //   gridProps: { xs: 12, sm: 6 },
  // },
  {
    name: "textAlign",
    label: "Text Alignment",
    type: "select",
    options: [
      { label: "Left", value: "left" },
      { label: "Center", value: "center" },
      { label: "Right", value: "right" },
      { label: "Justify", value: "justify" },
    ],
    gridProps: { xs: 12, sm: 6 },
  },

  // Background Fields
  // {
  //   name: "backgroundColor",
  //   label: "Background Color",
  //   type: "color",
  //   gridProps: { xs: 12, sm: 6 },
  // },
  {
    name: "backgroundImage",
    label: "Background Image URL",
    type: "text",
    gridProps: { xs: 12 },
  },
  {
    name: "backgroundSize",
    label: "Background Size",
    type: "select",
    options: [
      { label: "Cover", value: "cover" },
      { label: "Contain", value: "contain" },
      { label: "Auto", value: "auto" },
      { label: "100%", value: "100%" },
    ],
    dependsOn: "backgroundImage",
    gridProps: { xs: 12, sm: 6 },
  },
  {
    name: "backgroundRepeat",
    label: "Background Repeat",
    type: "select",
    options: [
      { label: "No Repeat", value: "no-repeat" },
      { label: "Repeat", value: "repeat" },
      { label: "Repeat X", value: "repeat-x" },
      { label: "Repeat Y", value: "repeat-y" },
    ],
    dependsOn: "backgroundImage",
    gridProps: { xs: 12, sm: 6 },
  },

  // Spacing Fields
  {
    name: "padding",
    label: "Padding (All Sides)",
    type: "text",
    textFieldProps: {
      InputProps: {
        endAdornment: <span>px</span>,
      },
    },
    gridProps: { xs: 12, sm: 6 },
  },
  {
    name: "paddingTop",
    label: "Padding Top",
    type: "text",
    textFieldProps: {
      InputProps: {
        endAdornment: <span>px</span>,
      },
    },
    gridProps: { xs: 12, sm: 6 },
  },
  {
    name: "paddingRight",
    label: "Padding Right",
    type: "text",
    textFieldProps: {
      InputProps: {
        endAdornment: <span>px</span>,
      },
    },
    gridProps: { xs: 12, sm: 6 },
  },
  {
    name: "paddingBottom",
    label: "Padding Bottom",
    type: "text",
    textFieldProps: {
      InputProps: {
        endAdornment: <span>px</span>,
      },
    },
    gridProps: { xs: 12, sm: 6 },
  },
  {
    name: "paddingLeft",
    label: "Padding Left",
    type: "text",
    textFieldProps: {
      InputProps: {
        endAdornment: <span>px</span>,
      },
    },
    gridProps: { xs: 12, sm: 6 },
  },
  {
    name: "margin",
    label: "Margin (All Sides)",
    type: "text",
    textFieldProps: {
      InputProps: {
        endAdornment: <span>px</span>,
      },
    },
    gridProps: { xs: 12, sm: 6 },
  },
  {
    name: "marginTop",
    label: "Margin Top",
    type: "text",
    textFieldProps: {
      InputProps: {
        endAdornment: <span>px</span>,
      },
    },
    gridProps: { xs: 12, sm: 6 },
  },
  {
    name: "marginRight",
    label: "Margin Right",
    type: "text",
    textFieldProps: {
      InputProps: {
        endAdornment: <span>px</span>,
      },
    },
    gridProps: { xs: 12, sm: 6 },
  },
  {
    name: "marginBottom",
    label: "Margin Bottom",
    type: "text",
    textFieldProps: {
      InputProps: {
        endAdornment: <span>px</span>,
      },
    },
    gridProps: { xs: 12, sm: 6 },
  },
  {
    name: "marginLeft",
    label: "Margin Left",
    type: "text",
    textFieldProps: {
      InputProps: {
        endAdornment: <span>px</span>,
      },
    },
    gridProps: { xs: 12, sm: 6 },
  },

  // Borders & Effects Fields
  {
    name: "borderRadius",
    label: "Border Radius",
    type: "text",
    textFieldProps: {
      InputProps: {
        endAdornment: <span>px</span>,
      },
    },
    gridProps: { xs: 12, sm: 6 },
  },
  {
    name: "borderWidth",
    label: "Border Width",
    type: "text",
    textFieldProps: {
      InputProps: {
        endAdornment: <span>px</span>,
      },
    },
    gridProps: { xs: 12, sm: 6 },
  },
  {
    name: "borderStyle",
    label: "Border Style",
    type: "select",
    options: [
      { label: "None", value: "none" },
      { label: "Solid", value: "solid" },
      { label: "Dashed", value: "dashed" },
      { label: "Dotted", value: "dotted" },
      { label: "Double", value: "double" },
    ],
    gridProps: { xs: 12, sm: 6 },
  },
  // {
  //   name: "borderColor",
  //   label: "Border Color",
  //   type: "color",
  //   dependsOn: "borderStyle",
  //   gridProps: { xs: 12, sm: 6 },
  // },
  {
    name: "boxShadow",
    label: "Box Shadow",
    type: "select",
    options: [
      { label: "None", value: "none" },
      { label: "Light", value: "0 2px 5px rgba(0,0,0,0.1)" },
      { label: "Medium", value: "0 4px 8px rgba(0,0,0,0.12)" },
      { label: "Strong", value: "0 8px 16px rgba(0,0,0,0.15)" },
      { label: "Inner", value: "inset 0 2px 5px rgba(0,0,0,0.1)" },
    ],
    gridProps: { xs: 12, sm: 6 },
  },
  {
    name: "opacity",
    label: "Opacity",
    type: "text",
    textFieldProps: {
      InputProps: {
        startAdornment: <span>0-1</span>,
      },
    },
    gridProps: { xs: 12, sm: 6 },
  },
];
