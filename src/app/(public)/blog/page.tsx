"use client";
import { useState } from "react";
import DragDropList from "./DragDropList";

interface ListItem {
  id: string;
  title: string;
  progress?: number;
  completed?: boolean;
}

export default function Home() {
  const [items, setItems] = useState<ListItem[]>([
    { id: "1", title: "Complete project documentation", progress: 75 },
    { id: "2", title: "Review pull requests", progress: 30 },
    { id: "3", title: "Update dependencies", progress: 100 },
    { id: "4", title: "Write unit tests", progress: 45 },
  ]);

  const handleReorder = (newItems: ListItem[]) => {
    setItems(newItems);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log("Edit item:", id);
  };

  return null;
  // <div className="min-h-screen bg-gray-50 py-12">
  //   <DragDropList
  //     items={items}
  //     onReorder={handleReorder}
  //     onDelete={handleDelete}
  //     onEdit={handleEdit}
  //   />
  // </div>
}
