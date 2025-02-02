"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
} from "@hello-pangea/dnd";

import Image from "next/image";
import {
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextareaAutosize,
} from "@mui/material";
import ToolBar from "./toolbar";
import { Block } from "@/types/blog";
import { Laptop, Link, Smartphone, Tablet } from "lucide-react";
import { DragIndicator } from "@mui/icons-material";
import { BlockTextEditor } from "@/components/editor/editor";
import Resize from "@/components/UI/Resize";

const renderBlock = ({
  block,
  isSelected,
  setBlocks,
}: {
  block: Block;
  isSelected: Boolean;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}) => {
  const updateBlock = (id: string, content: string) => {
    setBlocks((pv) =>
      pv.map((block) => (block.id === id ? { ...block, content } : block)),
    );
  };

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
          onChange={(e) => updateBlock(block.id, e)}
        />
      );
    case "image":
      return (
        <Resize
          value={{
            width: block.styles.width,
            height: block.styles.height,
          }}
          onChange={(styles) =>
            setBlocks((pv) =>
              pv.map((blc) =>
                blc.id === block.id
                  ? { ...blc, styles: { ...blc.styles, ...styles } }
                  : blc,
              ),
            )
          }
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
      return <div dangerouslySetInnerHTML={{ __html: block.content }} />;
    default:
      return null;
  }
};

export default function PageBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBlocks(items);
  };

  return (
    <div className="bg-background flex h-screen">
      {/* // page  */}
      <main className="scroll-bar-minimal flex-1 overflow-auto p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Page Builder</h1>
          <div className="flex gap-2">
            <IconButton
              className={`border border-solid border-gray-200 ${viewMode === "desktop" ? "bg-light-primary text-white" : ""}`}
              onClick={() => setViewMode("desktop")}
            >
              <Laptop className="h-4 w-4" />
            </IconButton>
            <IconButton
              className={`border border-solid border-gray-200 ${viewMode === "tablet" ? "bg-light-primary text-white" : ""}`}
              onClick={() => setViewMode("tablet")}
            >
              <Tablet className="h-4 w-4" />
            </IconButton>
            <IconButton
              className={`border border-solid border-gray-200 ${viewMode === "mobile" ? "bg-light-primary text-white" : ""}`}
              onClick={() => setViewMode("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </IconButton>
          </div>
        </div>

        <div
          className={`mx-auto overflow-x-hidden rounded-lg border bg-white p-8 shadow-sm transition-all ${
            viewMode === "desktop"
              ? "max-w-[1200px]"
              : viewMode === "tablet"
                ? "max-w-[768px]"
                : "max-w-[375px]"
          }`}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="blocks">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[500px]"
                >
                  <Grid container spacing={2}>
                    {blocks.map((block, index) => (
                      <Grid
                        item
                        xs={block.gridProps?.xs ?? 12}
                        sm={block.gridProps?.sm}
                        md={block.gridProps?.md}
                        key={String(block.id)}
                      >
                        <Draggable
                          key={block.id}
                          draggableId={block.id}
                          index={index}
                        >
                          {(provided) => (
                            <MainBlock
                              block={block}
                              setBlocks={setBlocks}
                              provided={provided}
                              selectedBlock={selectedBlock}
                              setSelectedBlock={setSelectedBlock}
                            />
                          )}
                        </Draggable>
                      </Grid>
                    ))}
                  </Grid>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </main>

      <ToolBar
        blocks={blocks}
        setBlocks={setBlocks}
        selectedBlock={selectedBlock}
        setSelectedBlock={setSelectedBlock}
      />
    </div>
  );
}

export const MainBlock: React.FC<{
  block: Block;
  selectedBlock: Block | null;
  setSelectedBlock: React.Dispatch<React.SetStateAction<Block | null>>;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  provided: DraggableProvided;
}> = ({ block, provided, setSelectedBlock, setBlocks, selectedBlock }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    blockId: string,
  ) => {
    if (!isDragging) {
      event.preventDefault();
      event.stopPropagation();
      setMenuAnchorEl(event.currentTarget);
      setActiveBlockId(blockId);
    }
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setActiveBlockId(null);
  };

  const removeBlock = (id: string) => {
    setBlocks((pv) => pv.filter((x) => x.id !== id));
  };
  const splitBlock = (id: string) => {
    setBlocks((pv) =>
      pv.map((block) =>
        block.id === id ? { ...block, gridProps: { xs: 12, sm: 6 } } : block,
      ),
    );
  };
  const fullWidthBlock = (id: string) => {
    setBlocks((pv) =>
      pv.map((block) =>
        block.id === id ? { ...block, gridProps: {} } : block,
      ),
    );
  };
  const duplicate = (block: Block) => {
    const newBlock: Block = {
      ...block,
      id: Math.random().toString(36).slice(2, 11),
    };
    setBlocks((blocks) => [...blocks, newBlock]);
    setSelectedBlock(newBlock);
  };

  const handleMenuAction = (action: string) => {
    if (action === "Delete") {
      removeBlock(block.id);
    } else if (action === "Duplicate") {
      duplicate(block);
    } else if (action === "Split") {
      splitBlock(block.id);
    } else if (action === "Full-Width") {
      fullWidthBlock(block.id);
    }
    handleMenuClose();
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      onClick={() => setSelectedBlock(block)}
      className={`group relative flex items-start border p-4 pt-6 ${selectedBlock?.id === block.id ? "border-primary" : "border-neutral-200 hover:border-neutral-400"}`}
    >
      <div className="invisible mr-4 cursor-move rounded group-hover:visible">
        <IconButton
          {...provided.dragHandleProps}
          size="small"
          className="p-0"
          onClick={(e) => handleMenuClick(e, block.id)}
        >
          <DragIndicator fontSize="small" />
        </IconButton>
      </div>
      {renderBlock({
        block: block,
        isSelected: selectedBlock?.id === block.id,
        setBlocks,
      })}
      <Menu
        anchorEl={menuAnchorEl}
        open={activeBlockId === block.id}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        {block.type === "image" && (
          <MenuItem onClick={() => handleMenuAction("Split")}></MenuItem>
        )}
        <MenuItem onClick={() => handleMenuAction("Split")}>Split</MenuItem>
        <MenuItem onClick={() => handleMenuAction("Full-Width")}>
          Full Width
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction("Delete")}>Delete</MenuItem>
        <MenuItem onClick={() => handleMenuAction("Duplicate")}>
          Duplicate
        </MenuItem>
      </Menu>
    </div>
  );
};
