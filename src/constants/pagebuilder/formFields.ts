import { FieldConfig } from "@/types";
import { Block, BlockType, FormItem } from "@/types/blog";

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
  type: ["h1", "h2", "h3", "code", "quote", "text"],
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


export const formList: FormItem[] = [
  {
    id: "form1",
    name: "Contact Form",
    description: "A form to collect user contact information.",
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        required: true,
        rules: {
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters",
          },
          maxLength: { value: 50, message: "Name cannot exceed 50 characters" },
        },
        gridProps: { xs: 12, sm: 6 },
        textFieldProps: { variant: "outlined" },
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
        rules: {
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address",
          },
        },
        gridProps: { xs: 12, sm: 6 },
        textFieldProps: { variant: "outlined" },
      },
      {
        name: "message",
        label: "Message",
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
    ],
    apiEndpoint: "/api/contact",
    onSuccessMessage: "Thank you for your submission!",
    onErrorMessage: "Failed to submit the form. Please try again.",
  },
  // {
  //   id: "form2",
  //   name: "Event Registration",
  //   description: "Register for an upcoming event.",
  //   fields: [
  //     {
  //       name: "event",
  //       label: "Select Event",
  //       type: "select",
  //       required: true,
  //       options: [
  //         { label: "Tech Conference 2025", value: "tech-conf-2025" },
  //         { label: "AI Workshop", value: "ai-workshop" },
  //         { label: "Webinar Series", value: "webinar-series" },
  //       ],
  //       gridProps: { xs: 12 },
  //       selectProps: { native: true },
  //     },
  //     {
  //       name: "attendanceType",
  //       label: "Attendance Type",
  //       type: "radio",
  //       required: true,
  //       options: [
  //         { label: "In-Person", value: "in-person" },
  //         { label: "Virtual", value: "virtual" },
  //       ],
  //       gridProps: { xs: 12 },
  //       dependsOn: "event",
  //     },
  //     {
  //       name: "dietary",
  //       label: "Dietary Preferences",
  //       type: "select",
  //       multiple: true,
  //       options: [
  //         { label: "Vegetarian", value: "vegetarian" },
  //         { label: "Vegan", value: "vegan" },
  //         { label: "Gluten-Free", value: "gluten-free" },
  //       ],
  //       gridProps: { xs: 12 },
  //       selectProps: { multiple: true },
  //       hideFieldNames: ["event"],
  //       dependsOn: "attendanceType",
  //       rules: {
  //         required: {
  //           value: true,
  //           message: "Please select at least one dietary preference",
  //         },
  //       },
  //     },
  //   ],
  //   apiEndpoint: "/api/event-registration",
  //   onSuccessRedirect: "/thank-you",
  //   onErrorRedirect: "/error",
  // },
  {
    id: "form3",
    name: "User Profile",
    fields: [
      {
        name: "emailPreferences",
        label: "Email Frequency",
        type: "select",
        options: [
          { label: "Daily", value: "daily" },
          { label: "Weekly", value: "weekly" },
          { label: "Monthly", value: "monthly" },
        ],
        dependsOn: "newsletter",
      },
      {
        name: "username",
        label: "Username",
        type: "text",
        required: true,
        rules: {
          minLength: {
            value: 3,
            message: "Username must be at least 3 characters",
          },
          pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message:
              "Username can only contain letters, numbers, and underscores",
          },
        },
        gridProps: { xs: 12, sm: 6 },
        textFieldProps: { variant: "filled" },
      },
      {
        name: "birthdate",
        label: "Date of Birth",
        type: "date",
        required: true,
        gridProps: { xs: 12, sm: 6 },
        dateFieldProps: { disableFuture: true, format: "MM/DD/YYYY" },
        rules: {
          required: { value: true, message: "Date of birth is required" },
        },
      },
      {
        name: "newsletter",
        label: "Subscribe to Newsletter",
        type: "checkbox",
        gridProps: { xs: 12 },
        resetFields: ["emailPreferences"],
      },
    ],
    apiEndpoint: "/api/user-profile",
    afterSubmitMessage: "Profile updated successfully!",
  },
  {
    id: "form4",
    name: "Feedback Form",
    description: "Provide feedback on our services.",
    fields: [
      {
        name: "rating",
        label: "Rating",
        type: "select",
        required: true,
        options: [
          { label: "1 Star", value: "1" },
          { label: "2 Stars", value: "2" },
          { label: "3 Stars", value: "3" },
          { label: "4 Stars", value: "4" },
          { label: "5 Stars", value: "5" },
        ],
        gridProps: { xs: 12, sm: 6 },
        selectProps: { native: true },
      },
      {
        name: "comments",
        label: "Comments",
        type: "text",
        gridProps: { xs: 12 },
        textFieldProps: { multiline: true, rows: 5, variant: "outlined" },
      },
      {
        name: "recommend",
        label: "Would you recommend us?",
        type: "checkbox",
        gridProps: { xs: 12 },
      },
    ],
    apiEndpoint: "/api/feedback",
    onSuccessMessage: "Thank you for your feedback!",
    onErrorMessage: "Failed to submit feedback. Please try again.",
    onSuccessRedirect: "/feedback/thank-you",
  },
];