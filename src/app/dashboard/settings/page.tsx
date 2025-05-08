"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SettingsPage() {
  const [blogPageSize, setBlogPageSize] = useState(6);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogPageSize();
  }, []);

  async function fetchBlogPageSize() {
    setLoading(true);
    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "blog_page_size")
      .single();
    if (!error && data) setBlogPageSize(Number(data.value));
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("settings")
      .update({ value: String(blogPageSize) })
      .eq("key", "blog_page_size");
    if (error) toast.error("Ayar kaydedilemedi");
    else toast.success("Ayar kaydedildi");
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Genel Ayarlar</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <label className="font-medium">Blog Sayfasında Gösterilecek Yazı Sayısı</label>
            <Input
              type="number"
              min={1}
              value={blogPageSize}
              onChange={e => setBlogPageSize(Number(e.target.value))}
              disabled={loading}
              required
            />
            <Button type="submit" disabled={loading}>
              Kaydet
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 