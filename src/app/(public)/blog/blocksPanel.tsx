import FormModal from "@/components/form/FormModal/FormModal";
import { basicBlocks, contentBlocks, layoutBlocks } from "@/constants/pagebuilder/blocks";
import { BlockForm, blocksForm } from "@/constants/pagebuilder/formFields";
import { Block, TabProps } from "@/types/blog";
import { generateId } from "@/util";
import { Button } from "@mui/material";
import { useState } from "react";

const BlocksPanel: React.FC<TabProps> = ({ setBlocks, setSelectedBlock }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onHoldBlock, setOnHoldBlock] = useState({} as Block);
  const [formData, setFormData] = useState<BlockForm | null>(null);

  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);

  const handleSubmit = (data: { [key: string]: string }) => {
    setBlocks((pv) => [...pv, { ...onHoldBlock, ...data }]);
    close();
  };

  const handleAddBlock = (type: Block["type"]) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      content: "",
      styles: {},
    };
    const blockFormData = blocksForm.find((form) => form.type.includes(type));
    if (blockFormData && blockFormData.isModal) {
      open();
      setFormData(blockFormData);
      setOnHoldBlock(newBlock);
      return;
    }
    setBlocks((blocks) => [...blocks, newBlock]);
    setSelectedBlock(newBlock);
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
