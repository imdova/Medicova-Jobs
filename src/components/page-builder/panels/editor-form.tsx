import { FormField } from "@/components/form/FormModal/FormField/FormField";
import { FieldConfig } from "@/types";
import { FormItem } from "@/types/blog";
import { generateId } from "@/util";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, Collapse, Divider } from "@mui/material";
import { Plus, Save } from "lucide-react";
import { useState } from "react";


const EditorForm = ({
  data,
  setData,
  onSubmit,
}: {
  data: FormItem;
  setData: React.Dispatch<React.SetStateAction<FormItem | null>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {

  const updateField = (field: FieldConfig, data: Partial<FieldConfig>) => {
    if (data)
      setData((form) => {
        if (!form) return null;
        const newForm = { ...form };
        newForm.fields = newForm.fields?.map((f) => f.id === field.id ? { ...f, ...data } : f);
        return newForm;
      });
  };

  return (
    <div>
      <Divider className="!my-5" />
      <h4 className="!mb-5 text-xl font-semibold">
        Edit Form ({data?.name})
      </h4>
      <form onSubmit={onSubmit} className="space-y-2">
        <h6 className="!my-5 text-lg font-semibold">
          Basic Information
        </h6>
        <FormField
          field={{
            name: "name",
            label: "Name",
            type: "text",
          }}
          fieldController={{
            onChange: (e) => {
              const value = e && e.target ? e.target.value : e;
              setData({ ...data, name: value })
            },
            onBlur: () => { }, // Provide a no-op function or appropriate logic
            value: data.name, // Provide the current value
            name: String(data.name), // Provide the field name
            ref: () => { }, // Provide a no-op ref or appropriate logic
          }}
        />
        <FormField
          field={{
            name: "title",
            label: "Title",
            type: "text",
          }}
          fieldController={{
            onChange: (e) => {
              const value = e && e.target ? e.target.value : e;
              setData({ ...data, title: value })
            },
            onBlur: () => { }, // Provide a no-op function or appropriate logic
            value: data.title, // Provide the current value
            ref: () => { }, // Provide a no-op ref or appropriate logic
          }}
        />
        <FormField
          field={{
            name: "description",
            label: "Description",
            type: "text",
            textFieldProps: {
              placeholder:
                "Briefly describe what the form is for, e.g., contact form, booking form, etc.",
              sx: {
                "& .MuiOutlinedInput-root": {
                  p: 0,
                  borderRadius: "10px",
                  height: "auto",
                },
              },
              multiline: true,
              minRows: 4,
              maxRows: 14,
            },
          }}
          fieldController={{
            onChange: (e) => {
              const value = e && e.target ? e.target.value : e;
              setData({ ...data, description: value })
            },
            onBlur: () => { }, // Provide a no-op function or appropriate logic
            value: data.description, // Provide the current value
            ref: () => { }, // Provide a no-op ref or appropriate logic
          }}
        />
        <Divider className="!my-5" />
        <h6 className="!my-5 text-lg text-center font-semibold">
          Form Settings
        </h6>
        <FormField
          field={{
            name: "apiEndpoint",
            label: "API Endpoint",
            type: "text",
          }}
          fieldController={{
            onChange: (e) => {
              const value = e && e.target ? e.target.value : e;
              setData({ ...data, apiEndpoint: value })
            },
            onBlur: () => { }, // Provide a no-op function or appropriate logic
            value: data.apiEndpoint, // Provide the current value
            ref: () => { }, // Provide a no-op ref or appropriate logic
          }}
        />
        <FormField
          field={{
            name: "afterSubmit",
            label: "After Submit",
            type: "text",
          }}
          fieldController={{
            onChange: (e) => {
              const value = e && e.target ? e.target.value : e;
              setData({ ...data, afterSubmit: value })
            },
            onBlur: () => { }, // Provide a no-op function or appropriate logic
            value: data.afterSubmit, // Provide the current value
            ref: () => { }, // Provide a no-op ref or appropriate logic
          }}
        />
        <FormField
          field={{
            name: "afterSubmitMessage",
            label: "After Submit Message",
            type: "text",
          }}
          fieldController={{
            onChange: (e) => {
              const value = e && e.target ? e.target.value : e;
              setData({ ...data, afterSubmitMessage: value })
            },
            onBlur: () => { }, // Provide a no-op function or appropriate logic
            value: data.afterSubmitMessage, // Provide the current value
            ref: () => { }, // Provide a no-op ref or appropriate logic
          }}
        />

        <Divider className="!my-5" />
        <h6 className="!my-5 text-lg text-center font-semibold">
          Form Fields
        </h6>
        {data.fields?.map((field) => (
          <SectionCollapse key={field.id} title={
            <div className="flex flex-row items-center gap-2">
              {field.label || field.name}
              <span className="text-sm text-gray-500">
                ({field.type})
              </span>
            </div>
          } >
            <div className="space-y-2 my-2">
              <FormField
                field={{
                  name: "name",
                  label: "Field Name",
                  type: "text",
                  required: true,
                  rules: {
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: "Field Name must contain only letters, numbers, and underscores",
                    },
                  },
                }}
                fieldController={{
                  onChange: (e) => {
                    const value = e && e.target ? e.target.value : e;
                    updateField(field, { name: value })
                  },
                  onBlur: () => { }, // Provide a no-op function or appropriate logic
                  value: field.name, // Provide the current value
                  ref: () => { }, // Provide a no-op ref or appropriate logic
                }}
              />
              <FormField
                field={{
                  name: "label",
                  label: "Field Label",
                  type: "text",
                }}
                fieldController={{
                  onChange: (e) => {
                    const value = e && e.target ? e.target.value : e;
                    updateField(field, { label: value })
                    // setData({ ...data, fields: data.fields?.map((f) => f.name === field.name ? { ...f, value } : f) })
                  },
                  onBlur: () => { }, // Provide a no-op function or appropriate logic
                  value: field.label, // Provide the current value
                  ref: () => { }, // Provide a no-op ref or appropriate logic
                }}
              />
              <FormField
                field={{
                  name: "type",
                  label: "Field Type",
                  type: "select",
                  options: [
                    { label: "Text", value: "text" },
                    { label: "Number", value: "number" },
                    { label: "Email", value: "email" },
                    { label: "Phone", value: "phone" },
                    { label: "Password", value: "password" },
                    { label: "Date", value: "date" },
                    { label: "Text Editor", value: "textEditor" },
                    { label: "Select", value: "select" },
                    { label: "Search Select", value: "search-select" },
                    { label: "Checkbox", value: "checkbox" },
                    { label: "Component", value: "component" },
                    { label: "Radio", value: "radio" },
                    { label: "File", value: "file" },
                    { label: "OTP", value: "otp" },
                  ],
                  required: true,
                }}
                fieldController={{
                  onChange: (e) => {
                    const value = e && e.target ? e.target.value : e;
                    updateField(field, { type: value })
                    // setData({ ...data, fields: data.fields?.map((f) => f.name === field.name ? { ...f, value } : f) })
                  },
                  onBlur: () => { }, // Provide a no-op function or appropriate logic
                  value: field.type, // Provide the current value
                  ref: () => { }, // Provide a no-op ref or appropriate logic
                }}
              />
              <FormField
                field={{
                  name: "required",
                  label: "Required Field",
                  type: "checkbox"
                }}
                fieldController={{
                  onChange: (e) => {
                    const value = e && e.target ? e.target.checked : e;
                    updateField(field, { required: value })
                  },
                  onBlur: () => { },
                  value: field.required,
                  ref: () => { }
                }}
              />
            </div>
          </SectionCollapse>
        ))}
        <Button
          variant="outlined"
          size="large"
          startIcon={<Plus size={20} />}
          className="w-full"
          onClick={() => {
            setData((form) => {
              if (!form) return null;
              const newForm = { ...form };
              newForm.fields = [...(newForm.fields || []), { id: generateId(), name: "Text", label: "", type: "text", required: false }];
              return newForm;
            });
          }}

        >
          Add Field
        </Button>


        <div className="py-3 flex mt-5 gap-2">
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<Save size={20} />}
          >
            Save Changes
          </Button>
          <Button
            // onClick={() => setData(defaultFormValues(form))}
            variant="text"
            size="large"
            className="ml-2"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditorForm;




const SectionCollapse = ({
  title,
  icon,
  children,
  defaultValue = false,
}: {
  title: React.ReactNode;
  defaultValue?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultValue);
  const toggle = () => setIsExpanded((pv) => !pv);

  return (
    <div>
      <div
        className={` min-h-[40px] rounded-base border border-gray-300 bg-gray-100 px-2  transition-all duration-300 ease-in-out`}
      >
        <div
          onClick={toggle}
          className="flex w-full min-h-[40px] cursor-pointer flex-row items-center  justify-between gap-2">
          <div className="flex flex-row items-center gap-4 text-left normal-case">
            {icon && icon}
            <span>{title}</span>
          </div>
          <KeyboardArrowDown
            className={`${isExpanded ? "rotate-180" : ""} transition-transform duration-300`}
          />
        </div>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </div>
    </div>
  );
};