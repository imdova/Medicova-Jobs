import { Add, Close } from "@mui/icons-material";
import { IconButton, TextField, TextFieldProps } from "@mui/material";
import { useState, KeyboardEvent } from "react";

const MultiTextInput: React.FC<TextFieldProps> = ({
  value: valueProp,
  placeholder = "Type multiple values and press Enter",
  onChange,
}) => {
  const value = (valueProp || []) as string[];
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addItems(inputValue);
    }
  };

  const addItems = (input: string) => {
    const newEntries = input
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const newItems = [...value, ...newEntries];
    if (onChange) {
      const syntheticEvent = {
        target: { value: newItems },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
    setInputValue("");
  };
  const removeItem = (indexToRemove: number) => {
    const newItems = value.filter((_, index) => index !== indexToRemove);
    if (onChange) {
      const syntheticEvent = {
        target: { value: newItems },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex flex-wrap gap-2">
        {value.map((item, index) => (
          <div
            key={index}
            className="space-x-2 rounded-base border bg-white px-2 py-1 text-main duration-100"
          >
            <span>{item}</span>
            <IconButton onClick={() => removeItem(index)}>
              <Close fontSize="small" />
            </IconButton>
          </div>
        ))}
      </div>

      <div className="flex w-full items-center gap-2">
        <TextField
          type="text"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow"
        />
        <IconButton
          className="block md:hidden"
          onClick={() => inputValue.trim() && addItems(inputValue)}
        >
          <Add />
        </IconButton>
      </div>

      {value.length > 0 && (
        <div className="text-sm text-gray-500">
          {value.length} item
          {value.length !== 1 ? "s" : ""} added
        </div>
      )}
    </div>
  );
};

export default MultiTextInput;
