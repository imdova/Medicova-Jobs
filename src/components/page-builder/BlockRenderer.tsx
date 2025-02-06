// components/page-builder/BlockRenderer.tsx
import { TextareaAutosize } from "@mui/material";
import Image from "next/image";
import { BlockTextEditor } from "@/components/editor/editor";
import Resize from "@/components/UI/Resize";
import { Block } from "@/types/blog";

interface BlockRendererProps {
  block: Block;
  isSelected: boolean;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

export function BlockRenderer({
  block,
  isSelected,
  setBlocks,
}: BlockRendererProps) {
  // Helper function to update block content
  const updateBlock = (id: string, content: string) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, content } : block,
      ),
    );
  };

  // Helper function to update block styles
  const updateBlockStyles = (id: string, styles: Partial<Block["styles"]>) => {
      setBlocks((pv) =>
        pv.map((blc) =>
          blc.id === id
            ? { ...blc, styles: { ...blc.styles, ...styles } as { [key: string]: string } }
            : blc,
        ),
      );
    };

  // Render different block types
  switch (block.type) {
    case "h1":
      return (
        <TextareaAutosize
          minRows={1}
          maxRows={10}
          placeholder="Heading 1"
          value={block.content}
          onChange={(e) => updateBlock(block.id, e.target.value)}
          className="w-full resize-none text-3xl font-bold tracking-tight focus:outline-none md:text-4xl"
        />
      );

    case "h2":
      return (
        <TextareaAutosize
          minRows={1}
          maxRows={10}
          placeholder="Heading 2"
          value={block.content}
          onChange={(e) => updateBlock(block.id, e.target.value)}
          className="w-full resize-none text-2xl font-semibold tracking-tight focus:outline-none md:text-3xl"
        />
      );

    case "h3":
      return (
        <TextareaAutosize
          minRows={1}
          maxRows={10}
          placeholder="Heading 3"
          value={block.content}
          onChange={(e) => updateBlock(block.id, e.target.value)}
          className="w-full resize-none text-xl font-semibold tracking-tight focus:outline-none md:text-2xl"
        />
      );

    case "paragraph":
      return (
        <BlockTextEditor
          isSelected={isSelected}
          value={block.content}
          onChange={(content) => updateBlock(block.id, content)}
        />
      );

    case "image":
      return (
        <Resize
          value={{
            width: block.styles?.width,
            height: block.styles?.height,
          }}
          onChange={(styles) => updateBlockStyles(block.id, styles)}
        >
          <Image
            src={
              block.imageUrl ||
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            }
            alt="Content"
            width={300}
            height={300}
          />
        </Resize>
      );

    case "button":
      return (
        <a
          href={block.linkUrl}
          className="rounded-base bg-primary px-4 py-2 text-primary-foreground"
        >
          {block.content}
        </a>
      );

    case "html":
      return (
        <div
          dangerouslySetInnerHTML={{ __html: block.content }}
          className="prose max-w-none"
        />
      );

    default:
      return null;
  }
}
