import FormModal from "@/components/form/FormModal/FormModal";
import {
  basicBlocks,
  contentBlocks,
  getBlockProps,
  layoutBlocks,
} from "@/constants/pagebuilder/blocks";
import { BlockForm, blocksForm } from "@/constants/pagebuilder/formFields";
import { Block, TabProps } from "@/types/blog";
import { generateId } from "@/util";
import { addItem } from "@/util/blog";
import { Button } from "@mui/material";
import { useState } from "react";
import { blockStyles } from "./constants/blocks.styles";
import templates from "./constants/templates.json";
import Image from "next/image";

const BlocksPanel: React.FC<TabProps> = ({
  selectedBlock,
  setBlocks,
  setSelectedBlock,
  setSelectedTab,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onHoldBlock, setOnHoldBlock] = useState({} as Block);
  const [formData, setFormData] = useState<BlockForm | null>(null);

  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);

  const handleSubmit = (data: { [key: string]: string }) => {
    if (selectedBlock && selectedBlock.allowNesting) {
      setBlocks((blocks) => {
        const newBlocks = structuredClone(blocks);
        addItem(newBlocks, { ...onHoldBlock, ...data }, selectedBlock.id);
        return newBlocks;
      });
    } else {
      setBlocks((pv) => [...pv, { ...onHoldBlock, ...data }]);
    }
    close();
  };

  const handleAddBlock = (type: Block["type"]) => {
    const blockProps = getBlockProps(type, generateId());
    const newBlock: Block = {
      id: generateId(),
      type,
      level: 1,
      blocks: [],
      content: "",
      styles: blockStyles[type],
      ...blockProps,
    };
    const blockFormData = blocksForm.find((form) => form.type.includes(type));
    if (blockFormData && blockFormData.isModal) {
      open();
      setFormData(blockFormData);
      setOnHoldBlock(newBlock);
      return;
    }
    const allowNesting =
      selectedBlock && (selectedBlock?.allowNesting || selectedBlock?.parentId);
    if (allowNesting) {
      setBlocks((blocks) => {
        const newBlocks = structuredClone(blocks);
        newBlock.level = selectedBlock.level + 1;
        newBlock.parentId = selectedBlock?.allowNesting
          ? selectedBlock?.id
          : selectedBlock?.parentId;
        addItem(
          newBlocks,
          newBlock,
          selectedBlock?.allowNesting
            ? selectedBlock.id
            : selectedBlock.parentId,
        );
        return newBlocks;
      });
    } else {
      setSelectedTab("styles");
      setBlocks((pv) => [...pv, newBlock]);
    }
    setSelectedBlock((pv) => (pv?.allowNesting ? pv : newBlock));
  };

  return (
    <div className="mt-4">
      {formData && (
        <FormModal
          open={isModalOpen}
          onClose={close}
          onSubmit={handleSubmit}
          {...formData}
        />
      )}
      <div className="space-y-4">
        <div>
          <h3 className="mb-4 text-sm font-medium">Templates</h3>
          <div className="grid grid-cols-2 gap-2">
            {templates.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => setBlocks(item.blocks as Block[])}
                  className="grid h-[100px] w-[80px] grid-cols-1 grid-rows-1 overflow-hidden rounded-base"
                >
                  <Image
                    src={item.image}
                    width={80}
                    height={100}
                    alt={item.title}
                    className="col-start-1 row-start-1 h-full object-cover"
                  />
                  <div className="col-start-1 row-start-1 flex h-full w-full items-center justify-center bg-black/20 p-2">
                    <p className="line-clamp-2 text-center font-bold text-white">
                      {item.title}
                    </p>
                  </div>
                </button>
                <p className="text-nowrap w-[80px]">Template ({index + 1})</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Basic Elements</h3>
          <div className="grid grid-cols-2 gap-2">
            {basicBlocks.map((item, index) => (
              <div key={item.id}>
                <Button
                  variant="outlined"
                  className="w-full justify-start"
                  onClick={() => handleAddBlock(item.id)}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">Layout Structures</h3>
          <div className="grid grid-cols-2 gap-2">
            {layoutBlocks.map((item, index) => (
              <div key={item.id}>
                <Button
                  variant="outlined"
                  className="w-full justify-start"
                  onClick={() => handleAddBlock(item.id)}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">Content Blocks</h3>
          <div className="grid grid-cols-2 gap-2">
            {contentBlocks.map((item, index) => (
              <div key={item.id}>
                <Button
                  variant="outlined"
                  className="w-full justify-start"
                  onClick={() => handleAddBlock(item.id)}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlocksPanel;
