import { Draggable } from "@hello-pangea/dnd";
import { Grid } from "@mui/material";
import { Block } from "@/types/blog";
import { BlockRenderer } from "./BlockRenderer";
import BlockOptions from "./BlockOptions";

interface DraggableBlockProps {
  block: Block;
  index: number;
  isSelected: boolean;
  onSelect: (block: Block) => void;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

export function DraggableBlock({
  block,
  index,
  isSelected,
  onSelect,
  setBlocks,
}: DraggableBlockProps) {
  return (
    <Draggable draggableId={block.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          onClick={() => onSelect(block)}
          className={`group/item relative flex items-center rounded-base border p-4 ${
            isSelected
              ? "border-primary"
              : "border-transparent hover:border-neutral-400"
          }`}
        >
          <BlockOptions
            block={block}
            onSelect={onSelect}
            setBlocks={setBlocks}
            provided={provided.dragHandleProps}
          />
          <BlockRenderer
            block={block}
            isSelected={isSelected}
            setBlocks={setBlocks}
          />
        </div>
      )}
    </Draggable>
  );
}
