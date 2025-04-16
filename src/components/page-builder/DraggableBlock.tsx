import { Draggable } from "@hello-pangea/dnd";
import { Block } from "@/types/blog";
import { BlockRenderer } from "./BlockRenderer";
import BlockOptions from "./BlockOptions";

interface DraggableBlockProps {
  block: Block;
  index: number;
  selectedBlock?: Block | null;
  onSelect: (block: Block) => void;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

export function DraggableBlock({
  block,
  index,
  selectedBlock,
  onSelect,
  setBlocks,
}: DraggableBlockProps) {
  const isSelected = selectedBlock?.id === block.id;
  return (
    <Draggable draggableId={block.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(block);
          }}
          className={`${block.allowNesting ? "group/container pr-10" : "group/block"} w-full  relative rounded-base border m-1 p-2 ${
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
            onSelect={onSelect}
            selectedBlock={selectedBlock}
            setBlocks={setBlocks}
          />
        </div>
      )}
    </Draggable>
  );
}
