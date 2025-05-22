import { Block, BlogSettings, FormItem, ToolBarTabs } from "@/types/blog";
import { Tab, Tabs } from "@mui/material";
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
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
          aria-label="block and style tabs"
          className="border-b border-gray-200"
          variant="fullWidth"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab}
              label={tab}
              className="h-[50px] p-0 text-xs min-w-3"
              value={tab}
            />
          ))}
        </Tabs>
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
