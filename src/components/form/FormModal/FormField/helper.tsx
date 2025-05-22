import { FieldConfig } from "@/types";
import { getNestedValue } from "@/util/forms";
import { IconButton, InputLabel } from "@mui/material";
import { X } from "lucide-react";

export const getFilteredOptions = (
  field: FieldConfig,
  isMultiple: boolean,
  currentValues: string[],
) => {
  return isMultiple
    ? field.options?.filter((x) => !currentValues.includes(x.value)) || []
    : field.options || [];
};

export const getDependsOnField = (
  field: FieldConfig,
  formValues: Record<string, any> | undefined,
  dependsOnField: FieldConfig | undefined,
) => {
  return field.dependsOn &&
    formValues &&
    !getNestedValue(formValues, field.dependsOn)
    ? { name: field.dependsOn, ...dependsOnField }
    : null;
};

export const getPlaceholder = (field: FieldConfig): string => {
  if (field.textFieldProps?.label) {
    return String(field.textFieldProps.label).replace("*", "");
  }
  if (field.label) {
    return "Select " + field.label.replace("*", "");
  }
  return "Select " + field.name;
};

export const getDependsOnTooltipText = (dependsOn: any): string => {
  const label = dependsOn.textFieldProps?.label
    ? String(dependsOn.textFieldProps.label).replace("*", "")
    : dependsOn.label?.replace("*", "") || dependsOn.name;
  return `Please select ${label} first`;
};

// Sub-components
export const FieldLabel: React.FC<{ field: FieldConfig }> = ({ field }) => {
  if (field.textFieldProps?.label) {
    return (
      <InputLabel className="bg-white px-1" id={String(field.name) + "Label"}>
        {field.textFieldProps.label}
      </InputLabel>
    );
  }

  if (field.label) {
    return (
      <label className="mb-1 font-semibold">
        {field.label.replace("*", "")}
        {field.required ? <span className="text-red-500">* </span> : null}
      </label>
    );
  }

  return null;
};

export const SelectedItemTag: React.FC<{
  item: string;
  label: string;
  onRemove: (item: string) => void;
}> = ({ item, label, onRemove }) => (
  <div className="space-x-2 rounded-base border bg-primary-100 py-1 pl-2 pr-1 text-main duration-100">
    <span className="text-xs"> {label} </span>
    <IconButton
      className="p-1 hover:bg-red-100 hover:text-red-500"
      onClick={() => onRemove(item)}
    >
      <X className="h-4 w-4" />
    </IconButton>
  </div>
);

export const MultiSelectTags: React.FC<{
  field: FieldConfig;
  selectedValues: string[];
  onRemoveItem: (item: string) => void;
}> = ({ field, selectedValues, onRemoveItem }) => {
  if (!selectedValues?.length) return null;

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {selectedValues.map((item: string, index: number) => {
        const option = field.options?.find((x) => x.value === item);
        return (
          <SelectedItemTag
            key={index}
            item={item}
            label={option?.label || item}
            onRemove={onRemoveItem}
          />
        );
      })}
    </div>
  );
};
