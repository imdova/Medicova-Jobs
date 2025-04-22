"use client";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import { ViewModeSelector } from "@/components/page-builder/ViewModeSelector";
import { DraggableBlock } from "@/components/page-builder/DraggableBlock";
import ToolBar from "./toolbar";
import { Block, BlogSettings } from "@/types/blog";
import EditorHeader from "./EditorHeader";
import { findItemById } from "@/util/blog";
import { onDragEndHandler } from "./blog";

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

const initialSetting: BlogSettings = {
  title: "",
  slug: "",
  cover: "",
  category: "",
  shortDescription: "",
  author: "1",
};

export default function PageBuilder() {
  // State management
  const [settings, setSettings] = useState<BlogSettings>(initialSetting);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = blocks.map((x) => x.id).indexOf(active.id as string);
      const newIndex = blocks.map((x) => x.id).indexOf(over.id as string);
      setBlocks(arrayMove(blocks, oldIndex, newIndex));
    }
  };

  // const onDragEnd = (result: any) => {
  //   const { source, draggableId, destination, type } = result;

  //   if (!destination) return;

  //   destination.droppableId = destination.droppableId.replace("drop-", "");
  //   source.droppableId = source.droppableId.replace("drop-", "");

  //   if (type === "GROUP") {
  //     const newBlocks = [...blocks];
  //     const [movedBlock] = newBlocks.splice(source.index, 1);
  //     newBlocks.splice(destination.index, 0, movedBlock);
  //     setBlocks(newBlocks);
  //     return;
  //   }
  //   const newBlocks = onDragEndHandler(
  //     blocks,
  //     draggableId,
  //     source,
  //     destination,
  //   );
  //   setBlocks(newBlocks);
  // };

  return (
    <div>
      <EditorHeader />
      <div className="flex bg-background">
        <main className="flex-1">
          <div className="flex max-h-[50px] items-center justify-center border-b border-gray-200 p-4">
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
              onClick={() => {
                setSelectedBlock(null);
              }}
              className={`mx-auto min-h-full border bg-white p-2 shadow-soft transition-all ${getViewModeWidth(viewMode)}`}
            >
              {/* <BlogHeader /> */}
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext
                  items={blocks}
                  strategy={verticalListSortingStrategy}
                >
                  {blocks.map((block, index) => (
                    <DraggableBlock
                      key={block.id}
                      block={block}
                      index={index}
                      selectedBlock={
                        selectedBlock?.id
                          ? findItemById(blocks, selectedBlock?.id)
                          : undefined
                      }
                      onSelect={setSelectedBlock}
                      setBlocks={setBlocks}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </main>

        {/* Toolbars and Menus */}
        <ToolBar
          blocks={blocks}
          setBlocks={setBlocks}
          selectedBlock={
            selectedBlock?.id
              ? findItemById(blocks, selectedBlock?.id)
              : undefined
          }
          settings={settings}
          updateSettings={setSettings}
          setSelectedBlock={setSelectedBlock}
        />
      </div>
    </div>
  );
}
