"use client";

import { SelectField } from "@/components/form/FormModal/FormField/SelectField";
import { Block, TabProps } from "@/types/blog";
import { updateItem } from "@/util/blog";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Image as ImageIcon,
  Layers,
  Maximize2,
  Minimize2,
  Repeat,
  Square,
  Sun,
  Type,
} from "lucide-react";
import { useState } from "react";

const FONT_FAMILIES = [
  "Arial",
  "Roboto",
  "Montserrat",
  "Poppins",
  "Inter",
  "Open Sans",
];
const FONT_WEIGHTS = ["300", "400", "500", "600", "700", "800"];
const TEXT_ALIGNS = ["left", "center", "right"];
const BACKGROUND_SIZES = ["auto", "cover", "contain"];
const BACKGROUND_REPEATS = ["no-repeat", "repeat", "repeat-x", "repeat-y"];
const BORDER_STYLES = ["none", "solid", "dashed", "dotted"];
const BOX_SHADOWS = ["none", "small", "medium", "large"];
const SIZE_OPTIONS = ["auto", "100%", "75%", "50%", "25%", "fit-content"];
const PRESET_COLORS = [
  "#1a73e8",
  "#d93025",
  "#1e8e3e",
  "#f9ab00",
  "#5f6368",
  "#fff",
  "#f8f9fa",
  "#dadce0",
  "#000",
  "#202124",
];
const boxShadowValues = {
  none: "none",
  small: "0 2px 4px rgba(0,0,0,0.1)",
  medium: "0 4px 8px rgba(0,0,0,0.15)",
  large: "0 8px 16px rgba(0,0,0,0.2)",
};
interface StyleState {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
  backgroundImageUrl: string;
  backgroundSize: string;
  backgroundRepeat: string;
  padding: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  margin: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  borderRadius: number;
  borderWidth: number;
  borderStyle: string;
  boxShadow: string;
  opacity: number;
  width: string;
  height: string;
}

const generateCSSProperties = (styles: StyleState): React.CSSProperties => {
  return {
    fontFamily: styles.fontFamily,
    fontSize: styles.fontSize + "px",
    fontWeight: styles.fontWeight,
    textAlign: styles.textAlign as any,
    color: styles.color,
    backgroundColor: styles.backgroundColor,
    backgroundImage: styles.backgroundImageUrl
      ? `url(${styles.backgroundImageUrl})`
      : undefined,
    backgroundSize: styles.backgroundSize,
    backgroundRepeat: styles.backgroundRepeat,
    padding: styles.padding ? `${styles.padding}px` : undefined,
    paddingTop: styles.paddingTop ? `${styles.paddingTop}px` : undefined,
    paddingRight: styles.paddingRight ? `${styles.paddingRight}px` : undefined,
    paddingBottom: styles.paddingBottom
      ? `${styles.paddingBottom}px`
      : undefined,
    paddingLeft: styles.paddingLeft ? `${styles.paddingLeft}px` : undefined,
    margin: styles.margin ? `${styles.margin}px` : undefined,
    marginTop: styles.marginTop ? `${styles.marginTop}px` : undefined,
    marginRight: styles.marginRight ? `${styles.marginRight}px` : undefined,
    marginBottom: styles.marginBottom ? `${styles.marginBottom}px` : undefined,
    marginLeft: styles.marginLeft ? `${styles.marginLeft}px` : undefined,
    borderRadius: styles.borderRadius ? `${styles.borderRadius}px` : undefined,
    borderWidth: styles.borderWidth ? `${styles.borderWidth}px` : undefined,
    borderStyle: styles.borderStyle,
    boxShadow:
      boxShadowValues[styles.boxShadow as keyof typeof boxShadowValues],
    opacity: styles.opacity,
    width: styles.width,
    height: styles.height,
  };
};
const parsePixelValue = (value?: string | number): number => {
  if (typeof value === "string") {
    return parseInt(value.replace("px", ""), 10);
  }
  return value ? Number(value) : 0;
};

