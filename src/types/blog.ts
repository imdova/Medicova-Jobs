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
export interface Block {
  id: string;
  parentId?: string;
  type: BlockType;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  linkUrl?: string;
  styles: React.CSSProperties;
  blocks: Block[];
  level: number;
  allowNesting?: boolean;
  gridProps?: {
    xs?: number;
    sm?: number;
    md?: number;
  };
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

export interface TabProps {
  selectedBlock?: Block | null;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  setSelectedBlock: React.Dispatch<React.SetStateAction<Block | null>>;
}
