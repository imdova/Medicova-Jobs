// components/page-builder/BlockRenderer.tsx
import { TextareaAutosize } from "@mui/material";
import Image from "next/image";
import { BlockTextEditor } from "@/components/editor/editor";
import Resize from "@/components/UI/Resize";
import { Block } from "@/types/blog";
import { Droppable } from "@hello-pangea/dnd";
import { DraggableBlock } from "./DraggableBlock";

interface BlockRendererProps {
  block: Block;
  selectedBlock?: Block | null;
  onSelect: (block: Block) => void;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

function updateItem(
  blocks: Block[],
  block: Block,
  updatedFields: Partial<Block>,
) {
  return blocks.map((parentBlock) => {
    if (parentBlock.id !== block.parentId)
      return parentBlock.id === block.id
        ? { ...parentBlock, ...updatedFields }
        : parentBlock;

    const updatedNestedBlocks = parentBlock.blocks.map((item) => {
      if (item.id === block.id) {
        return { ...item, ...updatedFields };
      }
      return item;
    });

    return { ...parentBlock, blocks: updatedNestedBlocks };
  });
}

export function BlockRenderer({
  block,
  onSelect,
  selectedBlock,
  setBlocks,
}: BlockRendererProps) {
  const isSelected = selectedBlock?.id === block.id;

  // Helper function to update block content
  // const updateBlock = (id: string, content: string) => {
  //   setBlocks((prevBlocks) =>
  //     prevBlocks.map((block) =>
  //       block.id === id ? { ...block, content } : block,
  //     ),
  //   );
  // };
  const updateBlock = (block: Block, updatedFields: Partial<Block>) => {
    setBlocks((blocks) => updateItem(blocks, block, updatedFields));
  };

  // Helper function to update block styles
  const updateBlockStyles = (id: string, styles: Partial<Block["styles"]>) => {
    setBlocks((pv) =>
      pv.map((blc) =>
        blc.id === id
          ? {
              ...blc,
              styles: { ...blc.styles, ...styles } as { [key: string]: string },
            }
          : blc,
      ),
    );
  };

  const { width, height, ...styles } = block.styles;

  // Render different block types
  switch (block.type) {
    case "h1":
      return (
        <TextareaAutosize
          minRows={1}
          maxRows={10}
          placeholder="Heading 1"
          style={styles}
          value={block.content}
          onChange={(e) => updateBlock(block, { content: e.target.value })}
          className="w-full resize-none text-3xl font-bold tracking-tight focus:outline-none md:text-4xl"
        />
      );

    case "h2":
      return (
        <TextareaAutosize
          minRows={1}
          maxRows={10}
          style={styles}
          placeholder="Heading 2"
          value={block.content}
          onChange={(e) => updateBlock(block, { content: e.target.value })}
          className="w-full resize-none text-2xl font-semibold tracking-tight focus:outline-none md:text-3xl"
        />
      );

    case "h3":
      return (
        <TextareaAutosize
          minRows={1}
          maxRows={10}
          placeholder="Heading 3"
          style={styles}
          value={block.content}
          onChange={(e) => updateBlock(block, { content: e.target.value })}
          className="w-full resize-none text-xl font-semibold tracking-tight focus:outline-none md:text-2xl"
        />
      );

    case "paragraph":
      return (
        <BlockTextEditor
          isSelected={isSelected}
          value={block.content}
          onChange={(content) => updateBlock(block, { content })}
        />
      );

    case "image":
      return (
        <Resize
          value={{ width, height }}
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
            style={styles}
            className="h-full w-full object-cover"
          />
        </Resize>
      );

    case "button":
      return (
        <a
          href={block.linkUrl}
          style={styles}
          target="_blank"
          className="rounded-base bg-primary px-4 py-2 text-primary-foreground"
        >
          {block.content}
        </a>
      );

    case "html":
      return (
        <div
          style={styles}
          dangerouslySetInnerHTML={{ __html: block.content }}
          className="prose max-w-none"
        />
      );
    case "container":
      return (
        <div>
          <Droppable droppableId={block.id}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {block.blocks?.map((block, index) => (
                  <DraggableBlock
                    key={block.id}
                    block={block}
                    index={index}
                    selectedBlock={selectedBlock}
                    onSelect={onSelect}
                    setBlocks={setBlocks}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      );

    default:
      return null;
  }
}
