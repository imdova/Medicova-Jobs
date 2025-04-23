import React from "react";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { FieldConfig } from "@/types";
import { CheckboxField } from "./CheckboxField";
import { SelectField } from "./SelectField";
import { ComponentField } from "./ComponentField";
import { TextFieldComponent } from "./TextFieldComponent";
import { SearchableSelectField } from "./SearchableSelectField";
import { PhoneNumberField } from "./phoneNumberField";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { FileField } from "./FileField";
import DatePickerField from "./DatePickerField";
import { RadioFieldComponent } from "./RadioField";
import { TextEditorField } from "./TextEditorField";
import { getNestedValue } from "@/util/forms";
import { updateData } from "@/util/general";

interface FormFieldProps {
  field: FieldConfig;
  control?: any;
  fieldController?: Partial<ControllerRenderProps<FieldValues, string>>;
  hidden?: boolean;
  dependsOnField?: FieldConfig;
  onCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formValues?: Record<string, any>;
  resetValues?: (fieldNames: FieldConfig["name"][]) => void;
  removeField?: (fieldName: string) => void;
  data?: any;
  setData?: React.Dispatch<React.SetStateAction<any>>;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  control,
  hidden,
  onCheckboxChange,
  formValues,
  resetValues,
  dependsOnField,
  fieldController,
  removeField,
  data,
  setData,
}) => {
  if (hidden) return null;

  const renderField = ({
    field: controllerField,
    fieldState,
  }: {
    field: Partial<ControllerRenderProps<FieldValues, string>>;
    fieldState?: ControllerFieldState;
  }): React.ReactElement => {
    console.log(controllerField)
    const error = fieldState?.error || null;
    switch (field.type) {
      case "checkbox":
        return (
          <CheckboxField
            field={field}
            controllerField={controllerField}
            resetValues={resetValues}
            onCheckboxChange={onCheckboxChange}
          />
        );
      case "select":
        return (
          <SelectField
            field={field}
            controllerField={controllerField}
            error={error}
            formValues={formValues}
            resetValues={resetValues}
            dependsOnField={dependsOnField}
          />
        );
      case "search-select":
        return (
          <SearchableSelectField
            field={field}
            controllerField={controllerField}
            error={error}
            resetValues={resetValues}
            formValues={formValues}
            dependsOnField={dependsOnField}
          />
        );
      case "component":
        if (field.component) {
          return (
            <ComponentField
              field={field}
              controllerField={controllerField}
              error={error}
            />
          );
        }
        break;
      case "file":
        return (
          <FileField
            field={field}
            controllerField={controllerField}
            error={error}
          />
        );
      case "textEditor":
        return (
          <TextEditorField
            field={field}
            controllerField={controllerField}
            error={error}
          />
        );
      case "phone":
        return (
          <PhoneNumberField
            field={field}
            controllerField={controllerField}
            error={error}
          />
        );
      case "date":
        return (
          <DatePickerField
            field={field}
            controllerField={controllerField}
            error={error}
          />
        );
      case "radio":
        return (
          <RadioFieldComponent
            field={field}
            controllerField={controllerField}
            error={error}
          />
        );
      default:
        return (
          <TextFieldComponent
            field={field}
            controllerField={controllerField}
            error={error}
          />
        );
    }
    // Fallback case to ensure we always return an element
    return (
      <TextFieldComponent
        field={field}
        controllerField={controllerField}
        error={error}
      />
    );
  };

  return (
    <div className="flex items-end gap-2">
      {control ? (
        <div className="max-w-full flex-1">
          <Controller
            name={String(field.name)}
            control={control}
            rules={{
              required: field.required
                ? `${field.label?.replace("*", "") || String(field.name)} is required`
                : false,
              ...field.rules,
            }}
            render={renderField}
          />
        </div>
      ) : fieldController ? (
        <div className="max-w-full flex-1">
          {renderField({ field: fieldController })}
        </div>
      ) : (
        data &&
        setData && (
          <div className="max-w-full flex-1">
            {renderField({
              field: {
                value: getNestedValue(data, String(field.name)) || "",
                name: String(field.name),
                onChange: (e) =>
                  setData(updateData(data, String(field.name), e.target.value)),
              },
            })}
          </div>
        )
      )}
      {removeField && (
        <IconButton
          onClick={() => {
            resetValues?.([field.name]);
            removeField(field.name);
          }}
          className="h-[42px] w-[42px] rounded-base border border-solid border-gray-300 p-2 hover:bg-red-100 hover:text-red-500"
        >
          <Delete />
        </IconButton>
      )}
    </div>
  );
};
