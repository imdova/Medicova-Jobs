// components/page-builder/BlockRenderer.tsx
import { Divider, TextareaAutosize } from "@mui/material";
import { BlockTextEditor } from "@/components/editor/editor";
import { Block } from "@/types/blog";
import { Droppable } from "@hello-pangea/dnd";
import { DraggableBlock } from "./DraggableBlock";
import { updateItem } from "@/util/blog";
import ImageResizer from "./ImageResizer";
import YouTubePlayer from "../UI/youtube-video-player";
import { Info } from "lucide-react";

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
          className="focus:outline-none"
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
          onChange={(content) => updateBlock(block, { content })}
        />
      );
    case "divider":
      return <Divider sx={styles} />;

    case "image":
      return (
        <ImageResizer
          src={
            block.imageUrl ||
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
          }
          styles={styles}
        />
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
          <Droppable droppableId={"drop-" + block.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                className={`${block.blocks.length === 0 ? "min-h-24" : ""} h-full min-w-60 rounded-base`}
                ref={provided.innerRef}
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
        </div>
      );
    case "flex-row":
      return (
        <Droppable droppableId={block.id} direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              className="flex flex-col flex-wrap gap-3 md:flex-row"
              ref={provided.innerRef}
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
        <blockquote
          style={styles}
          className="border-l-4 border-gray-300 bg-gray-50 p-4 italic text-gray-600"
        >
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
        <pre
          style={styles}
          className="overflow-auto rounded bg-gray-800 p-4 text-sm text-white"
        >
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
        <div className="aspect-video h-auto max-h-[400px] w-full overflow-hidden">
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
