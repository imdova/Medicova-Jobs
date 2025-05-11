import { Block } from "@/types/blog";
import { StyleState } from "../types/blog";

export const initialStyles: StyleState = {
  fontFamily: "Arial",
  fontSize: 16,
  lineHeight: 20,
  fontWeight: "400",
  textAlign: "left",
  color: "#000000",
  backgroundColor: "#ffffff",
  backgroundImageUrl: "",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  borderStyle: "none",
  boxShadow: "none",
  opacity: 1,
  width: "auto",
  height: "auto",
  letterSpacing: 1,
};

const HEADER_1_STYLES: React.CSSProperties = {
  width: "100%",
  resize: "none",
  fontSize: "32px",
  fontWeight: 700,
  backgroundColor: "transparent",
  lineHeight: "32px",
};
const HEADER_2_STYLES: React.CSSProperties = {
  ...HEADER_1_STYLES,
  fontSize: "24px",
  lineHeight: "26px",
};
const HEADER_3_STYLES: React.CSSProperties = {
  ...HEADER_1_STYLES,
  fontSize: "20px",
  lineHeight: "24px",
};
const BUTTON_STYLES: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "18px",
  borderRadius: "10px",
  backgroundColor: "#2ba149",
  padding: "16px 8px",
  color: "#ffffff",
};
const TEXT_STYLES: React.CSSProperties = {
  ...HEADER_1_STYLES,
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "18px",
};
const FLEX_STYLES: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  // gap: "12px", // Equivalent to gap-3 (3 * 4px)
};
const CONTAINER_STYLES: React.CSSProperties = {
  width: "100%",
  // flexGrow: 1,
  // flex: "1 1 0%",
};
const QUOTE_STYLES: React.CSSProperties = {
  borderLeft: "4px solid #d1d5db", // border-l-4 border-gray-300
  backgroundColor: "#f9fafb", // bg-gray-50
  padding: "16px", // p-4
  fontStyle: "italic", // italic
  color: "#4b5563", // text-gray-600
};
const CODE_STYLES: React.CSSProperties = {
  overflow: "auto",
  borderRadius: "4px",
  backgroundColor: "#1f2937", // bg-gray-800
  padding: "16px", // p-4
  fontSize: "14px", // text-sm
  color: "#ffffff", // text-white
};
const VIDEO_STYLES: React.CSSProperties = {
  aspectRatio: "16 / 9",
  height: "auto",
  maxHeight: "400px",
  width: "100%",
  overflow: "hidden",
};

const IMAGE_STYLES: React.CSSProperties = {
  height: "100%",
  width: "100%",
};

// const FLEX_CONTAINER_STYLES = css({
//   display: "flex",
//   flexDirection: "column",
//   flexWrap: "wrap",
//   gap: "12px", // Equivalent to gap-3 (3 * 4px)
//   "@media (min-width: 768px)": {
//     flexDirection: "row",
//   },
// });

export const blockStyles: Record<Block["type"], React.CSSProperties> = {
  h1: HEADER_1_STYLES,
  h2: HEADER_2_STYLES,
  h3: HEADER_3_STYLES,
  button: BUTTON_STYLES,
  text: TEXT_STYLES,
  "flex-column": {},
  "flex-row": FLEX_STYLES,
  code: CODE_STYLES,
  container: CONTAINER_STYLES,
  divider: {},
  grid: {},
  html: {},
  image: IMAGE_STYLES,
  paragraph: {},
  quote: QUOTE_STYLES,
  video: VIDEO_STYLES,
};
