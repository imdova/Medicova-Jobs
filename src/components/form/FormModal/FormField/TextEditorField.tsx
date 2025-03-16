import TextEditor from "@/components/editor/editor";
import { FieldConfig } from "@/types";
import React from "react";

interface TextEditorFieldProps {
  field: FieldConfig;
  controllerField: any;
  error: any;
}

export const TextEditorField: React.FC<TextEditorFieldProps> = ({
  field,
  controllerField,
  error,
}) => {
  return (
    <div>
      <TextEditor
        {...controllerField}
        {...field.componentProps}
        error={!!error}
        helperText={error?.message}
      />
      {error?.message && <p className="text-sm text-red-500">{error?.message}</p>}
    </div>
  );
};
