import { Block } from "@/types/blog";

type DragLocation = {
  index: number;
  droppableId: string;
};

export function onDragEndHandler(
  blocks: Block[],
  draggableId: string,
  source: DragLocation,
  destination: DragLocation | null,
): Block[] {
  if (!destination) return blocks;

  // Helper to deeply clone blocks
  const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

  // Helper to find and remove the block from source
  const removeBlock = (
    blockList: Block[],
    droppableId: string,
  ): Block | null => {
    for (const block of blockList) {
      if (block.id === droppableId) {
        const index = block.blocks.findIndex((b) => b.id === draggableId);
        if (index !== -1) {
          const [removed] = block.blocks.splice(index, 1);
          return removed;
        }
      } else if (block.blocks && block.blocks.length > 0) {
        const removed = removeBlock(block.blocks, droppableId);
        if (removed) return removed;
      }
    }
    return null;
  };

  // Helper to insert the block into destination
  const insertBlock = (
    blockList: Block[],
    droppableId: string,
    blockToInsert: Block,
    index: number,
  ): boolean => {
    for (const block of blockList) {
      if (block.id === droppableId) {
        block.blocks.splice(index, 0, blockToInsert);
        return true;
      } else if (block.blocks && block.blocks.length > 0) {
        const inserted = insertBlock(
          block.blocks,
          droppableId,
          blockToInsert,
          index,
        );
        if (inserted) return true;
      }
    }
    return false;
  };

  const newBlocks = deepClone(blocks);

  const removedBlock = removeBlock(newBlocks, source.droppableId);
  if (!removedBlock) return blocks;

  insertBlock(
    newBlocks,
    destination.droppableId,
    removedBlock,
    destination.index,
  );

  return newBlocks;
}
