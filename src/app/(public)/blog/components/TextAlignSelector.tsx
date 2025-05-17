import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

const TextAlignSelector = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (val: string) => void;
  }) => {
    return (
      <div className="flex rounded-lg border border-gray-200 p-1">
        <button
          className={`flex-1 rounded p-3 ${value === "left" ? "bg-primary text-white" : "hover:bg-gray-300"}`}
          onClick={() => onChange("left")}
        >
          <AlignLeft size={16} className="mx-auto" />
        </button>
        <button
          className={`flex-1 rounded p-3 ${value === "center" ? "bg-primary text-white" : "hover:bg-gray-300"}`}
          onClick={() => onChange("center")}
        >
          <AlignCenter size={16} className="mx-auto" />
        </button>
        <button
          className={`flex-1 rounded p-3 ${value === "right" ? "bg-primary text-white" : "hover:bg-gray-300"}`}
          onClick={() => onChange("right")}
        >
          <AlignRight size={16} className="mx-auto" />
        </button>
      </div>
    );
  };

  export default TextAlignSelector