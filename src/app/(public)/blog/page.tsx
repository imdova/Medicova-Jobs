"use client";
import { useState } from "react";
import { ViewModeSelector } from "@/components/page-builder/ViewModeSelector";
import { Block, BlogSettings, FormItem } from "@/types/blog";
import { findItemById } from "@/util/blog";

import "./styles.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FormModal from "@/components/form/FormModal/FormModal";

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
  const [forms, setForms] = useState<FormItem[]>(formList);
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const activeForm = forms.find((x) => selectedForm === x.id);

  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [onPreview, setPreview] = useState(false);

  return (
    <>
      <div>
        <EditorHeader
          blocks={blocks}
          onPreview={onPreview}
          setPreview={setPreview}
        />
        <DndProvider backend={HTML5Backend}>
          <div className="flex bg-background">
            <main className="relative max-w-full flex-1 overflow-hidden">
              <div className="flex max-h-[50px] items-center justify-center border-b border-gray-200 p-4">
                <ViewModeSelector
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />
              </div>
              {/* Header Section */}

              {/* Content Area */}
              {activeForm && (
                <FormModal
                  open={!!activeForm}
                  error={""}
                  loading={false}
                  onClose={() => setSelectedForm(null)}
                  onSubmit={(data) => console.log(data)}
                  fields={activeForm.fields}
                  title={activeForm.title}
                  description={activeForm.description}
                  dialog={Modal}
                />
              )}
              <div
                className={`scrollable-container scroll-bar-minimal !pointer-events-auto h-[calc(100vh-132px)] ${activeForm ? "overflow-hidden" : "!overflow-auto"} bg-gray-50 p-4`}
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
                      setSelectedForm={setSelectedForm}
                      forms={forms}
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
                forms={forms}
                setForms={setForms}
                selectedForm={selectedForm}
                setSelectedForm={setSelectedForm}
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
    </>
  );
}

import React from "react";
import ToolBar from "@/components/page-builder/panels/toolbar";
import EditorHeader from "@/components/page-builder/EditorHeader";
import ArticlePreview from "@/components/page-builder/blogReview";
import BlogBuilder from "@/components/page-builder/BlogBuilder";
import { formList } from "@/constants/pagebuilder/formFields";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  maxWidth?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  maxWidth = "600px",
  fullWidth = false,
  children,
}) => {
  if (!open) return null;

  return (
    <div className="absolute z-50 h-full w-full max-w-full">
      {/* Gray backdrop inside the parent */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Modal content container */}
      <div
        className="absolute left-1/2 top-1/2 max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-base bg-white p-2 shadow-md"
        style={{
          width: fullWidth ? "100%" : undefined,
          maxWidth: maxWidth,
        }}
      >
        {children}
      </div>
    </div>
  );
};
