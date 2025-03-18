"use client";
import { expandItems } from "@/lib/auth/utils";
import { Button, Collapse } from "@mui/material";
import { useState } from "react";

interface ClampedListProps<T, P> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  componentProps: P;
  initialVisibleItems: number;
  Component: React.FC<P & { item: T }>;
}

function ClampedList<T extends { id: string }, P>({
  data,
  initialVisibleItems,
  Component,
  componentProps,
  ...props
}: ClampedListProps<T, P>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = () => setIsExpanded(!isExpanded);
  const remainingItems = data.length - initialVisibleItems;

  return (
    <>
      <div {...props}>
        {data.slice(0, initialVisibleItems).map((item) => (
          <Component key={item.id} item={item} {...componentProps} />
        ))}
      </div>
      <Collapse in={isExpanded}>
        <div {...props}>
          {data.slice(initialVisibleItems).map((item) => (
            <Component key={item.id} item={item} {...componentProps} />
          ))}
        </div>
      </Collapse>
      {/* Show more/less button */}
      {data.length > initialVisibleItems ? (
        <div className="flex items-center justify-center">
          <Button className="mt-2 p-0" variant="text" onClick={toggle}>
            {isExpanded
              ? `Show less experiences${remainingItems > 1 ? "s" : ""}`
              : `Show ${remainingItems} more experiences${remainingItems > 1 ? "s" : ""}`}
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default ClampedList;
