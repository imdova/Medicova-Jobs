import { Block } from "@/types/blog";
import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import StylePanel from "./stylePanel";
import BlocksPanel from "./blocksPanel";

interface ToolBarProps {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  selectedBlock?: Block | null;
  setSelectedBlock: React.Dispatch<React.SetStateAction<Block | null>>;
}
const ToolBar: React.FC<ToolBarProps> = ({
  blocks,
  setBlocks,
  selectedBlock,
  setSelectedBlock,
}) => {
  const [selectedTab, setSelectedTab] = useState("blocks");
  return (
    <aside className="bg-muted/30 w-96 border-l">
      <div>
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
          aria-label="block and style tabs"
          className="border-gray-200 border-b"
          variant="fullWidth"
        >
          <Tab label="Blocks" className="p-0 text-sm h-[50px]" value="blocks" />
          <Tab label="Styles" className="p-0 text-sm h-[50px]" value="styles" />
          {/* <Tab label="Settings" value="settings" /> */}
        </Tabs>
        <div className="max-h-[calc(100vh-146px)] space-y-6 overflow-y-auto p-4 scroll-bar-minimal">
          {selectedTab === "blocks" && (
            <BlocksPanel
              selectedBlock={selectedBlock}
              setBlocks={setBlocks}
              setSelectedBlock={setSelectedBlock}
            />
          )}
          {selectedTab === "styles" && (
            <StylePanel
              selectedBlock={selectedBlock}
              setBlocks={setBlocks}
              setSelectedBlock={setSelectedBlock}
            />
          )}
        </div>

        {/* )} */}
        {/* {selectedTab === "settings" && (
          <SettingsTab
            setBlocks={setBlocks}
            selectedBlock={selectedBlock}
            setSelectedBlock={setSelectedBlock}
          />
        )} */}
      </div>
    </aside>
  );
};

export default ToolBar;
