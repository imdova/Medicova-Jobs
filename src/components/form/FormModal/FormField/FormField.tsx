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
import { TextEditorField } from "./TextEditorField";
import { PhoneNumberField } from "./phoneNumberField";
import { isValidPhoneNumber } from "libphonenumber-js";

interface FormFieldProps {
  field: FieldConfig;
  control: any;
  hidden: boolean;
  dependsOnField?: FieldConfig;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formValues: Record<string, any>;
  resetValues: (fieldNames: (string | number)[]) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  control,
  hidden,
  onCheckboxChange,
  formValues,
  resetValues,
  dependsOnField,
}) => {
  if (hidden) return null;

  const renderField = ({
    field: controllerField,
    fieldState: { error },
  }: {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
  }): React.ReactElement => {
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
  /// TODO Add phone number validation to the Contact Fields
  const phonNumberValidations: FieldConfig["rules"] =
    field.type === "phone"
      ? {
          validate: (value) =>
            isValidPhoneNumber(value || "") ||
            "Please enter a valid phone number",
        }
      : {};

  return (
    <Controller
      name={String(field.name)}
      control={control}
      rules={{
        required: field.required
          ? `${field.label?.replace("*", "") || String(field.name)} is required`
          : false,
        ...phonNumberValidations,
        ...field.rules,
      }}
      render={renderField}
    />
  );
};
