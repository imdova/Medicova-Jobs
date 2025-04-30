import { boxShadowValues } from "../constants/blog";
import { StyleState } from "../types/blog";

export const generateCSSProperties = (
  styles: StyleState,
): React.CSSProperties => {
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

export const reverseCSSProperties = (css: React.CSSProperties): Partial<StyleState> => {
    const styleState: Partial<StyleState> = {};
    
    if (css.color) styleState.color = css.color as string;
    if (css.backgroundColor) styleState.backgroundColor = css.backgroundColor as string;
    if (css.width) styleState.width = css.width as string;
    if (css.height) styleState.height = css.height as string;
    if (css.fontFamily) styleState.fontFamily = css.fontFamily as string;
    if (css.fontSize) styleState.fontSize = parsePixelValue(css.fontSize);
    if (css.fontWeight) styleState.fontWeight = String(css.fontWeight);
    if (css.textAlign) styleState.textAlign = css.textAlign as string;
    if (css.backgroundImage) styleState.backgroundImageUrl = extractBackgroundImageUrl(css.backgroundImage);
    if (css.backgroundSize) styleState.backgroundSize = css.backgroundSize as string;
    if (css.backgroundRepeat) styleState.backgroundRepeat = css.backgroundRepeat as string;
    if (css.padding) styleState.padding = parsePixelValue(css.padding);
    if (css.paddingTop) styleState.paddingTop = parsePixelValue(css.paddingTop);
    if (css.paddingRight) styleState.paddingRight = parsePixelValue(css.paddingRight);
    if (css.paddingBottom) styleState.paddingBottom = parsePixelValue(css.paddingBottom);
    if (css.paddingLeft) styleState.paddingLeft = parsePixelValue(css.paddingLeft);
    if (css.margin) styleState.margin = parsePixelValue(css.margin);
    if (css.marginTop) styleState.marginTop = parsePixelValue(css.marginTop);
    if (css.marginRight) styleState.marginRight = parsePixelValue(css.marginRight);
    if (css.marginBottom) styleState.marginBottom = parsePixelValue(css.marginBottom);
    if (css.marginLeft) styleState.marginLeft = parsePixelValue(css.marginLeft);
    if (css.borderRadius) styleState.borderRadius = parsePixelValue(css.borderRadius);
    if (css.borderWidth) styleState.borderWidth = parsePixelValue(css.borderWidth);
    if (css.borderStyle) styleState.borderStyle = css.borderStyle as string;
    if (css.boxShadow) {
        styleState.boxShadow = Object.keys(boxShadowValues).find(
            (key) =>
                boxShadowValues[key as keyof typeof boxShadowValues] === css.boxShadow,
        ) as keyof typeof boxShadowValues;
    }
    if (css.opacity !== undefined) styleState.opacity = css.opacity as number;

    return styleState;
};
