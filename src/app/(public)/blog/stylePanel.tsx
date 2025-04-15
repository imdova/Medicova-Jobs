"use client";

import { FormField } from "@/components/form/FormModal/FormField/FormField";
import { blocksForm } from "@/constants/pagebuilder/formFields";
import { FieldConfig } from "@/types";
import { Block } from "@/types/blog";
import { Grid } from "@mui/material";

interface TabProps {
  selectedBlock: Block | null;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  setSelectedBlock: React.Dispatch<React.SetStateAction<Block | null>>;
}

export default function StylePanel({ setBlocks, selectedBlock }: TabProps) {
  const updateBlock = (data: Partial<Block>) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === selectedBlock?.id ? { ...block, ...data } : block,
      ),
    );
  };

  const updateBlockStyles = (styles: Partial<Block["styles"]>) => {
    setBlocks((pv) =>
      pv.map((block) =>
        block.id === selectedBlock?.id
          ? {
              ...block,
              styles: { ...block.styles, ...styles } as Partial<
                Block["styles"]
              >,
            }
          : block,
      ),
    );
  };
  const formFields = blocksForm.find(
    (form) => selectedBlock?.type && form.type.includes(selectedBlock?.type),
  )?.fields;

  const stylesFields: FieldConfig<React.CSSProperties>[] = [
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
        placeholder:"Enter font size px, rem, em"
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

  return (
    <div className="max-h-[calc(100vh-146px)] py-6 space-y-6 overflow-y-auto">
      <h4 className="text-xl font-semibold">Content Editor</h4>
      {formFields &&
        formFields.map((field) => (
          <Grid
            item
            xs={field.gridProps?.xs ?? 12}
            sm={field.gridProps?.sm}
            md={field.gridProps?.md}
            key={String(field.name)}
          >
            <FormField
              field={field}
              fieldController={{
                onChange: (e) => updateBlock({ [field.name]: e.target.value }),
                onBlur: () => {}, // Provide a no-op function or appropriate logic
                value: selectedBlock?.[field.name as keyof Block] ?? "", // Provide the current value
                name: String(field.name), // Provide the field name
                ref: () => {}, // Provide a no-op ref or appropriate logic
              }}
            />
          </Grid>
        ))}

      <h4 className="mt-6 text-xl font-semibold">Styles Editor</h4>
      {stylesFields.map((field) => (
        <Grid
          item
          xs={field.gridProps?.xs ?? 12}
          sm={field.gridProps?.sm}
          md={field.gridProps?.md}
          key={String(field.name)}
        >
          <FormField
            field={field}
            fieldController={{
              onChange: (e) =>
                updateBlockStyles({ [field.name]: e.target.value }),
              onBlur: () => {}, // Provide a no-op function or appropriate logic
              value: selectedBlock?.styles?.[field.name] ?? "", // Provide the current value
              name: String(field.name), // Provide the field name
              ref: () => {}, // Provide a no-op ref or appropriate logic
            }}
          />
        </Grid>
      ))}
    </div>
  );
}
