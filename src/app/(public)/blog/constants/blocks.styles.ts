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

export const HEADER_1_STYLES: React.CSSProperties = {
  width: "100%",
  resize: "none",
  fontSize: "24px",
  fontWeight: 700,
  lineHeight: "26px",
};

export const blockStyles: Record<Block["type"], React.CSSProperties> = {
  h1: HEADER_1_STYLES,
  h2: HEADER_1_STYLES,
  h3: HEADER_1_STYLES,
  button: HEADER_1_STYLES,
  text: HEADER_1_STYLES,
  "flex-column": HEADER_1_STYLES,
  "flex-row": HEADER_1_STYLES,
  code: HEADER_1_STYLES,
  container: HEADER_1_STYLES,
  divider: HEADER_1_STYLES,
  grid: HEADER_1_STYLES,
  html: HEADER_1_STYLES,
  image: HEADER_1_STYLES,
  paragraph: HEADER_1_STYLES,
  quote: HEADER_1_STYLES,
  video: HEADER_1_STYLES,
};
