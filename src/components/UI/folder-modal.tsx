import { InputAdornment } from "@mui/material";
import Image from "next/image";
import { API_ADD_SEEKER_TO_FOLDER, API_CREATE_FOLDER } from "@/api/seeker";
import { TAGS } from "@/api";
import { FieldConfig } from "@/types";
import useUpdateApi from "@/hooks/useUpdateApi";
import FormModal from "../form/FormModal/FormModal";

const fields: FieldConfig<Folder>[] = [
  {
    name: "name",
    type: "text",
    label: "Folder Name",
    textFieldProps: {
      placeholder: "Enter Folder Name",
      InputProps: {
        startAdornment: (
          <InputAdornment position="start">
            <Image
              src="/images/folder.svg"
              width={20}
              height={20}
              alt="folder icon"
              className="object-contain"
            />
          </InputAdornment>
        ),
      },
    },
  },
];

interface NewUserModalProps {
  companyId?: string | null;
  seekerId: string | null;
  onClose: () => void;
}

const FolderModal: React.FC<NewUserModalProps> = ({
  companyId,
  seekerId,
  onClose,
}) => {
  const { isLoading, error, update } = useUpdateApi<Folder>();

  const handleSubmit = async (body: Partial<Folder>) => {
    const data = await update(
      API_CREATE_FOLDER,
      { method: "POST", body },
      TAGS.folders,
    );
    await update(API_ADD_SEEKER_TO_FOLDER + data.id + "/seekers/" + seekerId, {
      method: "POST",
    });
    onClose();
  };

  return (
    <FormModal
      open={!!seekerId}
      error={error?.message}
      loading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      fields={fields}
      title={"Create New Folder"}
      description={"Enter a name for your new folder."}
      initialValues={{ name: "", companyId: companyId }}
    />
  );
};

export default FolderModal;
