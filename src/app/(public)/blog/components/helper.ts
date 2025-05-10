import { Block } from "@/types/blog";

function getBlockByPath(blocks: Block[], path: string): Block | null {
  const indices = path.split("-").map(Number);
  let current: Block | undefined;
  let currentBlocks = blocks;

  for (const index of indices) {
    current = currentBlocks[index];
    if (!current) return null;
    currentBlocks = current.blocks;
  }

  return current || null;
}

function getParentAndIndex(
  blocks: Block[],
  path: string,
): { parentBlocks: Block[]; index: number } | null {
  const indices = path.split("-").map(Number);
  if (indices.length === 0) return null;

  const lastIndex = indices.pop()!;
  let currentBlocks = blocks;

  for (const index of indices) {
    const current = currentBlocks[index];
    if (!current) return null;
    currentBlocks = current.blocks;
  }

  return { parentBlocks: currentBlocks, index: lastIndex };
}

function deleteBlockFromPath(blocks: Block[], path: string): boolean {
  const parentInfo = getParentAndIndex(blocks, path);
  if (!parentInfo) return false;

  const { parentBlocks, index } = parentInfo;
  if (index < 0 || index >= parentBlocks.length) return false;

  parentBlocks.splice(index, 1);
  return true;
}

export function insertBlockToPath(
  blocks: Block[],
  path: string,
  blockToInsert: Block,
): boolean {
  console.log("🚀 ~ blocks:", blocks)
  console.log("🚀 ~ blockToInsert:", blockToInsert)
  console.log("🚀 ~ path:", path)
  if (!path) return false;

  const indices = path.split("-").map(Number);
  const insertIndex = indices.pop(); // get last index (where to insert)
  if (insertIndex === undefined) return false;

  let currentBlocks = blocks;

  for (const index of indices) {
    const block = currentBlocks[index];
    if (!block || !block.allowNesting) return false;
    currentBlocks = block.blocks;
  }
  if (
    !currentBlocks ||
    insertIndex < 0 ||
    insertIndex > currentBlocks.length + 1
  )
    return false;

  currentBlocks.splice(insertIndex, 0, blockToInsert); // insert at exact position
  return true;
}

// const cloneBlocks = (blocks: Block[]): Block[] => {
//     return JSON.parse(JSON.stringify(blocks));
//   };
// const cloneBlocks = (blocks: Block[]): Block[] => {
//     return cloned = structuredClone(blocks);
//   };

export function moveBlockFromPathToPath(
  blocks: Block[],
  fromPath: string,
  toPath: string,
): Block[] | null {
  const clonedBlocks = structuredClone(blocks);

  const blockToMove = getBlockByPath(clonedBlocks, fromPath);
  if (!blockToMove) return null;

  // 🟡 Get toPath parent block and target index BEFORE deleting
  const toIndices = toPath.split("-").map(Number);
  const insertIndex = toIndices[toIndices.length - 1];
  const parentPath = toIndices.slice(0, -1).join("-");
  const parentBlock = parentPath === "" ? { blocks: clonedBlocks } : getBlockByPath(clonedBlocks, parentPath);
  if (!parentBlock || !Array.isArray(parentBlock.blocks)) return null;

  // 🔴 Delete AFTER resolving target location
  const deleted = deleteBlockFromPath(clonedBlocks, fromPath);
  if (!deleted) return null;

  // ✅ Now insert into pre-resolved parent block
  parentBlock.blocks.splice(insertIndex, 0, blockToMove);

  return clonedBlocks;
}


