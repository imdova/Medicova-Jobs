import { FieldConfig } from "@/types";
import { Block, BlockType } from "@/types/blog";

export type BlockForm = {
  title?: string;
  type: BlockType[];
  description?: string;
  isModal?: boolean;
  fields: FieldConfig<Block>[];
};

export const imageModal: BlockForm = {
  title: "add Image",
  type: ["image"],
  description: "",
  isModal: true,
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
export const videoModal: BlockForm = {
  title: "add Youtube Video Url ",
  type: ["video"],
  description: "Enter link of video url from youtube",
  isModal: true,
  fields: [
    {
      name: "videoUrl",
      label: "Enter Your Video Url",
      type: "text",
      textFieldProps: { placeholder: "Video Url" },
      required: true,
    },
    {
      name: "videoThumbnail",
      label: "Enter Your Thumbnail Url",
      type: "text",
      textFieldProps: { placeholder: "Thumbnail Url" },
    },
  ],
};
export const buttonModal: BlockForm = {
  title: "Add Button",
  type: ["button"],
  description: "",
  isModal: true,
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
export const htmlModal: BlockForm = {
  type: ["html"],
  title: "Add html",
  description: "",
  isModal: true,
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
export const normalModal: BlockForm = {
  type: ["h1", "h2", "h3","code", "quote", "text"],
  fields: [
    {
      name: "content",
      label: "Enter Your Content",
      type: "text",
    },
  ],
};
export const paragraphData: BlockForm = {
  type: ["paragraph"],
  isModal: false,
  fields: [
    {
      name: "content",
      type: "textEditor",
    },
  ],
};

export const blocksForm: BlockForm[] = [
  imageModal,
  videoModal,
  buttonModal,
  htmlModal,
  normalModal,
  paragraphData,
];
