"use client";

import { useState, useCallback } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { PageBlock, PageData } from "./types";
import { BlockEditor } from "./blocks/block-editor";
import { BlockPreview } from "./blocks/block-preview";
import { BlockToolbar } from "./blocks/block-toolbar";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface PageBuilderProps {
  initialData?: PageData;
  onSave: (data: PageData) => Promise<void>;
}

export function PageBuilder({ initialData, onSave }: PageBuilderProps) {
  const [blocks, setBlocks] = useState<PageBlock[]>(initialData?.blocks || []);
  const [activeBlock, setActiveBlock] = useState<PageBlock | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const block = blocks.find((b) => b.id === active.id);
    if (block) {
      setActiveBlock(block);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveBlock(null);

    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddBlock = useCallback((type: PageBlock["type"]) => {
    const newBlock: PageBlock = {
      id: uuidv4(),
      type,
      alignment: "left",
    } as PageBlock;

    setBlocks((prev) => [...prev, newBlock]);
  }, []);

  const handleUpdateBlock = useCallback((id: string, updates: Partial<PageBlock>) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, ...updates } : block))
    );
  }, []);

  const handleDeleteBlock = useCallback((id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
    setSelectedBlock(null);
  }, []);

  const handleSave = async () => {
    if (!initialData) return;
    
    const updatedData: PageData = {
      ...initialData,
      blocks,
      updatedAt: new Date().toISOString(),
    };

    await onSave(updatedData);
  };

  return (
    <div className="flex h-full">
      {/* Sol Panel - Blok Listesi ve Araç Çubuğu */}
      <div className="w-64 border-r p-4 space-y-4">
        <BlockToolbar onAddBlock={handleAddBlock} />
        <div className="space-y-2">
          {blocks.map((block) => (
            <div
              key={block.id}
              className={`p-2 rounded cursor-pointer ${
                selectedBlock === block.id ? "bg-primary/10" : "hover:bg-muted"
              }`}
              onClick={() => setSelectedBlock(block.id)}
            >
              {block.type}
            </div>
          ))}
        </div>
      </div>

      {/* Orta Panel - Düzenleme Alanı */}
      <div className="flex-1 p-4">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {blocks.map((block) => (
                <BlockEditor
                  key={block.id}
                  block={block}
                  isSelected={selectedBlock === block.id}
                  onUpdate={handleUpdateBlock}
                  onDelete={handleDeleteBlock}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeBlock ? <BlockPreview block={activeBlock} /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Sağ Panel - Önizleme */}
      <div className="w-1/3 border-l p-4">
        <div className="space-y-4">
          {blocks.map((block) => (
            <BlockPreview key={block.id} block={block} />
          ))}
        </div>
      </div>

      {/* Kaydet Butonu */}
      <Button
        className="fixed bottom-4 right-4"
        onClick={handleSave}
      >
        Kaydet
      </Button>
    </div>
  );
} 