import { FieldConfig } from ".";

export interface StyleState {
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: string;
  textAlign?: string;
  color?: string;
  backgroundColor?: string;
  backgroundImageUrl?: string;
  backgroundSize?: string;
  backgroundRepeat?: string;
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  margin?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: string;
  boxShadow?: string;
  opacity?: number;
  width?: string;
  height?: string;
  letterSpacing?: number;

  display?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  justifyContent?: string;
  alignItems?: string;
  gap?: number;
}


export type BlockType =
  | "h1"
  | "h2"
  | "h3"
  | "text"
  | "paragraph"
  | "image"
  | "button"
  | "html"
  | "divider" // need to be added
  | "container" // need to be added
  | "grid" // need to be added
  | "flex-row" // need to be added
  | "flex-column" // need to be added
  | "quote" // need to be added
  | "code" // need to be added
  | "video"; // need to be added

export type ToolBarTabs = "blocks" | "styles" | "forms" | "settings";

export interface Block {
  id: string;
  parentId?: string | null;
  type: BlockType;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  isForm?: boolean;
  linkUrl?: string;
  formId?: string;
  styles: React.CSSProperties | null;
  blocks: Block[];
  level: number;
  allowNesting?: boolean;
}

export interface FormItem {
  id: string;
  name: string;
  title?: string;
  description?: string;
  fields: FieldConfig[];
  apiEndpoint?: string;
  afterSubmit?: string;
  afterSubmitMessage?: string;
  onSuccessRedirect?: string;
  onSuccessMessage?: string;
  onErrorRedirect?: string;
  onErrorMessage?: string;
}

export type BlogSettings = {
  title: string;
  slug: string;
  cover: string;
  category: string;
  shortDescription: string;
  author: string;
};
export type BlockButton = {
  id: BlockType;
  icon: React.ReactNode;
  label: string;
  blockProps?: Partial<Block>;
};

export type BlockForm = {
  title?: string;
  type: BlockType[];
  description?: string;
  isModal?: boolean;
  fields: FieldConfig<Block>[];
};
export interface TabProps {
  selectedBlock?: Block | null;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  setSelectedBlock: React.Dispatch<React.SetStateAction<Block | null>>;
  setSelectedTab: React.Dispatch<
    React.SetStateAction<ToolBarTabs>
  >;
  forms?: FormItem[];
}
