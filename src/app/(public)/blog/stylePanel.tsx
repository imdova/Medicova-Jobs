"use client";

import { FormField } from "@/components/form/FormModal/FormField/FormField";
import { stylesFields } from "@/constants/pagebuilder/blocks";
import { blocksForm } from "@/constants/pagebuilder/formFields";
import { Block, TabProps } from "@/types/blog";
import { Grid } from "@mui/material";

function updateItem(
  blocks: Block[],
  block: Block,
  updatedFields: Partial<Block>,
) {
  return blocks.map((parentBlock) => {
    if (parentBlock.id !== block.parentId)
      return parentBlock.id === block.id
        ? { ...parentBlock, ...updatedFields }
        : parentBlock;

    const updatedNestedBlocks = parentBlock.blocks.map((item) => {
      if (item.id === block.id) {
        return { ...item, ...updatedFields };
      }
      return item;
    });

    return { ...parentBlock, blocks: updatedNestedBlocks };
  });
}

export default function StylePanel({ setBlocks, selectedBlock }: TabProps) {
  const updateBlock = (data: Partial<Block>) => {
    if (selectedBlock)
      setBlocks((blocks) => updateItem(blocks, selectedBlock, data));
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

  return (
    <div className="space-y-6">
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
