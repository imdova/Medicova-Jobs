"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import Image from "next/image";
import { Button, IconButton } from "@mui/material";
import ToolBar from "./toolbar";
import { Block } from "@/types/blog";
import { Laptop, Smartphone, Tablet } from "lucide-react";

const renderBlock = (block: Block) => {
  switch (block.type) {
    case "h1":
      return <h1 style={block.styles}>{block.content || "Heading 1"}</h1>;
    case "h2":
      return <h2 style={block.styles}>{block.content || "Heading 2"}</h2>;
    case "h3":
      return <h3 style={block.styles}>{block.content || "Heading 3"}</h3>;
    case "paragraph":
      return <p style={block.styles}>{block.content || "Paragraph text"}</p>;
    case "image":
      return (
        <Image
          src={block.content || "https://source.unsplash.com/random/800x400"}
          alt="Content"
          style={block.styles}
          width={400}
          height={400}
          className="h-auto max-w-full"
        />
      );
    case "button":
      return (
        <Button style={block.styles}>{block.content || "Click me"}</Button>
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
          className={`mx-auto rounded-lg border bg-white p-8 shadow-sm transition-all ${
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
                  {blocks.map((block, index) => (
                    <Draggable
                      key={block.id}
                      draggableId={block.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`mb-4 cursor-move rounded-lg border p-4 hover:border-primary ${
                            selectedBlock?.id === block.id
                              ? "border-primary"
                              : "border-border"
                          }`}
                          onClick={() => setSelectedBlock(block)}
                        >
                          {renderBlock(block)}
                        </div>
                      )}
                    </Draggable>
                  ))}
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
