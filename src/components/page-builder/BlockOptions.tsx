import { Block } from "@/types/blog";
import { BlockAction } from "@/types/pageBuilder";
import { DragIndicator } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { ContentCopy, DeleteOutline } from "@mui/icons-material";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { deleteItem, duplicateItem } from "@/util/blog";

interface BlockOptionsProps {
  block: Block;
  provided: DraggableProvidedDragHandleProps | null;
  selectedBlock?: Block | null;
  onSelect: (block: Block) => void;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

const BlockOptions: React.FC<BlockOptionsProps> = ({
  provided,
  setBlocks,
  onSelect,
  selectedBlock,
  block,
}) => {
  const isSelected = selectedBlock?.id === block.id;

  const onAction = (block: Block, action: BlockAction) => {
    switch (action) {
      case "Delete":
        setBlocks((blocks) => {
          const newBlocks = structuredClone(blocks);
          deleteItem(newBlocks, block?.id);
          return newBlocks;
        });
        break;
      case "Duplicate":
        setBlocks((blocks) => {
          const newBlocks = structuredClone(blocks);
          const newBlock = duplicateItem(newBlocks, block.id);
          newBlock && onSelect(newBlock);
          return newBlocks;
        });
        break;
    }
  };

  const groupsLevel = [
    "group-hover/block-1:opacity-100",
    "group-hover/block-2:opacity-100",
    "group-hover/block-3:opacity-100",
    "group-hover/block-4:opacity-100",
    "group-hover/block-5:opacity-100",
  ];

  return (
    <div
      style={{ zIndex: 20 - block.level }}
      aria-selected={isSelected}
      className={`group/button absolute -right-4 top-1/2 mr-4  -translate-y-1/2 translate-x-1/2 flex-row-reverse rounded-base bg-gray-800 p-1  transition-all duration-500 hover:right-5 hidden aria-selected:flex`}
    >
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
        </div>
      </div>
    </div>
  );
};

export default BlockOptions;
