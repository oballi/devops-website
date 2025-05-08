"use client";

import { PageBlock } from "../types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface BlockPreviewProps {
  block: PageBlock;
}

export function BlockPreview({ block }: BlockPreviewProps) {
  const renderBlock = () => {
    switch (block.type) {
      case "text":
        return (
          <div
            className={cn(
              "prose prose-sm dark:prose-invert max-w-none",
              block.fontSize && `text-[${block.fontSize}px]`,
              block.fontWeight && `font-[${block.fontWeight}]`,
              block.color && `text-[${block.color}]`
            )}
          >
            {block.content}
          </div>
        );
      case "heading":
        const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag
            className={cn(
              "font-bold",
              block.color && `text-[${block.color}]`
            )}
          >
            {block.content}
          </HeadingTag>
        );
      case "image":
        return (
          <div className="relative">
            <Image
              src={block.url}
              alt={block.alt}
              width={block.width || 800}
              height={block.height || 400}
              className="rounded-lg"
            />
            {block.caption && (
              <p className="text-sm text-muted-foreground mt-2">{block.caption}</p>
            )}
          </div>
        );
      case "card":
        return (
          <div className="border rounded-lg overflow-hidden">
            {block.imageUrl && (
              <div className="relative h-48">
                <Image
                  src={block.imageUrl}
                  alt={block.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold mb-2">{block.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{block.content}</p>
              {block.buttonText && block.buttonUrl && (
                <Button asChild>
                  <a href={block.buttonUrl}>{block.buttonText}</a>
                </Button>
              )}
            </div>
          </div>
        );
      case "customCode":
        return (
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{block.code}</code>
          </pre>
        );
      case "divider":
        return (
          <hr
            className={cn(
              "my-4",
              block.style === "dashed" && "border-dashed",
              block.style === "dotted" && "border-dotted",
              block.color && `border-[${block.color}]`
            )}
          />
        );
      case "spacer":
        return <div style={{ height: block.height }} />;
      case "button":
        return (
          <Button
            variant={block.variant}
            size={block.size}
            asChild={!!block.url}
          >
            {block.url ? (
              <a href={block.url}>{block.text}</a>
            ) : (
              block.text
            )}
          </Button>
        );
      case "quote":
        return (
          <blockquote className="border-l-4 pl-4 italic">
            <p>{block.content}</p>
            {block.author && (
              <footer className="text-sm text-muted-foreground mt-2">
                — {block.author}
              </footer>
            )}
          </blockquote>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "w-full",
        block.alignment === "center" && "text-center",
        block.alignment === "right" && "text-right",
        block.alignment === "full" && "w-full"
      )}
      style={{
        padding: block.padding
          ? `${block.padding.top || 0}px ${block.padding.right || 0}px ${
              block.padding.bottom || 0
            }px ${block.padding.left || 0}px`
          : undefined,
        margin: block.margin
          ? `${block.margin.top || 0}px ${block.margin.right || 0}px ${
              block.margin.bottom || 0
            }px ${block.margin.left || 0}px`
          : undefined,
      }}
    >
      {renderBlock()}
    </div>
  );
} 