const extractBackgroundImageUrl = (value?: string): string => {
  if (!value) return "";
  const match = value.match(/^url\((['"]?)(.*?)\1\)$/);
  return match ? match[2] : "";
};

const reverseCSSProperties = (css: React.CSSProperties): StyleState => {
  return {
    color: css.color as string,
    backgroundColor: css.backgroundColor as string,
    width: css.width as string,
    height: css.height as string,
    fontFamily: css.fontFamily as string,
    fontSize: parsePixelValue(css.fontSize),
    fontWeight: String(css.fontWeight) || "",
    textAlign: css.textAlign as string,
    backgroundImageUrl: extractBackgroundImageUrl(css.backgroundImage),
    backgroundSize: css.backgroundSize as string,
    backgroundRepeat: css.backgroundRepeat as string,
    padding: parsePixelValue(css.padding),
    paddingTop: parsePixelValue(css.paddingTop),
    paddingRight: parsePixelValue(css.paddingRight),
    paddingBottom: parsePixelValue(css.paddingBottom),
    paddingLeft: parsePixelValue(css.paddingLeft),
    margin: parsePixelValue(css.margin),
    marginTop: parsePixelValue(css.marginTop),
    marginRight: parsePixelValue(css.marginRight),
    marginBottom: parsePixelValue(css.marginBottom),
    marginLeft: parsePixelValue(css.marginLeft),
    borderRadius: parsePixelValue(css.borderRadius),
    borderWidth: parsePixelValue(css.borderWidth),
    borderStyle: css.borderStyle as string,
    boxShadow: Object.keys(boxShadowValues).find(
      (key) =>
        boxShadowValues[key as keyof typeof boxShadowValues] === css.boxShadow,
    ) as keyof typeof boxShadowValues,
    opacity: css.opacity as number,
  };
};

const initialStyles = {
  fontFamily: "Arial",
  fontSize: 16,
  fontWeight: "400",
  textAlign: "left",
  color: "#000000",
  backgroundColor: "#ffffff",
  backgroundImageUrl: "",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  padding: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  margin: 0,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  borderRadius: 0,
  borderWidth: 0,
  borderStyle: "none",
  boxShadow: "none",
  opacity: 1,
  width: "auto",
  height: "auto",
};

export default function StylePanel({ setBlocks, selectedBlock }: TabProps) {
  const styles = selectedBlock?.styles
    ? reverseCSSProperties(selectedBlock?.styles)
    : initialStyles;

  console.log("🚀 ~ StylePanel ~ styles:", styles);

  const updateBlock = (data: Partial<Block>) => {
    if (selectedBlock)
      setBlocks((blocks) => {
        const newBlocks = [...blocks];
        updateItem(newBlocks, selectedBlock?.id, data);
        return newBlocks;
      });
  };

  const updateBlockStyles = (styles: Partial<Block["styles"]>) => {
    if (selectedBlock)
      setBlocks((blocks) => {
        const newBlocks = [...blocks];
        updateItem(newBlocks, selectedBlock?.id, {
          styles: { ...selectedBlock.styles, ...styles },
        });
        return newBlocks;
      });
  };

  const handleStyleChange = (key: keyof StyleState, value: any) => {
    const newStyles = { ...styles, [key]: value };
    const cssProperties = generateCSSProperties(newStyles);
    updateBlockStyles(cssProperties);
  };

  if (!selectedBlock) {
    return (
      <div className="text-muted-foreground p-4 text-center">
        Select a block to customize its styles
      </div>
    );
  }
  return (
    <div className="w-full max-w-md">
      <div className="space-y-2">
        <SectionCollapse
          title="Typography"
          icon={<Type size={16} className="text-primary" />}
        >
          <div className="my-2 space-y-4 rounded-base border border-gray-200 p-2">
            <div className="space-y-2">
              <Dropdown
                name="fontFamily"
                value={styles.fontFamily}
                options={FONT_WEIGHTS}
                onChange={(val) => handleStyleChange("fontFamily", val)}
                icon={<Type size={16} />}
              />
            </div>

            <div className="space-y-2">
              <Slider
                value={styles.fontSize}
                onChange={(val) => handleStyleChange("fontSize", val)}
                min={8}
                max={72}
                label="Size"
                icon={<Type size={16} />}
              />
            </div>

            <div className="space-y-2">
              <Dropdown
                name="fontWeight"
                value={styles.fontWeight}
                options={FONT_WEIGHTS}
                onChange={(val) => handleStyleChange("fontWeight", val)}
                icon={<Type size={16} />}
              />
            </div>

            <div className="space-y-2">
              <div className="mb-1 flex items-center space-x-2">
                <AlignCenter size={16} className="text-primary" />
                <span className="text-xs text-gray-400">Alignment</span>
              </div>
              <TextAlignSelector
                value={styles.textAlign}
                onChange={(val) => handleStyleChange("textAlign", val)}
              />
            </div>

            <div className="space-y-2">
              <ColorSelector
                value={styles.color}
                onChange={(val) => handleStyleChange("color", val)}
                label="Color"
              />
            </div>
          </div>
        </SectionCollapse>
        <SectionCollapse
          title="Background"
          icon={<ImageIcon size={16} className="text-primary" />}
        >
          <div className="mb-4 space-y-4 rounded-base border border-gray-200">
            <div className="space-y-2">
              <ColorSelector
                value={styles.backgroundColor}
                onChange={(val) => handleStyleChange("backgroundColor", val)}
                label="BG Color"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <ImageIcon size={16} className="text-primary" />
                <input
                  type="text"
                  value={styles.backgroundImageUrl}
                  onChange={(e) =>
                    handleStyleChange("backgroundImageUrl", e.target.value)
                  }
                  placeholder="Image URL"
                  className="flex-1 rounded-lg bg-gray-800 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-400">Size</span>
                <Dropdown
                  name="backgroundSize"
                  value={styles.backgroundSize}
                  options={BACKGROUND_SIZES}
                  onChange={(val) => handleStyleChange("backgroundSize", val)}
                  icon={<Maximize2 size={16} />}
                />
              </div>

              <div>
                <span className="text-xs text-gray-400">Repeat</span>
                <Dropdown
                  name="backgroundRepeat"
                  value={styles.backgroundRepeat}
                  options={BACKGROUND_REPEATS}
                  onChange={(val) => handleStyleChange("backgroundRepeat", val)}
                  icon={<Repeat size={16} />}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Slider
                value={styles.opacity}
                onChange={(val) => handleStyleChange("opacity", val)}
                min={0}
                max={1}
                step={0.01}
                label="Opacity"
                icon={<Sun size={16} />}
              />
            </div>
          </div>
        </SectionCollapse>

        <SectionCollapse
          title="Dimensions"
          icon={<Layers size={16} className="text-primary" />}
        >
          <div className="mb-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-400">Width</span>
                <Dropdown
                  name="width"
                  value={styles.width}
                  options={SIZE_OPTIONS}
                  onChange={(val) => handleStyleChange("width", val)}
                  icon={<ChevronLeft size={16} />}
                />
              </div>

              <div>
                <span className="text-xs text-gray-400">Height</span>
                <Dropdown
                  name="height"
                  value={styles.height}
                  options={SIZE_OPTIONS}
                  onChange={(val) => handleStyleChange("height", val)}
                  icon={<ChevronUp size={16} />}
                />
              </div>
            </div>
          </div>
        </SectionCollapse>

        <SectionCollapse
          title="Spacing"
          icon={<Layers size={16} className="text-primary" />}
        >
          <div className="mb-4 space-y-4">
            {/* Padding Controls */}
            <div className="space-y-2">
              <div className="mb-1 flex items-center">
                <Maximize2 size={16} className="mr-2 text-primary" />
                <span className="text-xs text-gray-400">Padding</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <NumberControl
                    value={styles.padding}
                    onChange={(val) => handleStyleChange("padding", val)}
                    label="All"
                  />
                </div>

                <NumberControl
                  value={styles.paddingTop}
                  onChange={(val) => handleStyleChange("paddingTop", val)}
                  label="Top"
                />

                <NumberControl
                  value={styles.paddingRight}
                  onChange={(val) => handleStyleChange("paddingRight", val)}
                  label="Right"
                />

                <NumberControl
                  value={styles.paddingBottom}
                  onChange={(val) => handleStyleChange("paddingBottom", val)}
                  label="Bottom"
                />

                <NumberControl
                  value={styles.paddingLeft}
                  onChange={(val) => handleStyleChange("paddingLeft", val)}
                  label="Left"
                />
              </div>
            </div>

            {/* Margin Controls */}
            <div className="space-y-2">
              <div className="mb-1 flex items-center">
                <Minimize2 size={16} className="mr-2 text-primary" />
                <span className="text-xs text-gray-400">Margin</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <NumberControl
                    value={styles.margin}
                    onChange={(val) => handleStyleChange("margin", val)}
                    label="All"
                  />
                </div>

                <NumberControl
                  value={styles.marginTop}
                  onChange={(val) => handleStyleChange("marginTop", val)}
                  label="Top"
                />

                <NumberControl
                  value={styles.marginRight}
                  onChange={(val) => handleStyleChange("marginRight", val)}
                  label="Right"
                />

                <NumberControl
                  value={styles.marginBottom}
                  onChange={(val) => handleStyleChange("marginBottom", val)}
                  label="Bottom"
                />

                <NumberControl
                  value={styles.marginLeft}
                  onChange={(val) => handleStyleChange("marginLeft", val)}
                  label="Left"
                />
              </div>
            </div>
          </div>
        </SectionCollapse>

        {/* Border Section */}

        <SectionCollapse
          title="Border & Effects"
          icon={<Square size={16} className="text-primary" />}
        >
          <div className="mb-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <NumberControl
                  value={styles.borderRadius}
                  onChange={(val) => handleStyleChange("borderRadius", val)}
                  label="Radius"
                />
              </div>

              <div>
                <NumberControl
                  value={styles.borderWidth}
                  onChange={(val) => handleStyleChange("borderWidth", val)}
                  label="Width"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-400">Style</span>
                <Dropdown
                  name="borderStyle"
                  value={styles.borderStyle}
                  options={BORDER_STYLES}
                  onChange={(val) => handleStyleChange("borderStyle", val)}
                />
              </div>

              <div>
                <span className="text-xs text-gray-400">Shadow</span>
                <Dropdown
                  name="boxShadow"
                  value={styles.boxShadow}
                  options={BOX_SHADOWS}
                  onChange={(val) => handleStyleChange("boxShadow", val)}
                />
              </div>
            </div>
          </div>
        </SectionCollapse>
      </div>
    </div>
  );
}

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

const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  icon,
}: {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center space-x-2">
      {icon && <div className="text-primary">{icon}</div>}
      {label && <span className="w-16 text-xs text-gray-400">{label}</span>}
      <div className="relative flex-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="h-1 w-full appearance-none rounded-full bg-gray-400 focus:outline-none"
        />
        <div
          className="pointer-events-none absolute top-1/2 h-1 translate-y-1/2 rounded-full bg-primary"
          style={{
            width: `${((value - min) / (max - min)) * 100}%`,
            pointerEvents: "none",
          }}
        />
      </div>
      <span className="w-8 text-center text-xs text-white">{value}</span>
    </div>
  );
};

const Dropdown = ({
  name,
  value,
  options,
  onChange,
  icon,
}: {
  name: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  icon?: React.ReactNode;
}) => {
  return (
    <SelectField
      field={{
        name,
        options: options.map((x) => ({ value: x, label: x })),
        textFieldProps: {
          label: name,
          InputProps: {
            startAdornment: icon,
          },
        },
      }}
      controllerField={{
        name: name,
        value,
        onChange: (e) => onChange(e.target.value),
      }}
    />
  );
};

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

const SectionCollapse = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = () => setIsExpanded((pv) => !pv);

  return (
    <div>
      <div
        className={`flex h-[45px] min-h-[40px] cursor-pointer flex-row justify-start rounded-base bg-gray-100 px-2 text-secondary transition-all duration-300 ease-in-out`}
        onClick={toggle}
      >
        <div className="flex w-full flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-4 text-left normal-case">
            {icon && icon}
            <span>{title}</span>
          </div>
          <KeyboardArrowDown
            className={`${isExpanded ? "rotate-180" : ""} transition-transform duration-300`}
          />
        </div>
      </div>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </div>
  );
};
