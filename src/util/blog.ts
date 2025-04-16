import { Block } from "@/types/blog";


export function findNestedItemById(blocks: Block[], id?: string): Block | undefined {
  for (const block of blocks) {
    if (block.id === id) {
      return block;
    }
    if (block.blocks) {
      const found = findNestedItemById(block.blocks, id);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}


export function updateItem(
  blocks: Block[],
  block: Block,
  updatedFields: Partial<Block>,
) {
  return blocks.map((parentBlock) => {
    if (parentBlock.id !== block.parentId)
      return parentBlock.id === block.id
        ? { ...parentBlock, ...updatedFields }
        : parentBlock;

    const updatedNestedBlocks = parentBlock.blocks.map((item) => {
      if (item.id === block.id) {
        return { ...item, ...updatedFields };
      }
      return item;
    });

    return { ...parentBlock, blocks: updatedNestedBlocks };
  });
}

export function addNestedItem(
  blocks: Block[],
  newBlock: Block,
  selectedBlock: Block,
  index?: number,
) {
  const newBlocks = [...blocks];
  if (selectedBlock.allowNesting) {
    return newBlocks.map((block) => {
      if (block.id === selectedBlock.id) {
        const updatedBlocks = [...block.blocks];
        const insertIndex =
          index !== undefined ? index : updatedBlocks.length;
        updatedBlocks.splice(insertIndex, 0, {
          ...newBlock,
          parentId: block.id,
        });
        return {
          ...block,
          blocks: updatedBlocks,
        };
      }
      return block;
    });
  } else {
    const insertIndex = index !== undefined ? index + 1 : newBlocks.length;
    newBlocks.splice(insertIndex, 0, newBlock);
    return [...newBlocks, newBlock];
  }
}

export function removeNestedItem(blocks: Block[], item: Block) {
  return blocks
    .filter((b) => b.id !== item.id)
    .map((block) => {
      if (block.id === item.parentId) {
        return {
          ...block,
          blocks: block.blocks.filter((b) => b.id !== item.id),
        };
      }
      return block;
    });
}
export function duplicateNestedItem(blocks: Block[], item: Block) {
  const selectedBlock = blocks.find((b) => b.id === item.parentId);
  const blockIndex = blocks.findIndex((b) => b.id === item.parentId)
  console.log("🚀 ~ duplicateNestedItem ~ blockIndex:", blockIndex)
  if (selectedBlock) {
    return addNestedItem(blocks, item, selectedBlock, blockIndex);
  } else {
    return [...blocks, item];
  }
}
