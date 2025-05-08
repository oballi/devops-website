"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageData } from "@/components/page-builder/types";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { slugify } from "@/lib/utils";

export default function NewPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [showInMenu, setShowInMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(slugify(newTitle));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from("pages")
        .insert({
          title,
          slug,
          blocks: [],
          is_published: isPublished,
          show_in_menu: showInMenu,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Sayfa başarıyla oluşturuldu");
      router.push(`/dashboard/pages/${data.id}`);
    } catch (error) {
      console.error("Error creating page:", error);
      toast.error("Sayfa oluşturulurken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Yeni Sayfa</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Başlık</Label>
          <Input
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Sayfa başlığı..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="sayfa-url"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isPublished"
            checked={isPublished}
            onCheckedChange={setIsPublished}
          />
          <Label htmlFor="isPublished">Yayınla</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="showInMenu"
            checked={showInMenu}
            onCheckedChange={setShowInMenu}
          />
          <Label htmlFor="showInMenu">Menüde Göster</Label>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            İptal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Oluşturuluyor..." : "Oluştur"}
          </Button>
        </div>
      </form>
    </div>
  );
} 