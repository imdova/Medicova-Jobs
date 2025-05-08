/* eslint-disable @next/next/no-img-element */
// components/page-builder/BlockRenderer.tsx
import { Divider, TextareaAutosize } from "@mui/material";
import { BlockTextEditor } from "@/components/editor/editor";
import { Block } from "@/types/blog";
import { Droppable } from "@hello-pangea/dnd";
import { DraggableBlock } from "./DraggableBlock";
import { updateItem } from "@/util/blog";
import YouTubePlayer from "../UI/youtube-video-player";
import { Info } from "lucide-react";
import Resize from "../UI/Resize";

interface BlockRendererProps {
  block: Block;
  selectedBlock?: Block | null;
  onSelect: (block: Block) => void;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

export function BlockRenderer({
  block,
  onSelect,
  selectedBlock,
  setBlocks,
}: BlockRendererProps) {
  const isSelected = selectedBlock?.id === block.id;

  const updateBlock = (block: Block, data: Partial<Block>) => {
    setBlocks((blocks) => {
      const newBlocks = [...blocks];
      updateItem(newBlocks, block.id, data);
      return newBlocks;
    });
  };

  const updateBlockStyles = (styles: Partial<Block["styles"]>) => {
    setBlocks((bc) => {
      const newBlocks = [...bc];
      updateItem(newBlocks, block?.id, {
        styles: { ...block.styles, ...styles },
      });
      return newBlocks;
    });
  };

  const styles = block.styles || {
    width: "auto",
    height: "auto",
  };

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
          className="resize-none focus:outline-none"
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
          className="flex resize-none items-center focus:outline-none"
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
          className="resize-none focus:outline-none"
        />
      );
    case "text":
      return (
        <TextareaAutosize
          minRows={1}
          maxRows={10}
          placeholder="Text"
          style={styles}
          value={block.content}
          onChange={(e) => updateBlock(block, { content: e.target.value })}
          className="w-full resize-none focus:outline-none"
        />
      );

    case "paragraph":
      return (
        <BlockTextEditor
          isSelected={isSelected}
          value={block.content || "<p> This Is My Paragraph </p>"}
          style={styles}
          onChange={(content) => updateBlock(block, { content })}
        />
      );
    case "divider":
      return <Divider style={styles} />;

    case "image":
      return (
        <Resize
          value={{ width: styles.width, height: styles.height }}
          onChange={(styles) => updateBlockStyles(styles)}
        >
          <img
            src={
              block.imageUrl ||
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            }
            alt="Content"
            style={styles}
          />
        </Resize>
      );

    case "button":
      return (
        <a href={block.linkUrl} style={styles} target="_blank">
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
        <Droppable
          droppableId={"drop-" + block.id}
          type={"BLOCK"} // Use the same type for all droppables
          isCombineEnabled={false} // Disable combining items
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              className={`${block.blocks.length === 0 ? "min-h-24" : ""} h-full min-w-60 rounded-base`}
              ref={provided.innerRef}
              style={styles}
            >
              {block.blocks?.length === 0 && (
                <div className="flex items-center justify-center p-5">
                  <span className="max-w-44 text-center text-2xl font-semibold text-gray-300">
                    Add block to container
                  </span>
                </div>
              )}
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
      );
    case "flex-row":
      return (
        <Droppable
          droppableId={"drop-" + block.id}
          type="BLOCK"
          isCombineEnabled={false}
          direction="horizontal"
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              className="flex flex-col flex-wrap gap-3 md:flex-row"
              ref={provided.innerRef}
              style={styles}
            >
              {block.blocks?.map((block, index) => (
                <div key={block.id} className="h-full w-full flex-1">
                  <DraggableBlock
                    block={block}
                    index={index}
                    selectedBlock={selectedBlock}
                    onSelect={onSelect}
                    setBlocks={setBlocks}
                  />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      );

    case "quote":
      return (
        <blockquote style={styles}>
          <TextareaAutosize
            minRows={1}
            maxRows={10}
            placeholder="Quote"
            value={block.content}
            onChange={(e) => updateBlock(block, { content: e.target.value })}
            className="w-full resize-none bg-transparent focus:outline-none"
          />
        </blockquote>
      );

    case "code":
      return (
        <pre style={styles}>
          <TextareaAutosize
            minRows={1}
            maxRows={20}
            placeholder="Insert your code here"
            value={block.content}
            onChange={(e) => updateBlock(block, { content: e.target.value })}
            className="w-full resize-none bg-transparent text-white focus:outline-none"
          />
        </pre>
      );

    case "video":
      return (
        <div style={styles}>
          {block.videoUrl ? (
            <YouTubePlayer
              videoUrl={block.videoUrl}
              priority={true}
              autoPlay={true}
              thumbnailUrl={block.videoThumbnail}
            />
          ) : (
            <div className="flex items-center justify-center bg-gray-500">
              <Info /> <span>This Video isn&apos;t Available </span>
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
}
