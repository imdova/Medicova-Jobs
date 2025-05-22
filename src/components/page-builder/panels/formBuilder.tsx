import { FormItem } from "@/types/blog";
import { Divider } from "@mui/material";
import { Plus } from "lucide-react";
import FormCard from "../FormCard";
import EditorForm from "./editor-form";
import { useState, useEffect } from "react";

export function updateItem(
  blocks: FormItem[],
  id: string,
  updatedData: Partial<FormItem>,
): boolean {
  for (const block of blocks) {
    if (block.id === id) {
      Object.assign(block, updatedData);
      return true;
    }
  }
  return false;
}

export const FormBuilder = ({
  forms,
  setForms,
  selectedForm,
  setSelectedForm,
}: {
  forms: FormItem[];
  setForms: React.Dispatch<React.SetStateAction<FormItem[]>>;
  selectedForm?: string | null;
  setSelectedForm?: (form: string | null) => void;
}) => {
  const activeForm = forms.find((form) => form.id === selectedForm)
  const [data, setData] = useState<FormItem | null>(activeForm ?? null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (data) {
      setForms((forms) => {
        const newForms = [...forms];
        activeForm && updateItem(newForms, activeForm?.id, data);
        return newForms;
      });
    }
  };


  useEffect(() => {
    if (!selectedForm) {
      setData(null)
    }
    // TODO : RESET ON CONDION
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeForm])

  return (
    <div className="w-full max-w-md">
      <div className="space-y-2">
        <h4 className="!mb-5 text-xl font-semibold">All Forms</h4>
        {forms.map((form) => (
          <FormCard
            key={form.id}
            form={form}
            onSelect={() => {
              setSelectedForm?.(form.id)
              setData(form)
            }}
            selected={selectedForm === form.id}
          />
        ))}
        <Divider className="!my-5" />
        <button className="flex w-full items-center justify-center gap-2 rounded-base bg-primary p-2 text-white shadow-soft hover:shadow-xl">
          Create New Form
          <Plus size={16} />
        </button>
        {data && (
          <EditorForm data={data} setData={setData} onSubmit={onSubmit} />
        )}
      </div>
    </div>
  );
};
