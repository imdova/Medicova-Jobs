import { Close } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useState, KeyboardEvent } from "react";

interface MultiTextInputProps {
  defaultValue?: string[];
  placeholder?: string;
  onChange?: (items: string[]) => void;
}

const MultiTextInput = ({
  defaultValue = [],
  placeholder = "Type a skill and press Enter",
  onChange,
}: MultiTextInputProps) => {
  const [items, setItems] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newItems = [...items, inputValue.trim()];
      setItems(newItems);
      setInputValue("");
      onChange?.(newItems);
    }
  };

  const removeItem = (indexToRemove: number) => {
    const newItems = items.filter((_, index) => index !== indexToRemove);
    setItems(newItems);
    onChange?.(newItems);
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex flex-wrap gap-2">
        {items.map((item, index) => (
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

      <TextField
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full"
      />

      {items.length > 0 && (
        <div className="text-sm text-gray-500">
          {items.length} item{items.length !== 1 ? "s" : ""} added
        </div>
      )}
    </div>
  );
};

export default MultiTextInput;
