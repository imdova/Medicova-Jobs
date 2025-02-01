import { Block, blockTypes } from "@/types/blog";
import { Button, MenuItem, Select, Tab, Tabs, TextField } from "@mui/material";
import React, { useState } from "react";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface TabProps {
  selectedBlock: Block | null;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  setSelectedBlock: React.Dispatch<React.SetStateAction<Block | null>>;
}

const BlocksTab: React.FC<TabProps> = ({ setBlocks, setSelectedBlock }) => {
  const addBlock = (type: string) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: "",
      styles: {},
    };
    setBlocks((blocks) => [...blocks, newBlock]);
    setSelectedBlock(newBlock);
  };

  return (
    <div className="mt-4">
      <div className="h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-2 gap-2">
          {blockTypes.map((type) => {
            const ComponentIcon = type.icon;
            return (
              <Button
                key={type.id}
                className="flex h-20 flex-col gap-2 rounded-base border border-solid border-gray-100 text-secondary shadow hover:text-main"
                onClick={() => addBlock(type.id)}
              >
                <ComponentIcon className="" />
                <span className="text-xs">{type.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const StylesTab: React.FC<TabProps> = ({
  selectedBlock,
  setBlocks,
  setSelectedBlock,
}) => {
  const updateBlockContent = (id: string, content: string) => {
    setBlocks((pv) =>
      pv.map((block) => (block.id === id ? { ...block, content } : block)),
    );
  };

  const updateBlockStyle = (id: string, style: string, value: string) => {
    setBlocks((pv) =>
      pv.map((block) =>
        block.id === id
          ? { ...block, styles: { ...block.styles, [style]: value } }
          : block,
      ),
    );
  };
  return (
    <div className="mt-4">
      {selectedBlock ? (
        <div className="h-[calc(100vh-12rem)]">
          <div>
            <div>
              <h6>Block Settings</h6>
              <p>Customize the selected block</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                {selectedBlock.type === "html" ? (
                  <TextField
                    // value={selectedBlock.content}
                    onChange={(e) =>
                      updateBlockContent(selectedBlock.id, e.target.value)
                    }
                    minRows={3}
                    placeholder="Enter HTML code"
                  />
                ) : (
                  <TextField
                    // value={selectedBlock.content}
                    onChange={(e) =>
                      updateBlockContent(selectedBlock.id, e.target.value)
                    }
                    minRows={3}
                    placeholder="Enter content"
                  />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      updateBlockStyle(selectedBlock.id, "textAlign", "left")
                    }
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() =>
                      updateBlockStyle(selectedBlock.id, "textAlign", "center")
                    }
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() =>
                      updateBlockStyle(selectedBlock.id, "textAlign", "right")
                    }
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                {/* <Label>Font Size</Label> */}
                <Select
                  value={selectedBlock.styles.fontSize || "16px"}
                  onChange={(e) =>
                    updateBlockStyle(
                      selectedBlock.id,
                      "fontSize",
                      e.target.value,
                    )
                  }
                >
                  <MenuItem value="12px">Small</MenuItem>
                  <MenuItem value="16px">Medium</MenuItem>
                  <MenuItem value="20px">Large</MenuItem>
                  <MenuItem value="24px">Extra Large</MenuItem>
                </Select>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-muted-foreground p-4 text-center">
          Select a block to customize its styles
        </div>
      )}
    </div>
  );
};

const SettingsTab: React.FC<TabProps> = ({
  setBlocks,
  selectedBlock,
  setSelectedBlock,
}) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const updateSettings = () => {
    setBlocks((pv) =>
      pv.map((block) =>
        block.id === selectedBlock?.id
          ? {
              ...block,
              title,
              slug,
              category,
              shortDescription,
              author,
              coverImage,
            }
          : block,
      ),
    );
  };

  return (
    <div className="mt-4">
      <div className="h-[calc(100vh-12rem)]">
        <div>
          <div>
            <h6>Post Settings</h6>
            <p>Customize the post settings</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <TextField
                label="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <TextField
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <TextField
                label="Short Description"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                minRows={3}
                multiline
              />
            </div>
            <div className="space-y-2">
              <TextField
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              />
            </div>
            <div className="space-y-2">
              <Button variant="contained" onClick={updateSettings}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ToolBarProps {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  selectedBlock: Block | null;
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
    <aside className="bg-muted/30 w-96 border-l p-6">
      <div>
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
          aria-label="block and style tabs"
          variant="fullWidth"
        >
          <Tab label="Blocks" value="blocks" />
          <Tab label="Styles" value="styles" />
          <Tab label="Settings" value="settings" />
        </Tabs>
        {selectedTab === "blocks" && (
          <BlocksTab
            selectedBlock={selectedBlock}
            setBlocks={setBlocks}
            setSelectedBlock={setSelectedBlock}
          />
        )}
        {selectedTab === "styles" && (
          <StylesTab
            selectedBlock={selectedBlock}
            setBlocks={setBlocks}
            setSelectedBlock={setSelectedBlock}
          />
        )}
        {selectedTab === "settings" && (
          <SettingsTab
            setBlocks={setBlocks}
            selectedBlock={selectedBlock}
            setSelectedBlock={setSelectedBlock}
          />
        )}
      </div>
    </aside>
  );
};

export default ToolBar;
