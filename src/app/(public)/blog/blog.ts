// import { Block } from "@/types/blog";

// type DragLocation = {
//   index: number;
//   droppableId: string;
// };

// export function onDragEndHandler(
//   blocks: Block[],
//   draggableId: string,
//   source: DragLocation,
//   destination: DragLocation | null,
// ): Block[] {
//   if (!destination) return blocks;

//   // Helper to deeply clone blocks
//   const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

//   // Helper to find and remove the block from source
//   const removeBlock = (
//     blockList: Block[],
//     droppableId: string,
//   ): Block | null => {
//     for (const block of blockList) {
//       if (block.id === droppableId) {
//         const index = block.blocks.findIndex((b) => b.id === draggableId);
//         if (index !== -1) {
//           const [removed] = block.blocks.splice(index, 1);
//           return removed;
//         }
//       } else if (block.blocks && block.blocks.length > 0) {
//         const removed = removeBlock(block.blocks, droppableId);
//         if (removed) return removed;
//       }
//     }
//     return null;
//   };

//   // Helper to insert the block into destination
//   const insertBlock = (
//     blockList: Block[],
//     droppableId: string,
//     blockToInsert: Block,
//     index: number,
//   ): boolean => {
//     for (const block of blockList) {
//       if (block.id === droppableId) {
//         block.blocks.splice(index, 0, blockToInsert);
//         return true;
//       } else if (block.blocks && block.blocks.length > 0) {
//         const inserted = insertBlock(
//           block.blocks,
//           droppableId,
//           blockToInsert,
//           index,
//         );
//         if (inserted) return true;
//       }
//     }
//     return false;
//   };

//   const newBlocks = deepClone(blocks);

//   const removedBlock = removeBlock(newBlocks, source.droppableId);
//   if (!removedBlock) return blocks;

//   insertBlock(
//     newBlocks,
//     destination.droppableId,
//     removedBlock,
//     destination.index,
//   );

//   return newBlocks;
// }



import { Block } from "@/types/blog";
import { generateId } from "@/util";
import { findItemById } from "@/util/blog";
import { DropResult } from "@hello-pangea/dnd";

// Helper function to create a deep clone of blocks
const cloneBlocks = (blocks: Block[]): Block[] => {
  return JSON.parse(JSON.stringify(blocks));
};

// Function to find the block and its parent array
const findBlockAndParent = (
  blocks: Block[],
  id: string,
): { block: Block; parent: Block[]; index: number } | null => {
  // Check if the block is in the current level
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].id === id) {
      return { block: blocks[i], parent: blocks, index: i };
    }
  }

  // Search in nested blocks
  for (const block of blocks) {
    if (block.blocks && block.blocks.length > 0) {
      const result = findBlockAndParent(block.blocks, id);
      if (result) return result;
    }
  }

  return null;
};

// Function to handle drag end operation
export const onDragEndHandler = (
  blocks: Block[],
  result: DropResult,
): Block[] => {
  const { source, destination, draggableId } = result;

  // If there's no destination, return original blocks
  if (!destination) return blocks;

  // Create a deep copy to avoid mutations
  const newBlocks = cloneBlocks(blocks);

  // Extract the clean IDs (remove 'drop-' prefix if any)
  const sourceDroppableId = source.droppableId.replace(/^drop-/, "");
  const destinationDroppableId = destination.droppableId.replace(/^drop-/, "");

  // If it's the same location, no changes needed
  if (
    sourceDroppableId === destinationDroppableId &&
    source.index === destination.index
  ) {
    return blocks;
  }

  // Find the source block and its parent
  let sourceParent: Block[] = newBlocks;
  if (sourceDroppableId !== "root") {
    const sourceContainer = findItemById(newBlocks, sourceDroppableId);
    if (!sourceContainer) return blocks;
    sourceParent = sourceContainer.blocks;
  }

  // Find the destination parent
  let destinationParent: Block[] = newBlocks;
  if (destinationDroppableId !== "root") {
    const destinationContainer = findItemById(
      newBlocks,
      destinationDroppableId,
    );
    if (!destinationContainer) return blocks;
    destinationParent = destinationContainer.blocks;
  }

  // Remove the dragged block from its source
  const [movedBlock] = sourceParent.splice(source.index, 1);

  // Update the parentId of the moved block
  movedBlock.parentId =
    destinationDroppableId === "root" ? null : destinationDroppableId;

  // Insert the block at the destination
  destinationParent.splice(destination.index, 0, movedBlock);

  return newBlocks;
};

// Convert a block to a container type (flex-row, flex-column, etc.)
export const convertBlockToContainer = (
  blocks: Block[],
  blockId: string,
  containerType: "container" | "flex-row" | "flex-column" | "grid",
): Block[] => {
  const newBlocks = cloneBlocks(blocks);
  const result = findBlockAndParent(newBlocks, blockId);

  if (result) {
    const { block, parent, index } = result;

    // Create a new container block
    const containerBlock: Block = {
      id: generateId(),
      parentId: block.parentId,
      type: containerType,
      content: `${containerType} container`,
      styles: block.styles || {},
      blocks: [{ ...block, parentId: null }],
      level: block.level,
      allowNesting: true,
    };

    // Update the nested block's parentId
    containerBlock.blocks[0].parentId = containerBlock.id;

    // Replace the original block with the container
    parent.splice(index, 1, containerBlock);
  }

  return newBlocks;
};
