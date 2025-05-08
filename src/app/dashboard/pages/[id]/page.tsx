"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { PageBuilder } from "@/components/page-builder/page-builder";
import { PageData } from "@/components/page-builder/types";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function PageEditor() {
  const params = useParams();
  const router = useRouter();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPage() {
      try {
        const { data, error } = await supabase
          .from("pages")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) throw error;

        if (data) {
          setPageData({
            id: data.id,
            title: data.title,
            slug: data.slug,
            blocks: data.blocks || [],
            isPublished: data.is_published,
            showInMenu: data.show_in_menu,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          });
        }
      } catch (error) {
        console.error("Error fetching page:", error);
        toast.error("Sayfa yüklenirken bir hata oluştu");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPage();
  }, [params.id]);

  const handleSave = async (data: PageData) => {
    try {
      const { error } = await supabase
        .from("pages")
        .update({
          title: data.title,
          slug: data.slug,
          blocks: data.blocks,
          is_published: data.isPublished,
          show_in_menu: data.showInMenu,
          updated_at: new Date().toISOString(),
        })
        .eq("id", data.id);

      if (error) throw error;

      toast.success("Sayfa başarıyla kaydedildi");
      router.refresh();
    } catch (error) {
      console.error("Error saving page:", error);
      toast.error("Sayfa kaydedilirken bir hata oluştu");
    }
  };

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (!pageData) {
    return <div>Sayfa bulunamadı</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">{pageData.title}</h1>
      <div className="h-[calc(100vh-12rem)]">
        <PageBuilder initialData={pageData} onSave={handleSave} />
      </div>
    </div>
  );
} 