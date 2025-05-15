import { FormField } from "@/components/form/FormModal/FormField/FormField";
import { useFormState } from "@/components/form/FormModal/hooks/useFormState";
import Avatar from "@/components/UI/Avatar";
import LeaveConfirmationModal from "@/components/UI/LeaveConfirmationModal";
import useIsLeaving from "@/hooks/useIsLeaving";
import { FieldConfig } from "@/types";
import { BlogSettings } from "@/types/blog";
import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";

const settingsFormFields: FieldConfig<BlogSettings>[] = [
  {
    name: "title",
    label: "Enter Your Blog Title",
    type: "text",
    required: true,
  },
  {
    name: "shortDescription",
    label: "Enter Blog Description",
    type: "text",
    textFieldProps: {
      placeholder: "Enter your company description",
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
  },
  {
    name: "author",
    label: "Author Name",
    type: "select",
    options: [
      {
        label: "John Doe",
        value: "john_doe",
        icon: <Avatar src="/path/to/john.jpg" size={24} />,
      },
      {
        label: "Jane Smith",
        value: "jane_smith",
        icon: <Avatar src="/path/to/jane.jpg" size={24} />,
      },
      {
        label: "Alice Johnson",
        value: "alice_johnson",
        icon: <Avatar src="/path/to/alice.jpg" size={24} />,
      },
      {
        label: "Bob Brown",
        value: "bob_brown",
        icon: <Avatar src="/path/to/bob.jpg" size={24} />,
      },
    ],
    required: true,
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      { label: "Technology", value: "technology" },
      { label: "Health", value: "health" },
      { label: "Finance", value: "finance" },
      { label: "Education", value: "education" },
    ],
    required: true,
  },
];

export interface SettingsTabProps {
  settings: BlogSettings;
  updateSettings: (settings: BlogSettings) => void;
}

const SettingsPanel: React.FC<SettingsTabProps> = ({
  updateSettings,
  settings,
}) => {
  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving();

  const formMethods = useForm({
    defaultValues: settings,
  });

  const { control, handleSubmit } = formMethods;

  const submit = (body: Partial<BlogSettings>) => {
    console.log("🚀 ~ submit ~ body:", body);
  };

  return (
    <div>
      <LeaveConfirmationModal
        isOpen={isLeaving}
        onLeave={() => {
          handleUserDecision(true);
        }}
        onStay={() => {
          setLeavingManually(false);
          handleUserDecision(false);
        }}
      />
      <form className="space-y-6" onSubmit={handleSubmit(submit)}>
        <div>
          <h6>Post Settings</h6>
          <p>Customize the post settings</p>
        </div>

        {settingsFormFields.map((field) => (
          <div
            className={`col-span-${field.gridProps?.xs ?? 12} ${
              field.gridProps?.sm ? `sm:col-span-${field.gridProps?.sm}` : ""
            } ${field.gridProps?.md ? `md:col-span-${field.gridProps?.md}` : ""}`}
            key={String(field.name)}
          >
            <FormField field={field} control={control} />
          </div>
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

export default SettingsPanel;
