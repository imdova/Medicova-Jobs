import { Block } from "@/types/blog";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const ImageResizer = ({
  src,
  styles,
}: {
  src: string;
  styles: Block["styles"];
}) => {
  const { width: initialWidth = 200, height: initialHeight = 200 } = styles;
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: initialHeight,
  });
  const [maxWidth, setMaxWidth] = useState(Infinity);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth - 54;
        setMaxWidth(containerWidth);
        setDimensions((prev) => ({
          ...prev,
          width: containerWidth,
        }));
      }
    };

    updateSize(); // initial sizing
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", padding: "20px", boxSizing: "border-box" }}
    >
      <ResizableBox
        width={dimensions.width}
        height={Number(dimensions.height)}
        minConstraints={[100, 100]}
        maxConstraints={[maxWidth, 500] as [number, number]}
        onResizeStop={(e, data) => {
          setDimensions({
            width: data.size.width,
            height: data.size.height,
          });
        }}
        resizeHandles={["se"]}
      >
        <Image
          src={src}
          alt="Content"
          width={300}
          height={300}
          style={styles}
          className="h-full w-full object-cover"
        />
      </ResizableBox>
    </div>
  );
};

export default ImageResizer;
