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
          className={`group/${block.type} relative m-1 w-full rounded-base border p-2 pr-10 ${
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
