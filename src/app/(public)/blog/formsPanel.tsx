import { FormField } from "@/components/form/FormModal/FormField/FormField";
import { FieldConfig } from "@/types";
import { BlogSettings, FormType } from "@/types/blog";
import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";

export interface FormsTabProps {
  forms: FormType[];
  setForms: React.Dispatch<React.SetStateAction<FormType[]>>;
  selectedForm?: string | null;
  setSelectedForm: React.Dispatch<React.SetStateAction<string | null>>;
}

const formBuilderFields: FieldConfig<FormType>[] = [
  {
    name: "id",
    label: "Form ID",
    type: "text",
    required: true,
  },
  {
    name: "name",
    label: "Form Name",
    type: "text",
    required: true,
  },
  {
    name: "title",
    label: "Form Title",
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: "Form Description",
    type: "text",
  },
  {
    name: "submitText",
    label: "Submit Button Text",
    type: "text",
  },
  {
    name: "cancelText",
    label: "Cancel Button Text",
    type: "text",
  },
  {
    name: "onSubmit.method",
    label: "Submission Method",
    type: "select",
    options: [
      { label: "POST", value: "POST" },
      { label: "PUT", value: "PUT" },
      { label: "PATCH", value: "PATCH" },
    ],
    required: true,
  },
  {
    name: "onSubmit.url",
    label: "Submission URL",
    type: "text",
    required: true,
  },
  {
    name: "initialValues",
    label: "Initial Values (JSON)",
    type: "text",
  },
  {
    name: "fields",
    label: "Fields Configuration (JSON)",
    type: "text",
  },
];

const FormsPanel: React.FC<FormsTabProps> = ({
  forms,
  setForms,
  selectedForm,
  setSelectedForm,
}) => {
  const activeForm = forms.find((x) => selectedForm === x.id);

  const formMethods = useForm<Partial<BlogSettings>>({
    defaultValues: activeForm ? activeForm : {},
  });

  const { control, handleSubmit } = formMethods;

  const submit = (body: Partial<BlogSettings>) => {
    console.log("🚀 ~ submit ~ body:", body);
  };

  return (
    <div className="h-full">
      <h3 className="mb-4 text-sm font-medium">list of forms</h3>

      <div className="col-span-1 grid min-h-full">
        {forms.map((form) => (
          <button
            onClick={() => setSelectedForm(form.id)}
            className="rounded-base border bg-white p-2 shadow-soft hover:shadow-xl"
            key={form.id}
          >
            <h2>
              {form.name}{" "}
              <span className="text-xs text-secondary">
                ({form.fields.length} Fields)
              </span>
            </h2>
            <p className="text-xs text-secondary">{form.title}</p>
          </button>
        ))}
      </div>

      <h3 className="mb-4 text-sm font-medium">Edit Form</h3>

      <form className="space-y-6" onSubmit={handleSubmit(submit)}>
        <div>
          <h6>Post Settings</h6>
          <p>Customize the post settings</p>
        </div>

        {formBuilderFields.map((field) => (
          <Grid
            item
            xs={field.gridProps?.xs ?? 12}
            sm={field.gridProps?.sm}
            md={field.gridProps?.md}
            key={String(field.name)}
          >
            <FormField field={field} control={control} />
          </Grid>
        ))}

        <div className="space-y-2">
          <Button variant="contained" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormsPanel;
