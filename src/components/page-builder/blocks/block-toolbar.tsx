"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BlockType } from "../types";
import { PlusIcon } from "lucide-react";

interface BlockToolbarProps {
  onAddBlock: (type: BlockType) => void;
}

const blockTypes: { type: BlockType; label: string }[] = [
  { type: "text", label: "Metin" },
  { type: "heading", label: "Başlık" },
  { type: "image", label: "Görsel" },
  { type: "card", label: "Kart" },
  { type: "grid", label: "Izgara" },
  { type: "customCode", label: "Özel Kod" },
  { type: "divider", label: "Ayraç" },
  { type: "spacer", label: "Boşluk" },
  { type: "button", label: "Buton" },
  { type: "quote", label: "Alıntı" },
];

export function BlockToolbar({ onAddBlock }: BlockToolbarProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Blok Ekle</h3>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full">
            <PlusIcon className="h-4 w-4 mr-2" />
            Yeni Blok
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {blockTypes.map(({ type, label }) => (
            <DropdownMenuItem
              key={type}
              onClick={() => onAddBlock(type)}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 