"use client";

import { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ViewModeSelector } from "@/components/page-builder/ViewModeSelector";
import { DraggableBlock } from "@/components/page-builder/DraggableBlock";
import ToolBar from "./toolbar";
import { Block } from "@/types/blog";
import EditorHeader from "./EditorHeader";
// import BlogHeader from "@/components/page-builder/BlogHeader";

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
    <div>
      <EditorHeader />
      <div className="flex bg-background">
        <main className="flex-1">
          <div className="max-h-[50px] flex items-center justify-center border-b p-4 border-gray-200">
            <ViewModeSelector
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
          {/* Header Section */}

          {/* Content Area */}
          <div
            className={`scroll-bar-minimal h-[calc(100vh-132px)] overflow-auto bg-gray-50 p-4`}
          >
            <div
              className={`mx-auto h-full border bg-white p-4 shadow-soft transition-all ${getViewModeWidth(viewMode)}`}
            >
              {/* <BlogHeader /> */}
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="blocks">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
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
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
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
    </div>
  );
}
