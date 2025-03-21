"use client";
import { IconButton, Divider, TextField } from "@mui/material";
import { Add, Edit, LanguageOutlined } from "@mui/icons-material";
import { KeyboardEvent, useState } from "react";
import { FieldConfig, Option } from "@/types";
import useUpdateApi from "@/hooks/useUpdateApi";
import FormModal from "@/components/form/FormModal/FormModal";
import { API_UPDATE_SEEKER } from "@/api/seeker";
import { TAGS } from "@/api";

// TODO Enum of languages
const languageOptions: Option[] = [
  { value: "FLUENT", label: "Fluent" },
  { value: "NATIVE", label: "Native" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "BEGINNER", label: "Beginner" },
];

const baseFields: FieldConfig[] = [
  {
    name: "arabic",
    label: "Arabic",
    type: "select",
    options: languageOptions,
  },
  {
    name: "english",
    label: "English",
    type: "select",
    options: languageOptions,
  },
];

const LanguageSection: React.FC<{
  user: UserProfile;
  isMe: boolean;
}> = ({ user, isMe }) => {
  const languageData = user.languages || [];
  const languagesValues = languageData.reduce(
    (acc: { [key: string]: string }, lang) => {
      acc[lang.name] = lang.proficiency;
      return acc;
    },
    {},
  );
  const languageFields: FieldConfig[] = languageData.map((lang) => ({
    name: lang.name,
    label: lang.name,
    type: "text",
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [fields, setFields] = useState([...baseFields, ...languageFields]);

  const { isLoading, error, update, reset } = useUpdateApi<UserProfile>((e) => {
    setIsModalOpen(false);
  });

  const open = () => setIsModalOpen(true);
  const close = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleUpdate = async (formData: { [key: string]: string }) => {
    const languages: LanguageProficiency[] = Object.keys(formData)
      .map((key) => ({
        name: key,
        proficiency: formData[key],
      }))
      .filter((lang) => lang.proficiency !== "");

    await update(
      API_UPDATE_SEEKER,
      {
        body: { id: user?.id, languages } as UserProfile,
      },
      TAGS.profile,
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addNewField();
    }
  };

  const addNewField = () => {
    const newFields: FieldConfig[] = [
      ...fields,
      {
        name: inputValue.trim().toLowerCase(),
        label: inputValue.trim(),
        type: "select",
        options: languageOptions,
      },
    ];
    const duplicate = fields.some(
      (field) => field.name === inputValue.trim().toLowerCase(),
    );
    if (duplicate) {
      shake(inputValue.trim().toLowerCase());
    }
    if (inputValue && !duplicate) {
      setFields(newFields);
      setInputValue("");
    }
  };
  const removeLastField = (fieldName: string) => {
    setFields((pv) => pv.filter((field) => field.name !== fieldName));
  };

  function shake(name: string) {
    setFields(fields.map(field => field.name === name ? { ...field, textFieldProps:{className:"animate-shake border-red-400"} } : field));
    setTimeout(() => {
      setFields(fields.map(field => field.name === name ? { ...field, textFieldProps:{className:""} } : field));
    }, 500);
  }
  return (
    <div className="rounded-base border border-gray-200 bg-white p-4 shadow-soft md:p-5">
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-xl font-semibold text-main">Languages</h3>
        {isMe && (
          <IconButton
            onClick={open}
            className="rounded border border-solid border-gray-200 p-2"
          >
            <Edit />
          </IconButton>
        )}
      </div>
      <FormModal
        open={isModalOpen}
        onClose={close}
        onSubmit={handleUpdate}
        error={error?.message}
        loading={isLoading}
        fields={fields}
        title="Edit Your Languages"
        removeField={fields.length > 1 ? removeLastField : undefined}
        initialValues={languagesValues}
      >
        <div className="border-t border-gray-200 p-4">
          <label className="font-semibold">Add Language</label>
          <div className="flex items-end gap-2">
            <TextField
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={"Add New Link"}
              className="w-full"
            />
            <IconButton
              onClick={addNewField}
              className="h-[42px] w-[42px] rounded-base border border-solid border-gray-300 p-2"
            >
              <Add />
            </IconButton>
          </div>
        </div>
      </FormModal>

      <div>
        {!languageData.length && (
          <p className="text-secondary">No Language data found.</p>
        )}

        {languageData.map((language, index) => (
          <div key={index}>
            <p className="my-2 text-secondary">
              <LanguageOutlined className="mr-2 inline-block" color="primary" />
              <span className="font-semibold text-main">
                {language.name} :
              </span>{" "}
              {language.proficiency}
            </p>
            {index % 2 === 0 ? <Divider sx={{ marginY: 1 }} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSection;
