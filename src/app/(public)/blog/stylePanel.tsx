"use client";

import { Block, TabProps } from "@/types/blog";
import { updateItem } from "@/util/blog";
import {
  AlignCenter,
  ChevronLeft,
  ChevronUp,
  Image as ImageIcon,
  Layers,
  Layout,
  Maximize2,
  Minimize2,
  Repeat,
  Square,
  Sun,
  Type,
} from "lucide-react";
import { StyleState } from "./types/blog";
import {
  generateCSSProperties,
  parsePixelValue,
  reverseCSSProperties,
} from "./util/blog";
import SectionCollapse from "./components/SectionCollapse";
import Dropdown from "./components/Dropdown";
import {
  BACKGROUND_REPEATS,
  BACKGROUND_SIZES,
  BORDER_STYLES,
  BOX_SHADOWS,
  FONT_FAMILIES,
  FONT_WEIGHTS,
  SIZE_OPTIONS,
} from "./constants/blog";
import { Divider, Slider, TextField, TextFieldProps } from "@mui/material";
import TextAlignSelector from "./components/TextAlignSelector";
import ColorSelector from "./components/ColorSelector";
import NumberControl from "./components/NumberControl";
import { KeyboardEvent, useState } from "react";
import { cn } from "@/util";

export default function StylePanel({ setBlocks, selectedBlock }: TabProps) {
  const styles = selectedBlock?.styles
    ? reverseCSSProperties(selectedBlock?.styles)
    : {};

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
          defaultValue={true}
          icon={<Type size={16} className="text-primary" />}
        >
          <div className="my-2 space-y-4 rounded-base border border-gray-200 p-4">
            <div className="space-y-2">
              <Dropdown
                name="fontFamily"
                value={styles?.fontFamily || ""}
                options={FONT_FAMILIES}
                onChange={(val) => handleStyleChange("fontFamily", val)}
                icon={<Type size={16} />}
              />
            </div>

            <div className="flex w-full gap-2">
              <div className="flex-1 space-y-2">
                <div className="mb-1 flex items-center space-x-2">
                  <Type size={16} className="text-primary" />
                  <span className="text-xs text-gray-400">
                    Font Size {styles?.fontSize}
                  </span>
                </div>
                <div className="space-y-2">
                  <Slider
                    value={styles?.fontSize || 0}
                    onChange={(e, value) => {
                      handleStyleChange("fontSize", Number(value));
                    }}
                    min={8}
                    max={72}
                  />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="mb-1 flex items-center space-x-2">
                  <Type size={16} className="text-primary" />
                  <span className="text-xs text-gray-400">
                    Line Height {styles?.lineHeight}
                  </span>
                </div>
                <div className="space-y-2">
                  <Slider
                    value={styles?.lineHeight || 0}
                    onChange={(e, value) => {
                      handleStyleChange("lineHeight", Number(value));
                    }}
                    min={8}
                    max={72}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Dropdown
                name="fontWeight"
                value={styles?.fontWeight || ""}
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
                value={styles?.textAlign || ""}
                onChange={(val) => handleStyleChange("textAlign", val)}
              />
            </div>
            <div className="space-y-2">
              <div className="mb-1 flex items-center space-x-2">
                <AlignCenter size={16} className="rotate-90 text-primary" />
                <span className="text-xs text-gray-400">
                  letter Spacing {styles?.letterSpacing}
                </span>
              </div>
              <div className="space-y-2">
                <Slider
                  value={styles?.letterSpacing || 0}
                  onChange={(e, value) =>
                    handleStyleChange("letterSpacing", Number(value))
                  }
                  min={-10}
                  max={100}
                />
              </div>
            </div>

            <div className="space-y-2">
              <ColorSelector
                value={styles?.color || ""}
                onChange={(val) => handleStyleChange("color", val)}
                label="Color"
              />
            </div>
          </div>
        </SectionCollapse>
        <SectionCollapse
          title="Background"
          defaultValue={true}
          icon={<ImageIcon size={16} className="text-primary" />}
        >
          <div className="my-2 space-y-4 rounded-base border border-gray-200 p-4">
            <div className="space-y-2">
              <ColorSelector
                value={styles?.backgroundColor || ""}
                onChange={(val) => handleStyleChange("backgroundColor", val)}
                label="BG Color"
              />
            </div>

            <TextField
              type="text"
              value={styles?.backgroundImageUrl || ""}
              inputProps={{
                startAdornment: (
                  <ImageIcon size={16} className="text-primary" />
                ),
              }}
              onChange={(e) =>
                handleStyleChange("backgroundImageUrl", e.target.value)
              }
              placeholder="Image URL"
              className="w-full flex-1 rounded-lg p-2 text-sm"
            />
            <div className="grid grid-cols-2 gap-4 p-2">
              <div>
                <span className="text-xs text-gray-400">Size</span>
                <Dropdown
                  name="backgroundSize"
                  value={styles?.backgroundSize || ""}
                  options={BACKGROUND_SIZES}
                  onChange={(val) => handleStyleChange("backgroundSize", val)}
                  icon={<Maximize2 size={16} />}
                />
              </div>

              <div>
                <span className="text-xs text-gray-400">Repeat</span>
                <Dropdown
                  name="backgroundRepeat"
                  value={styles?.backgroundRepeat || ""}
                  options={BACKGROUND_REPEATS}
                  onChange={(val) => handleStyleChange("backgroundRepeat", val)}
                  icon={<Repeat size={16} />}
                />
              </div>
            </div>

            <div className="space-y-2 p-2">
              <div className="mb-1 flex items-center space-x-2">
                <AlignCenter size={16} className="rotate-90 text-primary" />
                <span className="text-xs text-gray-400">
                  Opacity {Number(styles?.opacity) * 100}%
                </span>
              </div>
              <div className="space-y-2">
                <Slider
                  value={styles?.opacity || 0}
                  onChange={(e, value) =>
                    handleStyleChange("opacity", Number(value))
                  }
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>
            </div>
          </div>
        </SectionCollapse>
        <div className="hidden">
          <SectionCollapse
            title="Layout"
            defaultValue={true}
            icon={<Layout size={16} className="text-primary" />}
          >
            <div className="my-2 space-y-4 rounded-base border border-gray-200 p-4">
              {/* Layout Type */}
              <div className="space-y-2">
                <Dropdown
                  name="display"
                  value={styles?.display || "flex"}
                  options={[
                    { label: "Flex", value: "flex" },
                    { label: "Grid", value: "grid" },
                    { label: "Block", value: "block" },
                    { label: "Inline Block", value: "inline-block" },
                  ]}
                  onChange={(val) => handleStyleChange("display", val)}
                  icon={<Layout size={16} />}
                />
              </div>

              {/* Grid/Flex Settings */}
              {styles?.display === "grid" && (
                <>
                  <div className="space-y-2">
                    <Dropdown
                      name="gridTemplateColumns"
                      value={styles?.gridTemplateColumns || ""}
                      options={[
                        { label: "1 Column", value: "repeat(1, 1fr)" },
                        { label: "2 Columns", value: "repeat(2, 1fr)" },
                        { label: "3 Columns", value: "repeat(3, 1fr)" },
                        { label: "4 Columns", value: "repeat(4, 1fr)" },
                      ]}
                      onChange={(val) =>
                        handleStyleChange("gridTemplateColumns", val)
                      }
                      icon={<Layout size={16} />}
                    />
                  </div>

                  <div className="space-y-2">
                    <Dropdown
                      name="gridTemplateRows"
                      value={styles?.gridTemplateRows || ""}
                      options={[
                        { label: "1 Row", value: "repeat(1, 1fr)" },
                        { label: "2 Rows", value: "repeat(2, 1fr)" },
                        { label: "3 Rows", value: "repeat(3, 1fr)" },
                      ]}
                      onChange={(val) =>
                        handleStyleChange("gridTemplateRows", val)
                      }
                      icon={<Layout size={16} />}
                    />
                  </div>
                </>
              )}

              {/* Flex settings */}
              {styles?.display === "flex" && (
                <>
                  <div className="space-y-2">
                    <Dropdown
                      name="flexWrap"
                      value={styles?.flexWrap || ""}
                      options={[
                        { label: "No Wrap", value: "nowrap" },
                        { label: "Wrap", value: "wrap" },
                        { label: "Wrap Reverse", value: "wrap-reverse" },
                      ]}
                      onChange={(val) => handleStyleChange("flexWrap", val)}
                      icon={<Layout size={16} />}
                    />
                  </div>
                </>
              )}

              {/* Alignment Controls */}
              <div className="space-y-2">
                <Dropdown
                  name="justifyContent"
                  value={styles?.justifyContent || ""}
                  options={[
                    { label: "Start", value: "flex-start" },
                    { label: "Center", value: "center" },
                    { label: "End", value: "flex-end" },
                    { label: "Space Between", value: "space-between" },
                    { label: "Space Around", value: "space-around" },
                    { label: "Space Evenly", value: "space-evenly" },
                  ]}
                  onChange={(val) => handleStyleChange("justifyContent", val)}
                  icon={<Layout size={16} />}
                />
              </div>

              <div className="space-y-2">
                <Dropdown
                  name="alignItems"
                  value={styles?.alignItems || ""}
                  options={[
                    { label: "Stretch", value: "stretch" },
                    { label: "Start", value: "flex-start" },
                    { label: "Center", value: "center" },
                    { label: "End", value: "flex-end" },
                    { label: "Baseline", value: "baseline" },
                  ]}
                  onChange={(val) => handleStyleChange("alignItems", val)}
                  icon={<Layout size={16} />}
                />
              </div>

              {/* Gap Control */}
              <div className="space-y-2">
                <div className="mb-1 flex items-center space-x-2">
                  <Layout size={16} className="text-primary" />
                  <span className="text-xs text-gray-400">
                    Gap {styles?.gap}
                  </span>
                </div>
                <Slider
                  value={styles?.gap || 0}
                  onChange={(e, value) =>
                    handleStyleChange("gap", Number(value))
                  }
                  min={0}
                  max={64}
                />
              </div>
            </div>
          </SectionCollapse>
        </div>

        <SectionCollapse
          title="Dimensions"
          icon={<Layers size={16} className="text-primary" />}
        >
          <div className="my-2 space-y-4 rounded-base border border-gray-200 p-4">
            <p className="font-semibold">Custom Dimension</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-400">Width</span>
                <LazyTextField
                  value={parsePixelValue(styles?.width) || ""}
                  inputProps={{
                    startAdornment: (
                      <ImageIcon size={16} className="text-primary" />
                    ),
                  }}
                  onChange={(e) =>
                    handleStyleChange("width", e.target.value + "px")
                  }
                  placeholder="Image URL"
                  className="w-full flex-1 rounded-lg text-sm"
                />
              </div>

              <div>
                <span className="text-xs text-gray-400">Height</span>
                <LazyTextField
                  type="number"
                  value={parsePixelValue(styles?.height) || ""}
                  inputProps={{
                    startAdornment: (
                      <ImageIcon size={16} className="text-primary" />
                    ),
                  }}
                  onChange={(e) =>
                    handleStyleChange("height", e.target.value + "px")
                  }
                  placeholder="Image URL"
                  className="w-full flex-1 rounded-lg text-sm"
                />
              </div>
            </div>
            <Divider />
            <p className="font-semibold">Base Dimension</p>
            <div className="grid grid-cols-2 gap-4">
              <Dropdown
                name="width"
                value={styles?.width || ""}
                options={SIZE_OPTIONS}
                onChange={(val) => handleStyleChange("width", val)}
                icon={<ChevronLeft size={16} />}
              />
              <Dropdown
                name="height"
                value={styles?.height || ""}
                options={SIZE_OPTIONS}
                onChange={(val) => handleStyleChange("height", val)}
                icon={<ChevronUp size={16} />}
              />
            </div>
          </div>
        </SectionCollapse>

        <SectionCollapse
          title="Spacing"
          icon={<Layers size={16} className="text-primary" />}
        >
          <div className="my-2 space-y-4 rounded-base border border-gray-200 p-4">
            {/* Padding Controls */}
            <div className="space-y-2">
              <div className="mb-1 flex items-center">
                <Maximize2 size={16} className="mr-2 text-primary" />
                <span className="text-xs text-gray-400">Padding</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <NumberControl
                    value={styles?.padding || 0}
                    onChange={(val) => handleStyleChange("padding", val)}
                    label="All"
                  />
                </div>

                <NumberControl
                  value={styles?.paddingTop || 0}
                  onChange={(val) => handleStyleChange("paddingTop", val)}
                  label="Top"
                />

                <NumberControl
                  value={styles?.paddingRight || 0}
                  onChange={(val) => handleStyleChange("paddingRight", val)}
                  label="Right"
                />

                <NumberControl
                  value={styles?.paddingBottom || 0}
                  onChange={(val) => handleStyleChange("paddingBottom", val)}
                  label="Bottom"
                />

                <NumberControl
                  value={styles?.paddingLeft || 0}
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
                    value={styles?.margin || 0}
                    onChange={(val) => handleStyleChange("margin", val)}
                    label="All"
                  />
                </div>

                <NumberControl
                  value={styles?.marginTop || 0}
                  onChange={(val) => handleStyleChange("marginTop", val)}
                  label="Top"
                />

                <NumberControl
                  value={styles?.marginRight || 0}
                  onChange={(val) => handleStyleChange("marginRight", val)}
                  label="Right"
                />

                <NumberControl
                  value={styles?.marginBottom || 0}
                  onChange={(val) => handleStyleChange("marginBottom", val)}
                  label="Bottom"
                />

                <NumberControl
                  value={styles?.marginLeft || 0}
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
          <div className="my-2 space-y-4 rounded-base border border-gray-200 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <NumberControl
                  value={styles?.borderRadius || 0}
                  onChange={(val) => handleStyleChange("borderRadius", val)}
                  label="Radius"
                />
              </div>

              <div>
                <NumberControl
                  value={styles?.borderWidth || 0}
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
                  value={styles?.borderStyle || ""}
                  options={BORDER_STYLES}
                  onChange={(val) => handleStyleChange("borderStyle", val)}
                />
              </div>

              <div>
                <span className="text-xs text-gray-400">Shadow</span>
                <Dropdown
                  name="boxShadow"
                  value={styles?.boxShadow || ""}
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

const LazyTextField: React.FC<TextFieldProps> = ({
  value: initialValue,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (onChange) {
        const syntheticEvent = {
          target: { value: value || "" },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    }
  };
  return (
    <TextField
      {...props}
      className={cn("no-arrows", props.className)}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onChange}
      onKeyDown={handleKeyDown}
    />
  );
};
