import TextEditor from "@/components/editor/editor";
import { FieldConfig } from "@/types";
import React from "react";

interface TextEditorFieldProps {
  field: FieldConfig;
  controllerField: any;
  error: any;
}

export const FileField: React.FC<TextEditorFieldProps> = ({
  field,
  controllerField,
  error,
}) => {
  return (
    <div className="upload-container mx-5 my-5 font-sans">
      <label
        htmlFor="file-upload"
        className="upload-label inline-block cursor-pointer rounded-lg bg-green-500 px-6 py-3 text-white transition-colors duration-300 hover:bg-green-600"
      >
        <span className="upload-text text-base">Choose a file</span>
        <input
          type="file"
          id="file-upload"
          className="upload-input hidden"
          // onChange="handleFileChange(event)"
        />
      </label>
      <span id="file-name" className="file-name ml-4 text-sm text-gray-600">
        No file selected
      </span>
    </div>
  );
};
