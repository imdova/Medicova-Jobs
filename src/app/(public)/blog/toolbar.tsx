import DynamicFormModal from "@/components/form/DynamicFormModal";
import { FieldConfig } from "@/types";
import { Block, BlockType, blockTypes } from "@/types/blog";
import { Button, Tab, Tabs, TextField } from "@mui/material";
import React, { useState } from "react";

interface TabProps {
  selectedBlock: Block | null;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  setSelectedBlock: React.Dispatch<React.SetStateAction<Block | null>>;
}

const imageField: FieldConfig[] = [
  {
    name: "imageUrl",
    label: "Enter Your Image Url",
    type: "text",
    textFieldProps: { placeholder: "Image Url" },
    required: true,
  },
];
const ButtonField: FieldConfig[] = [
  {
    name: "linkName",
    label: "Enter Your Button labe",
    type: "text",
    textFieldProps: { placeholder: "button Label" },
    required: true,
  },
  {
    name: "linkUrl",
    label: "Enter Your Link Url",
    type: "text",
    textFieldProps: { placeholder: "Link Url" },
    required: true,
  },
];
const HtmlField: FieldConfig[] = [
  {
    name: "Html",
    label: "Enter Your Html Code",
    type: "text",
    textFieldProps: {
      multiline: true,
      minRows: 4,
      sx: { height: "auto", "& .MuiOutlinedInput-root": { height: "auto" } },
    },
    required: true,
  },
];
const BlocksTab: React.FC<TabProps> = ({ setBlocks, setSelectedBlock }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [onHoldBlock, setOnHoldBlock] = useState({} as Block);
  const [fields, setFields] = useState<FieldConfig[]>([]);

  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);

  const handleSubmit = (data: { [key: string]: string }) => {
    if (onHoldBlock.type === "image") {
      setBlocks((pv) => [...pv, { ...onHoldBlock, imageUrl: data.imageUrl }]);
    } else if (onHoldBlock.type === "button") {
      setBlocks((pv) => [
        ...pv,
        { ...onHoldBlock, content: data.linkName, linkUrl: data.linkUrl },
      ]);
    } else if (onHoldBlock.type === "html") {
      setBlocks((pv) => [...pv, { ...onHoldBlock, content: data.Html }]);
    }
  };
  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: Math.random().toString(36).slice(2, 11),
      type,
      content: "",
      styles: {},
    };
    if (type === "image") {
      open();
      setFields(imageField);
      setOnHoldBlock(newBlock);
      setTitle("Set Image For You Image");
      return;
    } else if (type === "button") {
      open();
      setFields(ButtonField);
      setOnHoldBlock(newBlock);
      setTitle("Set Link For Your Button");
      return;
    } else if (type === "html") {
      open();
      setFields(HtmlField);
      setOnHoldBlock(newBlock);
      setTitle("Enter You Html Code");
      return;
    }
    setBlocks((blocks) => [...blocks, newBlock]);
    setSelectedBlock(newBlock);
  };

  return (
    <div className="mt-4">
      <DynamicFormModal
        open={isModalOpen}
        onClose={close}
        onSubmit={handleSubmit}
        fields={fields}
        title={title}
      />

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
    <div className="mt-4 overflow-hidden">
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
    <aside className="bg-muted/30 w-80 border-l p-6">
      <div>
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
          aria-label="block and style tabs"
          variant="fullWidth"
        >
          <Tab label="Blocks" value="blocks" />
          <Tab label="Settings" value="settings" />
        </Tabs>
        {selectedTab === "blocks" && (
          <BlocksTab
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
