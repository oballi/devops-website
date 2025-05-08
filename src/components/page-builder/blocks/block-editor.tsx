"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PageBlock } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrashIcon, GripVerticalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlockEditorProps {
  block: PageBlock;
  isSelected: boolean;
  onUpdate: (id: string, updates: Partial<PageBlock>) => void;
  onDelete: (id: string) => void;
}

export function BlockEditor({ block, isSelected, onUpdate, onDelete }: BlockEditorProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderEditor = () => {
    switch (block.type) {
      case "text":
        return (
          <Textarea
            value={block.content}
            onChange={(e) => onUpdate(block.id, { content: e.target.value })}
            placeholder="Metin içeriği..."
            className="min-h-[100px]"
          />
        );
      case "heading":
        return (
          <div className="space-y-2">
            <Input
              value={block.content}
              onChange={(e) => onUpdate(block.id, { content: e.target.value })}
              placeholder="Başlık içeriği..."
            />
            <Select
              value={block.level.toString()}
              onValueChange={(value) => onUpdate(block.id, { level: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Başlık seviyesi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">H1</SelectItem>
                <SelectItem value="2">H2</SelectItem>
                <SelectItem value="3">H3</SelectItem>
                <SelectItem value="4">H4</SelectItem>
                <SelectItem value="5">H5</SelectItem>
                <SelectItem value="6">H6</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case "image":
        return (
          <div className="space-y-2">
            <Input
              value={block.url}
              onChange={(e) => onUpdate(block.id, { url: e.target.value })}
              placeholder="Görsel URL'i..."
            />
            <Input
              value={block.alt}
              onChange={(e) => onUpdate(block.id, { alt: e.target.value })}
              placeholder="Alt metin..."
            />
            <Input
              value={block.caption}
              onChange={(e) => onUpdate(block.id, { caption: e.target.value })}
              placeholder="Açıklama..."
            />
          </div>
        );
      case "card":
        return (
          <div className="space-y-2">
            <Input
              value={block.title}
              onChange={(e) => onUpdate(block.id, { title: e.target.value })}
              placeholder="Kart başlığı..."
            />
            <Textarea
              value={block.content}
              onChange={(e) => onUpdate(block.id, { content: e.target.value })}
              placeholder="Kart içeriği..."
              className="min-h-[100px]"
            />
            <Input
              value={block.imageUrl}
              onChange={(e) => onUpdate(block.id, { imageUrl: e.target.value })}
              placeholder="Görsel URL'i..."
            />
            <Input
              value={block.buttonText}
              onChange={(e) => onUpdate(block.id, { buttonText: e.target.value })}
              placeholder="Buton metni..."
            />
            <Input
              value={block.buttonUrl}
              onChange={(e) => onUpdate(block.id, { buttonUrl: e.target.value })}
              placeholder="Buton URL'i..."
            />
          </div>
        );
      case "customCode":
        return (
          <Textarea
            value={block.code}
            onChange={(e) => onUpdate(block.id, { code: e.target.value })}
            placeholder="Özel kod..."
            className="min-h-[200px] font-mono"
          />
        );
      case "button":
        return (
          <div className="space-y-2">
            <Input
              value={block.text}
              onChange={(e) => onUpdate(block.id, { text: e.target.value })}
              placeholder="Buton metni..."
            />
            <Input
              value={block.url}
              onChange={(e) => onUpdate(block.id, { url: e.target.value })}
              placeholder="Buton URL'i..."
            />
            <Select
              value={block.variant}
              onValueChange={(value) => onUpdate(block.id, { variant: value as any })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Buton stili" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="outline">Outline</SelectItem>
                <SelectItem value="ghost">Ghost</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={block.size}
              onValueChange={(value) => onUpdate(block.id, { size: value as any })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Buton boyutu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Küçük</SelectItem>
                <SelectItem value="md">Orta</SelectItem>
                <SelectItem value="lg">Büyük</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case "quote":
        return (
          <div className="space-y-2">
            <Textarea
              value={block.content}
              onChange={(e) => onUpdate(block.id, { content: e.target.value })}
              placeholder="Alıntı içeriği..."
              className="min-h-[100px]"
            />
            <Input
              value={block.author}
              onChange={(e) => onUpdate(block.id, { author: e.target.value })}
              placeholder="Yazar..."
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative p-4 border rounded-lg bg-background",
        isSelected && "ring-2 ring-primary",
        isDragging && "opacity-50"
      )}
    >
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="cursor-grab"
          {...attributes}
          {...listeners}
        >
          <GripVerticalIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(block.id)}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-8">{renderEditor()}</div>
    </div>
  );
} 