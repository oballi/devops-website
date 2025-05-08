"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [editing, setEditing] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Kategoriler yüklenemedi");
    setCategories(data || []);
    setLoading(false);
  }

  function handleSlug(val: string) {
    setSlug(val.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, ""));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) return toast.error("Kategori adı ve slug zorunlu");
    setLoading(true);
    if (editing) {
      // Update
      const { error } = await supabase
        .from("categories")
        .update({ name, slug })
        .eq("id", editing.id);
      if (error) toast.error("Kategori güncellenemedi");
      else toast.success("Kategori güncellendi");
    } else {
      // Insert
      const { error } = await supabase
        .from("categories")
        .insert([{ name, slug }]);
      if (error) toast.error("Kategori eklenemedi");
      else toast.success("Kategori eklendi");
    }
    setName("");
    setSlug("");
    setEditing(null);
    fetchCategories();
    setLoading(false);
  }

  function handleEdit(category: Category) {
    setEditing(category);
    setName(category.name);
    setSlug(category.slug);
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) toast.error("Kategori silinemedi");
    else toast.success("Kategori silindi");
    fetchCategories();
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Kategori Yönetimi</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
            <Input
              placeholder="Kategori adı"
              value={name}
              onChange={e => {
                setName(e.target.value);
                handleSlug(e.target.value);
              }}
              disabled={loading}
              required
            />
            <Input
              placeholder="Slug (otomatik doldurulur)"
              value={slug}
              onChange={e => setSlug(e.target.value)}
              disabled={loading}
              required
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {editing ? "Güncelle" : "Ekle"}
              </Button>
              {editing && (
                <Button type="button" variant="ghost" onClick={() => { setEditing(null); setName(""); setSlug(""); }}>
                  İptal
                </Button>
              )}
            </div>
          </form>
          <div className="space-y-2">
            {categories.map(cat => (
              <div key={cat.id} className="flex items-center justify-between border rounded px-3 py-2">
                <div>
                  <span className="font-medium">{cat.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">/{cat.slug}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(cat)} disabled={loading}>
                    Düzenle
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(cat.id)} disabled={loading}>
                    Sil
                  </Button>
                </div>
              </div>
            ))}
            {categories.length === 0 && <div className="text-muted-foreground text-sm">Hiç kategori yok.</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 