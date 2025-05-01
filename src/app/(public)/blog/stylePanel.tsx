"use client";

import { Block, TabProps } from "@/types/blog";
import { updateItem } from "@/util/blog";
import {
  AlignCenter,
  ChevronLeft,
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
import { StyleState } from "./types/blog";
import { generateCSSProperties, reverseCSSProperties } from "./util/blog";
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
import { Slider } from "@mui/material";
import TextAlignSelector from "./components/TextAlignSelector";
import ColorSelector from "./components/ColorSelector";
import NumberControl from "./components/NumberControl";
import { initialStyles } from "./constants/blocks.styles";

export default function StylePanel({ setBlocks, selectedBlock }: TabProps) {
  const styles = selectedBlock?.styles
    ? reverseCSSProperties(selectedBlock?.styles)
    : {};

  console.log("🚀 ~ StylePanel ~ styles:", styles);
  // console.log(
  //   "🚀 ~ StylePanel ~ styles:",
  //   selectedBlock?.type,
  //   selectedBlock?.styles,
  //   styles,
  // );

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
                value={styles?.fontFamily || ""}
                options={FONT_FAMILIES}
                onChange={(val) => handleStyleChange("fontFamily", val)}
                icon={<Type size={16} />}
              />
            </div>

            <div className="space-y-2">
              <Slider
                value={styles?.fontSize || 0}
                onChange={(val) => handleStyleChange("fontSize", val)}
                min={8}
                max={72}
                // label="Size"
                // icon={<Type size={16} />}
              />
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
          icon={<ImageIcon size={16} className="text-primary" />}
        >
          <div className="mb-4 space-y-4 rounded-base border border-gray-200">
            <div className="space-y-2">
              <ColorSelector
                value={styles?.backgroundColor || ""}
                onChange={(val) => handleStyleChange("backgroundColor", val)}
                label="BG Color"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <ImageIcon size={16} className="text-primary" />
                <input
                  type="text"
                  value={styles?.backgroundImageUrl || ""}
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

            <div className="space-y-2">
              <Slider
                value={styles?.opacity || 0}
                onChange={(val) => handleStyleChange("opacity", val)}
                min={0}
                max={1}
                step={0.01}
                // label="Opacity"
                // icon={<Sun size={16} />}
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
                  value={styles?.width || ""}
                  options={SIZE_OPTIONS}
                  onChange={(val) => handleStyleChange("width", val)}
                  icon={<ChevronLeft size={16} />}
                />
              </div>

              <div>
                <span className="text-xs text-gray-400">Height</span>
                <Dropdown
                  name="height"
                  value={styles?.height || ""}
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
          <div className="mb-4 space-y-4">
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
