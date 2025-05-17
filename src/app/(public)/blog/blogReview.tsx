/* eslint-disable @next/next/no-img-element */
"use client";
import { Block } from "@/types/blog";
import { Divider } from "@mui/material";
import { Info } from "lucide-react";
import YouTubePlayer from "@/components/UI/youtube-video-player";

export default function ArticlePreview({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((block) => (
        <div
          key={block.id}
          className="full relative w-full rounded-base border border-transparent p-2"
        >
          <BlockItem block={block} />
        </div>
      ))}
    </div>
  );
}

interface BlockRendererProps {
  block: Block;
}

export function BlockItem({ block }: BlockRendererProps) {
  const styles = block.styles || {
    width: "auto",
    height: "auto",
  };

  // Render different block types
  switch (block.type) {
    case "h1":
      return <h1 style={styles}>{block.content}</h1>;

    case "h2":
      return <h2 style={styles}>{block.content}</h2>;

    case "h3":
      return <h3 style={styles}>{block.content}</h3>;
    case "text":
      return <p style={styles}>{block.content}</p>;

    case "paragraph":
      return (
        <div
          className="prose max-w-none"
          style={styles}
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );
    case "divider":
      return <Divider style={styles} />;

    case "image":
      const { width, height, ...style } = styles;
      return (
        <div
          className="relative"
          style={{ width: width || "100%", height: height || "100%" }}
        >
          <img
            src={
              block.imageUrl ||
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            }
            alt="Content"
            style={styles}
          />
        </div>
      );

    case "button":
      return (
        <a href={block.linkUrl} style={styles} target="_blank">
          {block.content}
        </a>
      );

    case "html":
      return (
        <div
          style={styles}
          dangerouslySetInnerHTML={{ __html: block.content }}
          className="prose max-w-none"
        />
      );
    case "container":
      return (
        <div
          className={`${block.blocks.length === 0 ? "min-h-24" : ""} h-full min-w-60 rounded-base`}
          style={styles}
        >
          {block.blocks?.map((block) => (
            <div
              key={block.id}
              className="w-full border border-transparent p-2"
            >
              <BlockItem key={block.id} block={block} />
            </div>
          ))}
        </div>
      );
    case "flex-row":
      return (
        <div
          className="flex flex-col flex-wrap gap-3 md:flex-row"
          style={styles}
        >
          {block.blocks?.map((block) => (
            <div
              key={block.id}
              className="h-full w-full flex-1 border border-transparent p-2"
            >
              <BlockItem key={block.id} block={block} />
            </div>
          ))}
        </div>
      );

    case "quote":
      return (
        <blockquote style={styles}>
          <span className="w-full resize-none bg-transparent focus:outline-none">
            {block.content}
          </span>
        </blockquote>
      );

    case "code":
      return (
        <pre style={styles}>
          <span className="w-full resize-none bg-transparent text-white focus:outline-none">
            {block.content}
          </span>
        </pre>
      );

    case "video":
      return (
        <div style={styles}>
          {block.videoUrl ? (
            <YouTubePlayer
              videoUrl={block.videoUrl}
              priority={true}
              autoPlay={true}
              thumbnailUrl={block.videoThumbnail}
            />
          ) : (
            <div className="flex items-center justify-center bg-gray-500">
              <Info /> <span>This Video isn&apos;t Available </span>
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
}
