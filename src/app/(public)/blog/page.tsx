"use client";

import { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Grid } from "@mui/material";
import { ViewModeSelector } from "@/components/page-builder/ViewModeSelector";
import { DraggableBlock } from "@/components/page-builder/DraggableBlock";
import ToolBar from "./toolbar";
import { BlockMenu } from "@/components/page-builder/BlockMenu";
import { Block } from "@/types/blog";


export default function PageBuilder() {
  // State management
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  // Block manipulation functions
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBlocks(items);
  };

  const handleBlockAction = (block: Block, action: string) => {
    switch (action) {
      case "Delete":
        setBlocks((prev) => prev.filter((x) => x.id !== block.id));
        break;
      case "Duplicate":
        const newBlock = { ...block, id: Math.random().toString(36).slice(2, 11) };
        setBlocks((prev) => [...prev, newBlock]);
        setSelectedBlock(newBlock);
        break;
      case "Split":
        setBlocks((prev) =>
          prev.map((b) =>
            b.id === block.id ? { ...b, gridProps: { xs: 12, sm: 6 } } : b
          )
        );
        break;
      case "Full-Width":
        setBlocks((prev) =>
          prev.map((b) => (b.id === block.id ? { ...b, gridProps: {} } : b))
        );
        break;
    }
    handleMenuClose();
  };

  // Menu handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, blockId: string) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setActiveBlockId(blockId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setActiveBlockId(null);
  };

  // View mode calculations
  const getViewModeWidth = () => {
    switch (viewMode) {
      case "desktop":
        return "max-w-[1200px]";
      case "tablet":
        return "max-w-[768px]";
      case "mobile":
        return "max-w-[375px]";
    }
  };

  return (
    <div className="bg-background flex h-screen">
      <main className="scroll-bar-minimal flex-1 overflow-auto p-6">
        {/* Header Section */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Page Builder</h1>
          <ViewModeSelector viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        {/* Content Area */}
        <div
          className={`mx-auto overflow-x-hidden rounded-lg border bg-white p-8 shadow-sm transition-all ${getViewModeWidth()}`}
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="blocks">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[500px]"
                >
                  <Grid container spacing={2}>
                    {blocks.map((block, index) => (
                      <DraggableBlock
                        key={block.id}
                        block={block}
                        index={index}
                        isSelected={selectedBlock?.id === block.id}
                        onSelect={setSelectedBlock}
                        onMenuOpen={handleMenuOpen}
                        setBlocks={setBlocks}
                      />
                    ))}
                  </Grid>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </main>

      {/* Toolbars and Menus */}
      <ToolBar
        blocks={blocks}
        setBlocks={setBlocks}
        selectedBlock={selectedBlock}
        setSelectedBlock={setSelectedBlock}
      />

      {activeBlockId && (
        <BlockMenu
          block={blocks.find((b) => b.id === activeBlockId)!}
          anchorEl={menuAnchorEl}
          isOpen={Boolean(activeBlockId)}
          onClose={handleMenuClose}
          onAction={handleBlockAction}
        />
      )}
    </div>
  );
}