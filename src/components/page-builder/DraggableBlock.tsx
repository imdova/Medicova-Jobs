import { Draggable } from "@hello-pangea/dnd";
import { IconButton, Grid } from "@mui/material";
import { DragIndicator } from "@mui/icons-material";
import { Block } from "@/types/blog";
import { BlockRenderer } from "./BlockRenderer";

interface DraggableBlockProps {
  block: Block;
  index: number;
  isSelected: boolean;
  onSelect: (block: Block) => void;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, blockId: string) => void;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

export function DraggableBlock({
  block,
  index,
  isSelected,
  onSelect,
  onMenuOpen,
  setBlocks,
}: DraggableBlockProps) {
  return (
    <Grid item xs={block.gridProps?.xs ?? 12} sm={block.gridProps?.sm} md={block.gridProps?.md}>
      <Draggable draggableId={block.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            onClick={() => onSelect(block)}
            className={`group relative flex items-start border p-4 pt-6 ${
              isSelected ? "border-primary" : "border-neutral-200 hover:border-neutral-400"
            }`}
          >
            <div className="invisible mr-4 cursor-move rounded group-hover:visible">
              <IconButton
                {...provided.dragHandleProps}
                size="small"
                className="p-0"
                onClick={(e) => onMenuOpen(e, block.id)}
              >
                <DragIndicator fontSize="small" />
              </IconButton>
            </div>
            <BlockRenderer block={block} isSelected={isSelected} setBlocks={setBlocks} />
          </div>
        )}
      </Draggable>
    </Grid>
  );
}