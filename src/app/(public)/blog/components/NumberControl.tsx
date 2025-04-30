import { ChevronLeft, ChevronRight } from "lucide-react";

const NumberControl = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
}: {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}) => {
  const increment = () => {
    if (value < max) onChange(Math.min(value + step, max));
  };

  const decrement = () => {
    if (value > min) onChange(Math.max(value - step, min));
  };

  return (
    <div className="flex items-center space-x-2">
      {label && <span className="w-16 text-xs text-gray-400">{label}</span>}
      <div className="relative h-1 flex-1 rounded-full bg-gray-700">
        <div
          className="absolute h-1 rounded-full bg-blue-500"
          style={{
            width: `${((value - min) / (max - min)) * 100}%`,
          }}
        />
      </div>
      <div className="flex items-center rounded-lg bg-gray-800 p-1">
        <button
          onClick={decrement}
          className="p-1 text-gray-400 hover:text-white"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="w-8 text-center text-xs">{value}</span>
        <button
          onClick={increment}
          className="p-1 text-gray-400 hover:text-white"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default NumberControl;
