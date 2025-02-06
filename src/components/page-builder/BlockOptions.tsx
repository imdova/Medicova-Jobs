import { Block } from "@/types/blog";
import { BlockAction } from "@/types/pageBuilder";
import { DragIndicator, Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import {
  ContentCopy,
  ContentCut,
  DeleteOutline,
  WidthFullOutlined,
} from "@mui/icons-material";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import DynamicFormModal from "../form/DynamicFormModal";
import { useState } from "react";
import {
  buttonModal,
  htmlModal,
  imageModal,
} from "@/constants/pagebuilder/formFields";

interface BlockOptionsProps {
  block: Block;
  provided: DraggableProvidedDragHandleProps | null;
  onSelect: (block: Block) => void;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

const BlockOptions: React.FC<BlockOptionsProps> = ({
  provided,
  setBlocks,
  onSelect,
  block,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);
  const onAction = (block: Block, action: BlockAction) => {
    switch (action) {
      case "Delete":
        setBlocks((prev) => prev.filter((x) => x.id !== block.id));
        break;
      case "Duplicate":
        const newBlock = {
          ...block,
          id: Math.random().toString(36).slice(2, 11),
        };
        setBlocks((prev) => [...prev, newBlock]);
        onSelect(newBlock);
        break;
      case "Split":
        setBlocks((prev) =>
          prev.map((b) =>
            b.id === block.id ? { ...b, gridProps: { xs: 12, sm: 6 } } : b,
          ),
        );
        break;
      case "Full-Width":
        setBlocks((prev) =>
          prev.map((b) =>
            b.id === block.id ? { ...b, gridProps: undefined } : b,
          ),
        );
        break;
    }
  };

  const getModalData = () => {
    if (block.type === "image") {
      return imageModal;
    } else if (block.type === "button") {
      return buttonModal;
    } else if (block.type === "html") {
      return htmlModal;
    }
  };
  const modalData = getModalData();

  const handleSubmit = (data: { [key: string]: string }) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((b) => (b.id === block.id ? { ...b, ...data } : b)),
    );
  };

  return (
    <>
      {modalData && (
        <DynamicFormModal
          open={isModalOpen}
          onClose={close}
          onSubmit={handleSubmit}
          initialValues={block}
          {...modalData}
        />
      )}
      <div className="group/button absolute -right-4 z-20 mr-4 flex translate-x-1/2 rounded-base bg-gray-800 p-1 opacity-0 transition-all duration-500 hover:right-8 group-hover/item:opacity-100">
        <Tooltip placement="top" arrow title="Drag to Reorder">
          <IconButton
            {...provided}
            className="rounded-base p-1 hover:bg-black"
            tabIndex={-1}
          >
            <DragIndicator className="h-5 w-5 cursor-move text-white" />
          </IconButton>
        </Tooltip>
        <div className="w-fit max-w-0 gap-1 overflow-hidden transition-all duration-500 group-hover/button:max-w-40">
          <div className="flex min-w-fit gap-1">
            {modalData && (
              <Tooltip placement="top" arrow title="Edit Block">
                <IconButton
                  className="rounded-base p-1 hover:bg-black"
                  onClick={open}
                  tabIndex={-1}
                >
                  <Edit className="h-5 w-5 text-white" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip placement="top" arrow title="Duplicate Block">
              <IconButton
                className="rounded-base p-1 hover:bg-black"
                onClick={() => onAction(block, "Duplicate")}
                tabIndex={-1}
              >
                <ContentCopy className="h-5 w-5 text-white" />
              </IconButton>
            </Tooltip>
            <Tooltip placement="top" arrow title="Delete Block">
              <IconButton
                className="rounded-base p-1 hover:bg-black"
                onClick={() => onAction(block, "Delete")}
                tabIndex={-1}
              >
                <DeleteOutline className="h-5 w-5 text-white" />
              </IconButton>
            </Tooltip>
            <Tooltip
              placement="top"
              arrow
              title={block.gridProps ? "Make Full Width" : "Split in half"}
            >
              <IconButton
                className="rounded-base p-1 hover:bg-black"
                onClick={() =>
                  onAction(block, block.gridProps ? "Full-Width" : "Split")
                }
                tabIndex={-1}
              >
                {block.gridProps ? (
                  <WidthFullOutlined className="h-5 w-5 text-white" />
                ) : (
                  <ContentCut className="h-5 w-5 text-white" />
                )}
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlockOptions;
