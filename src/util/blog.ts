import { Block } from "@/types/blog";
import { generateId } from ".";

export function findItemById(blocks: Block[], id: string): Block | null {
  for (const block of blocks) {
    if (block.id === id) return block;
    if (block.blocks) {
      const found = findItemById(block.blocks, id);
      if (found) return found;
    }
  }
  return null;
}

export function addItem(
  blocks: Block[],
  newItem: Block,
  parentId: string | null = null,
): boolean {
  if (parentId === null) {
    blocks.push(newItem);
    return true;
  }

  for (const block of blocks) {
    if (block.id === parentId) {
      if (!block.blocks) block.blocks = [];
      block.blocks.push(newItem);
      return true;
    }
    if (block.blocks && addItem(block.blocks, newItem, parentId)) return true;
  }

  return false; // parent not found
}

export function updateItem(
  blocks: Block[],
  id: string,
  updatedData: Partial<Block>,
): boolean {
  for (const block of blocks) {
    if (block.id === id) {
      Object.assign(block, updatedData);
      return true;
    }
    if (block.blocks && updateItem(block.blocks, id, updatedData)) return true;
  }
  return false;
}

export function deleteItem(blocks: Block[], id: string): boolean {
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.id === id) {
      blocks.splice(i, 1);
      return true;
    }
    if (block.blocks && deleteItem(block.blocks, id)) return true;
  }
  return false;
}

export function duplicateItem(blocks: Block[], targetId: string): Block | null {
  function recursiveDuplicate(items: Block[]): Block | null {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.id === targetId) {
        // Deep clone the item
        const clone: Block = structuredClone(item);

        // Function to recursively assign new IDs to all sub-blocks
        const assignNewIds = function (block: Block): void {
          block.id = generateId();
          if (block.blocks) {
            block.blocks.forEach(assignNewIds);
          }
        };

        assignNewIds(clone); // Assign new IDs to the clone and its sub-blocks

        // Insert after the original
        items.splice(i + 1, 0, clone);
        return clone;
      }
      const dubBlock = item.blocks && recursiveDuplicate(item.blocks);
      if (dubBlock) return dubBlock;
    }

    return null;
  }

  return recursiveDuplicate(blocks);
}
