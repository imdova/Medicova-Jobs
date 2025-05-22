import { FormItem } from "@/types/blog";
import { cn } from "@/util";

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
        "w-full rounded-base border bg-white p-2 shadow-soft hover:shadow-xl",
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

export default FormCard;
