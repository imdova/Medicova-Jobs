import { FieldConfig } from "@/types";
import { FormItem } from "@/types/blog";
import { cn } from "@/util";

export const FormBuilder = ({
  forms,
  setForms,
  selectedForm,
  setSelectedForm,
}: {
  forms: FormItem[];
  setForms: (forms: FormItem[]) => void;
  selectedForm?: string | null;
  setSelectedForm?: (form: string | null) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {forms.map((form) => (
        <FormCard
          key={form.id}
          form={form}
          onSelect={setSelectedForm}
          selected={selectedForm === form.id}
        />
      ))}
    </div>
  );
};

const FormCard = ({
  form,
  onSelect,
  selected,
}: {
  form: FormItem;
  onSelect?: (id: string) => void;
  selected: boolean;
}) => {
  return (
    <button
      onClick={() => onSelect?.(form.id)}
      className={cn(
        "rounded-base border bg-white p-2 shadow-soft hover:shadow-xl",
        selected && "shadow-xl",
      )}
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
  );
};
