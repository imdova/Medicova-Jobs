import { Block } from "@/types/blog";
import { BlockRenderer } from "./BlockRenderer";
import BlockOptions from "./BlockOptions";
import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { useAutoScrollOnDrag } from "@/hooks/useAutoScrollOnDrag";

type DropZoneData = {
  path: string;
  childrenCount: number;
};

type DragItem = Block & { path: string };

interface DraggableBlockProps {
  block: Block;
  selectedBlock?: Block | null;
  onSelect: (block: Block) => void;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  handleDrop: (data: DropZoneData, item: DragItem) => void;
  path: string;
}

export function DraggableBlock({
  block,
  selectedBlock,
  onSelect,
  setBlocks,
  handleDrop,
  path,
}: DraggableBlockProps) {
  const isSelected = selectedBlock?.id === block.id;

  const dragRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: block.type,
    item: {
      type: block.type,
      id: block.id,
      children: block.blocks,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(dragRef);
  preview(previewRef);

  useAutoScrollOnDrag({
    isDragging,
    className: ".scrollable-container",
  });

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(block);
      }}
      ref={previewRef}
      style={{ opacity }}
      className={`relative w-full rounded-base border p-2 ${
        isSelected
          ? "border-primary"
          : "border-transparent hover:border-neutral-400"
      }`}
    >
      <BlockOptions
        block={block}
        onSelect={onSelect}
        setBlocks={setBlocks}
        selectedBlock={selectedBlock}
        dragRef={dragRef}
      />
      <BlockRenderer
        block={block}
        onSelect={onSelect}
        selectedBlock={selectedBlock}
        handleDrop={handleDrop}
        setBlocks={setBlocks}
        path={path}
      />
    </div>
  );
}
