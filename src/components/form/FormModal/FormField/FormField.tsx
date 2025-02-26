import React from "react";
import { Controller, ControllerFieldState, ControllerRenderProps, FieldValues } from "react-hook-form";
import { FieldConfig } from "@/types";
import { CheckboxField } from "./CheckboxField";
import { SelectField } from "./SelectField";
import { TextEditorField } from "./TextEditorField";
import { TextFieldComponent } from "./TextFieldComponent";
import { SearchableSelectField } from "./SearchableSelectField";

interface FormFieldProps {
    field: FieldConfig;
    control: any;
    hidden: boolean;
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
    resetValues
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
                    />
                );
            case "textEditor":
                if (field.component) {
                    return (
                        <TextEditorField
                            field={field}
                            controllerField={controllerField}
                            error={error}
                        />
                    );
                }
                break;
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
        <Controller
            name={String(field.name)}
            control={control}
            rules={{
                required: field.required ? `${field.label || String(field.name)} is required` : false,
                ...field.validation,
            }}
            render={renderField}
        />
    );
};