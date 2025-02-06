import { FieldConfig } from "@/types";

export type ModalForm = {
  title: string;
  description: string;
  fields: FieldConfig[];
};

export const imageModal: ModalForm = {
  title: "add Image",
  description: "",
  fields: [
    {
      name: "imageUrl",
      label: "Enter Your Image Url",
      type: "text",
      textFieldProps: { placeholder: "Image Url" },
      required: true,
    },
  ],
};
export const buttonModal: ModalForm = {
  title: "Add Button",
  description: "",
  fields: [
    {
      name: "content",
      label: "Enter Your Button labe",
      type: "text",
      textFieldProps: { placeholder: "button Label" },
      required: true,
    },
    {
      name: "linkUrl",
      label: "Enter Your Link Url",
      type: "text",
      textFieldProps: { placeholder: "Link Url" },
      required: true,
    },
  ],
};
export const htmlModal: ModalForm = {
  title: "Add html",
  description: "",
  fields: [
    {
      name: "content",
      label: "Enter Your Html Code",
      type: "text",
      textFieldProps: {
        multiline: true,
        minRows: 4,
        maxRows: 10,
        sx: { height: "auto", "& .MuiOutlinedInput-root": { height: "auto" } },
      },
      required: true,
    },
  ],
};
