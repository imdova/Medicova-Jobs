"use client";

import { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Grid } from "@mui/material";
import { ViewModeSelector } from "@/components/page-builder/ViewModeSelector";
import { DraggableBlock } from "@/components/page-builder/DraggableBlock";
import ToolBar from "./toolbar";
import { Block } from "@/types/blog";
import BlogHeader from "@/components/page-builder/BlogHeader";

type ViewMode = "desktop" | "tablet" | "mobile";
const getViewModeWidth = (viewMode: ViewMode) => {
  switch (viewMode) {
    case "desktop":
      return "max-w-[1200px]";
    case "tablet":
      return "max-w-[768px]";
    case "mobile":
      return "max-w-[375px]";
  }
};

export default function PageBuilder() {
  // State management
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");

  // Block manipulation functions
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBlocks(items);
  };

  return (
    <div className="flex h-[calc(100vh-70px)] bg-background">
      <main className="scroll-bar-minimal flex-1 overflow-auto p-6">
        {/* Header Section */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Post Your Blog Now</h1>
          <ViewModeSelector
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* Content Area */}
        <div
          className={`mx-auto rounded-lg border bg-white p-8 shadow-sm transition-all ${getViewModeWidth(viewMode)}`}
        >
          {/* <BlogHeader /> */}
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
        selectedBlock={blocks.find((x) => x.id === selectedBlock?.id) || null}
        setSelectedBlock={setSelectedBlock}
      />
    </div>
  );
}
