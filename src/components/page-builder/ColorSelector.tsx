import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PRESET_COLORS } from "@/constants/blog";

const ColorSelector = ({
  value,
  onChange,
  label,
  presetColors = PRESET_COLORS,
}: {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  presetColors?: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 p-2">
        {label && <span className="w-16 text-xs text-gray-400">{label}</span>}
        <div
          className="flex h-[42px] flex-1 cursor-pointer items-center space-x-3 rounded-2xl border border-gray-300 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className="h-4 w-4 rounded-full border border-gray-600"
            style={{ backgroundColor: value }}
          />
          <span className="flex-1 text-xs">{value}</span>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 z-20 mt-1 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <div className="mb-2 grid grid-cols-5 gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-600"
                style={{ backgroundColor: color }}
                onClick={() => {
                  onChange(color);
                  setIsOpen(false);
                }}
              >
                {color === value && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color === "#fff" ? "#000" : "#fff"}
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="h-8 w-8 cursor-pointer rounded bg-transparent"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="h-[30px] flex-1 rounded-base border border-gray-400 p-1 text-xs focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ColorSelector;
