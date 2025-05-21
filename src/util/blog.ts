import { Block, StyleState } from "@/types/blog";
import { generateId } from ".";
import { boxShadowValues } from "@/constants/blog";

export function findItemById(blocks: Block[], id: string): Block | null {
  for (const block of blocks) {
    if (block.id === id) return block;
    if (block.blocks) {
      const found = findItemById(block.blocks, id);
      if (found) return found;
    }
  }
  return null;
}

export function addItem(
  blocks: Block[],
  newItem: Block,
  parentId: string | null = null,
): boolean {
  if (parentId === null) {
    blocks.push(newItem);
    return true;
  }

  for (const block of blocks) {
    if (block.id === parentId) {
      if (!block.blocks) block.blocks = [];
      block.blocks.push(newItem);
      return true;
    }
    if (block.blocks && addItem(block.blocks, newItem, parentId)) return true;
  }

  return false; // parent not found
}

export function updateItem(
  blocks: Block[],
  id: string,
  updatedData: Partial<Block>,
): boolean {
  for (const block of blocks) {
    if (block.id === id) {
      Object.assign(block, updatedData);
      return true;
    }
    if (block.blocks && updateItem(block.blocks, id, updatedData)) return true;
  }
  return false;
}

export function deleteItem(blocks: Block[], id: string): boolean {
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.id === id) {
      blocks.splice(i, 1);
      return true;
    }
    if (block.blocks && deleteItem(block.blocks, id)) return true;
  }
  return false;
}

export function duplicateItem(blocks: Block[], targetId: string): Block | null {
  function recursiveDuplicate(items: Block[]): Block | null {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.id === targetId) {
        // Deep clone the item
        const clone: Block = structuredClone(item);

        // Function to recursively assign new IDs to all sub-blocks
        const assignNewIds = function (block: Block): void {
          block.id = generateId();
          if (block.blocks) {
            block.blocks.forEach(assignNewIds);
          }
        };

        assignNewIds(clone); // Assign new IDs to the clone and its sub-blocks

        // Insert after the original
        items.splice(i + 1, 0, clone);
        return clone;
      }
      const dubBlock = item.blocks && recursiveDuplicate(item.blocks);
      if (dubBlock) return dubBlock;
    }

    return null;
  }

  return recursiveDuplicate(blocks);
}



export const generateCSSProperties = (
  styles: StyleState,
): React.CSSProperties => {
  return {
    fontFamily: styles.fontFamily,
    fontSize: styles.fontSize + "px",
    lineHeight: styles.lineHeight + "px",
    letterSpacing: styles.letterSpacing + "px",
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
    borderColor: styles.borderColor,
    boxShadow:
      boxShadowValues[styles.boxShadow as keyof typeof boxShadowValues],
    opacity: styles.opacity,
    width: styles.width,
    height: styles.height,

    display: styles.display,
    gridTemplateColumns: styles.gridTemplateColumns,
    gridTemplateRows: styles.gridTemplateRows,
    flexWrap: styles.flexWrap,
    justifyContent: styles.justifyContent,
    alignItems: styles.alignItems,
    gap: styles.gap ? `${styles.gap}px` : undefined,
  };
};
export const parsePixelValue = (value?: string | number): number => {
  if (typeof value === "string") {
    return parseInt(value.replace("px", ""), 10);
  }
  return value ? Number(value) : 0;
};

export const extractBackgroundImageUrl = (value?: string): string => {
  if (!value) return "";
  const match = value.match(/^url\((['"]?)(.*?)\1\)$/);
  return match ? match[2] : "";
};

export const reverseCSSProperties = (
  css: React.CSSProperties,
): Partial<StyleState> => {
  const styleState: Partial<StyleState> = {};

  if (css.color) styleState.color = css.color as string;
  if (css.backgroundColor)
    styleState.backgroundColor = css.backgroundColor as string;
  if (css.width) styleState.width = css.width as string;
  if (css.height) styleState.height = css.height as string;
  if (css.fontFamily) styleState.fontFamily = css.fontFamily as string;
  if (css.fontSize) styleState.fontSize = parsePixelValue(css.fontSize);
  if (css.lineHeight) styleState.lineHeight = parsePixelValue(css.lineHeight);
  if (css.letterSpacing)
    styleState.letterSpacing = parsePixelValue(css.letterSpacing);
  if (css.fontWeight) styleState.fontWeight = String(css.fontWeight);
  if (css.textAlign) styleState.textAlign = css.textAlign as string;
  if (css.backgroundImage)
    styleState.backgroundImageUrl = extractBackgroundImageUrl(
      css.backgroundImage,
    );
  if (css.backgroundSize)
    styleState.backgroundSize = css.backgroundSize as string;
  if (css.backgroundRepeat)
    styleState.backgroundRepeat = css.backgroundRepeat as string;
  if (css.padding) styleState.padding = parsePixelValue(css.padding);
  if (css.paddingTop) styleState.paddingTop = parsePixelValue(css.paddingTop);
  if (css.paddingRight)
    styleState.paddingRight = parsePixelValue(css.paddingRight);
  if (css.paddingBottom)
    styleState.paddingBottom = parsePixelValue(css.paddingBottom);
  if (css.paddingLeft)
    styleState.paddingLeft = parsePixelValue(css.paddingLeft);
  if (css.margin) styleState.margin = parsePixelValue(css.margin);
  if (css.marginTop) styleState.marginTop = parsePixelValue(css.marginTop);
  if (css.marginRight)
    styleState.marginRight = parsePixelValue(css.marginRight);
  if (css.marginBottom)
    styleState.marginBottom = parsePixelValue(css.marginBottom);
  if (css.marginLeft) styleState.marginLeft = parsePixelValue(css.marginLeft);
  if (css.borderRadius)
    styleState.borderRadius = parsePixelValue(css.borderRadius);
  if (css.borderWidth)
    styleState.borderWidth = parsePixelValue(css.borderWidth);
  if (css.borderStyle) styleState.borderStyle = css.borderStyle as string;
  if (css.borderColor) styleState.borderColor = css.borderColor as string;
  if (css.boxShadow) {
    styleState.boxShadow = Object.keys(boxShadowValues).find(
      (key) =>
        boxShadowValues[key as keyof typeof boxShadowValues] === css.boxShadow,
    ) as keyof typeof boxShadowValues;
  }
  if (css.opacity !== undefined) styleState.opacity = css.opacity as number;

  if (css.display) styleState.display = css.display as string;
  if (css.gridTemplateColumns)
    styleState.gridTemplateColumns = css.gridTemplateColumns as string;
  if (css.gridTemplateRows)
    styleState.gridTemplateRows = css.gridTemplateRows as string;
  if (css.flexWrap)
    styleState.flexWrap = css.flexWrap as StyleState["flexWrap"];
  if (css.justifyContent)
    styleState.justifyContent = css.justifyContent as string;
  if (css.alignItems) styleState.alignItems = css.alignItems as string;
  if (css.gap) styleState.gap = parsePixelValue(css.gap);

  return styleState;
};
