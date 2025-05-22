"use client";
import { Block, BlogSettings, FormItem, ToolBarTabs } from "@/types/blog";
import React, { useEffect, useState } from "react";
import StylePanel from "@/components/page-builder/panels/stylePanel";
import BlocksPanel from "@/components/page-builder/panels/blocksPanel";
import SettingsPanel from "@/components/page-builder/panels/SettingsPanel";
import { FormBuilder } from "./formBuilder";

interface ToolBarProps {
  settings: BlogSettings;
  updateSettings: (settings: BlogSettings) => void;
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  forms: FormItem[];
  setForms: React.Dispatch<React.SetStateAction<FormItem[]>>;
  selectedBlock?: Block | null;
  setSelectedBlock: React.Dispatch<React.SetStateAction<Block | null>>;
  selectedForm?: string | null;
  setSelectedForm: React.Dispatch<React.SetStateAction<string | null>>;
}

const tabs: ToolBarTabs[] = ["blocks", "styles", "forms", "settings"];

const ToolBar: React.FC<ToolBarProps> = ({
  settings,
  updateSettings,
  setBlocks,
  selectedBlock,
  setSelectedBlock,
  forms,
  setForms,
  selectedForm,
  setSelectedForm,
}) => {
  const [selectedTab, setSelectedTab] = useState<ToolBarTabs>("blocks");

  useEffect(() => {
    if (selectedBlock) {
      if (selectedBlock && selectedBlock.allowNesting) return;
      setSelectedTab("styles");
    } else {
      setSelectedTab("blocks");
    }
  }, [selectedBlock]);

  return (
    <aside className="bg-muted/30 w-96 border-l">
      <div>
        <div className="flex h-[50px] min-w-3 items-center border-b  justify-center gap-2 p-0 text-xs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`h-[50px] flex items-center justify-center capitalize text-sm flex-1 min-w-3 p-0 ${
                selectedTab === tab ? "bg-primary text-white" : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="scroll-bar-minimal max-h-[calc(100vh-146px)] space-y-6 overflow-y-auto p-4">
          {selectedTab === "blocks" && (
            <BlocksPanel
              selectedBlock={selectedBlock}
              setBlocks={setBlocks}
              setSelectedBlock={setSelectedBlock}
              setSelectedTab={setSelectedTab}
              forms={forms}
            />
          )}
          {selectedTab === "styles" && (
            <StylePanel
              selectedBlock={selectedBlock}
              setBlocks={setBlocks}
              setSelectedBlock={setSelectedBlock}
              setSelectedTab={setSelectedTab}
              forms={forms}
            />
          )}
          {selectedTab === "forms" && (
            <FormBuilder
              forms={forms}
              setForms={setForms}
              selectedForm={selectedForm}
              setSelectedForm={setSelectedForm}
            />
          )}
          {selectedTab === "settings" && (
            <SettingsPanel
              settings={settings}
              updateSettings={updateSettings}
            />
          )}
        </div>
        {/* )} */}
      </div>
    </aside>
  );
};

export default ToolBar;
