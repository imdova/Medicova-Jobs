import { SelectField } from "@/components/form/FormModal/FormField/SelectField";

const Dropdown = ({
  name,
  value,
  options,
  onChange,
  icon,
}: {
  name: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  icon?: React.ReactNode;
}) => {
  return (
    <SelectField
      field={{
        name,
        options: options.map((x) => ({ value: x, label: x })),
        textFieldProps: {
          label: name,
          InputProps: {
            startAdornment: icon,
          },
        },
      }}
      controllerField={{
        name: name,
        value,
        onChange: (e) => onChange(e?.target?.value || e),
      }}
    />
  );
};

export default Dropdown;
