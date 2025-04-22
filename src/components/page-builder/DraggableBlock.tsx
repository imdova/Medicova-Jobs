import { Draggable } from "@hello-pangea/dnd";
import { Block } from "@/types/blog";
import { BlockRenderer } from "./BlockRenderer";
import BlockOptions from "./BlockOptions";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const groupsLevel = [
    "group/block-1",
    "group/block-2",
    "group/block-3",
    "group/block-4",
    "group/block-5",
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`mb-2 cursor-move rounded border bg-white p-4 text-center shadow-sm ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <BlockOptions
        block={block}
        selectedBlock={selectedBlock}
        onSelect={onSelect}
        setBlocks={setBlocks}
      />
      <BlockRenderer
        block={block}
        onSelect={onSelect}
        selectedBlock={selectedBlock}
        setBlocks={setBlocks}
      />
    </div>
  );
}
