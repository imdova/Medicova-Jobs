"use client";
import React, { useCallback, useEffect, useState } from "react";
import { generateId } from "@/util";
import { Block } from "@/types/blog";
import { DraggableBlock } from "@/components/page-builder/DraggableBlock";
import { addItem, deleteItem, duplicateItem, findItemById } from "@/util/blog";
import DropZone from "./components/dropzone";
import {
  insertBlockToPath,
  moveBlockFromPathToPath,
} from "./components/helper";
import { getBlockProps } from "@/constants/pagebuilder/blocks";
import { blockStyles } from "./constants/blocks.styles";
import { BlockForm, blocksForm } from "@/constants/pagebuilder/formFields";
import FormModal from "@/components/form/FormModal/FormModal";

type DropZoneData = {
  path: string;
  childrenCount: number;
};

type DraggedBlock = {
  id: string;
  path?: string;
  type: Block["type"];
};
const BlogBuilder: React.FC<{
  blocks: Block[];
  selectedBlock: Block | null;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  setSelectedBlock: React.Dispatch<React.SetStateAction<Block | null>>;
}> = ({ blocks, setBlocks, selectedBlock, setSelectedBlock }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedBlock, setCopiedBlock] = useState<Block | null>(null);

  const [onHoldBlock, setOnHoldBlock] = useState(
    {} as Block & { path: string },
  );
  const [formData, setFormData] = useState<BlockForm | null>(null);

  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);

  const handleDrop = useCallback(
    (dropZone: DropZoneData, draggableBlock: DraggedBlock) => {
      console.log("dropZone", dropZone);
      console.log("🚀 ~ draggableBlock:", draggableBlock);

      if (!draggableBlock.path) {
        handleAddBlock(draggableBlock.type, dropZone.path);
        return;
      }

      const result = moveBlockFromPathToPath(
        blocks,
        draggableBlock.path,
        dropZone.path,
      );
      if (result) setBlocks(result);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [blocks],
  );

  const handleSubmit = (data: Partial<Block>) => {
    const newBlock = { ...onHoldBlock, ...data };
    const clonedBlocks = structuredClone(blocks);
    const inserted = insertBlockToPath(
      clonedBlocks,
      onHoldBlock.path,
      newBlock,
    );
    if (!inserted) return null;
    setBlocks(clonedBlocks);
    close();
  };

  const handleAddBlock = (type: Block["type"], path: string, block?: Block) => {
    const blockProps = getBlockProps(type, generateId());
    const newBlock: Block = {
      id: generateId(),
      type,
      level: 1,
      blocks: [],
      content: "",
      styles: blockStyles[type],
      ...blockProps,
    };
    const blockFormData = blocksForm.find((form) => form.type.includes(type));
    if (blockFormData && blockFormData.isModal) {
      open();
      setFormData(blockFormData);
      setOnHoldBlock({ ...newBlock, path });
      return;
    }
    const clonedBlocks = structuredClone(blocks);
    const inserted = insertBlockToPath(clonedBlocks, path, newBlock);
    if (!inserted) return null;
    setBlocks(clonedBlocks);
    setSelectedBlock((pv) => (pv?.allowNesting ? pv : newBlock));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const isInput =
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable;

    if (isInput) return;

    // Check for Ctrl+C to copy features
    if (e.ctrlKey && e.key === "c") {
      if (selectedBlock) setCopiedBlock(selectedBlock);
    }
    if (e.ctrlKey && e.key === "x") {
      if (selectedBlock) {
        setCopiedBlock(selectedBlock);
        setBlocks((blocks) => {
          const newBlocks = structuredClone(blocks);
          deleteItem(newBlocks, selectedBlock?.id);
          return newBlocks;
        });
      }
    }
    if (e.key === "Delete") {
      if (selectedBlock) {
        setBlocks((blocks) => {
          const newBlocks = structuredClone(blocks);
          deleteItem(newBlocks, selectedBlock?.id);
          return newBlocks;
        });
      }
    }
    if (e.ctrlKey && e.key === "d") {
      if (selectedBlock) {
        setBlocks((blocks) => {
          const newBlocks = structuredClone(blocks);
          const newBlock = duplicateItem(newBlocks, selectedBlock.id);
          newBlock && setSelectedBlock(newBlock);
          return newBlocks;
        });
      }
    }
    // Check for Ctrl+V to paste features
    if (e.ctrlKey && e.key === "v") {
      if (copiedBlock) {
        const allowNesting =
          selectedBlock &&
          (selectedBlock?.allowNesting || selectedBlock?.parentId);
        if (allowNesting) {
          setBlocks((blocks) => {
            const newBlocks = structuredClone(blocks);
            copiedBlock.level = selectedBlock.level + 1;
            copiedBlock.parentId = selectedBlock?.allowNesting
              ? selectedBlock?.id
              : selectedBlock?.parentId;
            addItem(
              newBlocks,
              { ...copiedBlock, id: generateId() },
              selectedBlock?.allowNesting
                ? selectedBlock.id
                : selectedBlock.parentId,
            );
            return newBlocks;
          });
        } else {
          setBlocks((pv) => [...pv, { ...copiedBlock, id: generateId() }]);
        }
        setSelectedBlock((pv) =>
          pv?.allowNesting ? pv : { ...copiedBlock, id: generateId() },
        );
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBlock]);

  return (
    <>
      {formData && (
        <FormModal
          open={isModalOpen}
          onClose={close}
          onSubmit={handleSubmit}
          {...formData}
        />
      )}
      {blocks.map((block, index) => {
        const currentPath = `${index}`;
        return (
          <React.Fragment key={block.id}>
            <DropZone
              data={{
                path: currentPath,
                childrenCount: blocks.length,
              }}
              onDrop={handleDrop}
            />
            <DraggableBlock
              key={block.id}
              block={block}
              handleDrop={handleDrop}
              path={currentPath}
              selectedBlock={
                selectedBlock?.id
                  ? findItemById(blocks, selectedBlock?.id)
                  : undefined
              }
              onSelect={setSelectedBlock}
              setBlocks={setBlocks}
            />
          </React.Fragment>
        );
      })}
      <DropZone
        data={{
          path: `${blocks.length}`,
          childrenCount: blocks.length,
        }}
        onDrop={handleDrop}
        isLast
        className="!h-full min-h-12 flex-grow"
      />
    </>
  );
};
export default BlogBuilder;
