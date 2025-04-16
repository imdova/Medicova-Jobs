import { Block } from "@/types/blog";
import { BlockAction } from "@/types/pageBuilder";
import { DragIndicator } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { ContentCopy, DeleteOutline } from "@mui/icons-material";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { duplicateNestedItem, removeNestedItem } from "@/util/blog";
import { generateId } from "@/util";

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
  const onAction = (block: Block, action: BlockAction) => {
    switch (action) {
      case "Delete":
        setBlocks((prev) => removeNestedItem(prev, block));
        break;
      case "Duplicate":
        const newBlock = {
          ...block,
          id: generateId(),
        };
        setBlocks((prev) => duplicateNestedItem(prev, newBlock));
        onSelect(newBlock);
        break;
    }
  };

  return (
    <div
      className={`group/button absolute -right-4 z-20 mr-4 top-1/2 -translate-y-1/2  flex translate-x-1/2 flex-row-reverse rounded-base bg-gray-800 p-1 opacity-0 transition-all duration-500 hover:right-5 ${block.type === "container" ? "group-hover/container:opacity-100" : "group-hover/block:opacity-100"} `}
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
