import { Block, BlogSettings } from "@/types/blog";
import { Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import StylePanel from "./stylePanel";
import BlocksPanel from "./blocksPanel";
import SettingsPanel from "./SettingsPanel";

interface ToolBarProps {
  settings: BlogSettings;
  updateSettings: (settings: BlogSettings) => void;
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  selectedBlock?: Block | null;
  setSelectedBlock: React.Dispatch<React.SetStateAction<Block | null>>;
}

const ToolBar: React.FC<ToolBarProps> = ({
  settings,
  updateSettings,
  setBlocks,
  selectedBlock,
  setSelectedBlock,
}) => {
  const [selectedTab, setSelectedTab] = useState<
    "blocks" | "styles" | "settings"
  >("blocks");

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
          <Tab label="Blocks" className="h-[50px] p-0 text-sm" value="blocks" />
          <Tab label="Styles" className="h-[50px] p-0 text-sm" value="styles" />
          <Tab
            label="Settings"
            className="h-[50px] p-0 text-sm"
            value="settings"
          />
        </Tabs>
        <div className="scroll-bar-minimal max-h-[calc(100vh-146px)] space-y-6 overflow-y-auto p-4">
          {selectedTab === "blocks" && (
            <BlocksPanel
              selectedBlock={selectedBlock}
              setBlocks={setBlocks}
              setSelectedBlock={setSelectedBlock}
              setSelectedTab={setSelectedTab}
            />
          )}
          {selectedTab === "styles" && (
            <StylePanel
              selectedBlock={selectedBlock}
              setBlocks={setBlocks}
              setSelectedBlock={setSelectedBlock}
              setSelectedTab={setSelectedTab}
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
