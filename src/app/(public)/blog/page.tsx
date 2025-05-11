"use client";
import { useState } from "react";
import { ViewModeSelector } from "@/components/page-builder/ViewModeSelector";
import ToolBar from "./toolbar";
import { Block, BlogSettings } from "@/types/blog";
import EditorHeader from "./EditorHeader";
import { findItemById } from "@/util/blog";
import ArticlePreview from "./blogReview";

import "./styles.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BlogBuilder from "./BlogBuilder";

type ViewMode = "desktop" | "tablet" | "mobile";

const getViewModeWidth = (viewMode: ViewMode) => {
  switch (viewMode) {
    case "desktop":
      return "max-w-[1100px]";
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
  const [onPreview, setPreview] = useState(false);

  return (
    <div>
      <EditorHeader
        blocks={blocks}
        onPreview={onPreview}
        setPreview={setPreview}
      />
      <DndProvider backend={HTML5Backend}>
        <div className="flex bg-background">
          <main className="max-w-full flex-1 overflow-hidden">
            <div className="flex max-h-[50px] items-center justify-center border-b border-gray-200 p-4">
              <ViewModeSelector
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            </div>
            {/* Header Section */}

            {/* Content Area */}
            <div
              className={`scrollable-container scroll-bar-minimal !pointer-events-auto h-[calc(100vh-132px)] !overflow-auto bg-gray-50 p-4`}
            >
              <div
                onClick={() => {
                  setSelectedBlock(null);
                }}
                className={`mx-auto flex min-h-full flex-col border bg-white p-2 shadow-soft transition-all ${getViewModeWidth(viewMode)}`}
              >
                {onPreview ? (
                  <ArticlePreview blocks={blocks} />
                ) : (
                  <BlogBuilder
                    blocks={blocks}
                    selectedBlock={selectedBlock}
                    setBlocks={setBlocks}
                    setSelectedBlock={setSelectedBlock}
                  />
                )}
              </div>
            </div>
          </main>

          {/* Toolbars and Menus */}
          {!onPreview && (
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
          )}
        </div>
      </DndProvider>
    </div>
  );
}
