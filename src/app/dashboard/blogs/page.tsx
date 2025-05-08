"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Pencil, Trash2, Eye, Save, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  tags: string[];
  reading_time: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_draft: boolean;
}

export default function BlogsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: format(new Date(), "yyyy-MM-dd"),
    tags: "",
    reading_time: "",
    content: "",
    is_draft: false,
  });

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBlogPosts(data || []);
    } catch (error) {
      console.error('Blog yazıları yüklenirken hata oluştu:', error);
      toast.error('Blog yazıları yüklenirken bir hata oluştu');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const tags = formData.tags.split(',').map(tag => tag.trim());
      
      if (selectedPost) {
        // Güncelleme
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: formData.title,
            description: formData.description,
            date: formData.date,
            tags: tags,
            reading_time: formData.reading_time,
            content: formData.content,
            is_draft: formData.is_draft,
            updated_at: new Date().toISOString(),
          })
          .eq('id', selectedPost.id);

        if (error) throw error;
        toast.success('Blog yazısı başarıyla güncellendi');
      } else {
        // Yeni kayıt
        const { error } = await supabase
          .from('blog_posts')
          .insert([{
            title: formData.title,
            description: formData.description,
            date: formData.date,
            tags: tags,
            reading_time: formData.reading_time,
            content: formData.content,
            is_draft: formData.is_draft,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }]);

        if (error) throw error;
        toast.success('Blog yazısı başarıyla eklendi');
      }

      setIsEditing(false);
      fetchBlogPosts();
      resetForm();
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      toast.error('Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      description: post.description,
      date: post.date,
      tags: post.tags.join(', '),
      reading_time: post.reading_time,
      content: post.content,
      is_draft: post.is_draft,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Blog yazısı başarıyla silindi');
      fetchBlogPosts();
    } catch (error) {
      console.error('Silme hatası:', error);
      toast.error('Blog yazısı silinirken bir hata oluştu');
    }
  };

  const resetForm = () => {
    setSelectedPost(null);
    setFormData({
      title: "",
      description: "",
      date: format(new Date(), "yyyy-MM-dd"),
      tags: "",
      reading_time: "",
      content: "",
      is_draft: false,
    });
    setActiveTab("edit");
  };

  if (isEditing) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => {
              setIsEditing(false);
              resetForm();
            }}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri Dön
            </Button>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_draft"
                  checked={formData.is_draft}
                  onChange={(e) => setFormData({ ...formData, is_draft: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="is_draft">Taslak olarak kaydet</Label>
              </div>
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Kaydediliyor..." : selectedPost ? "Güncelle" : "Kaydet"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Başlık</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Blog yazısının başlığı"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Blog yazısının kısa açıklaması"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Tarih</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reading_time">Okuma Süresi</Label>
                  <Input
                    id="reading_time"
                    value={formData.reading_time}
                    onChange={(e) => setFormData({ ...formData, reading_time: e.target.value })}
                    placeholder="5 dk okuma"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Etiketler</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="DevOps, Docker, Kubernetes (virgülle ayırın)"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="edit">Düzenle</TabsTrigger>
                  <TabsTrigger value="preview">Önizle</TabsTrigger>
                </TabsList>
                <TabsContent value="edit" className="space-y-2">
                  <Label htmlFor="content">İçerik</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Blog yazısının içeriği (Markdown formatında)"
                    className="min-h-[600px] font-mono"
                    required
                  />
                </TabsContent>
                <TabsContent value="preview" className="space-y-2">
                  <div className="prose prose-slate dark:prose-invert max-w-none p-4 border rounded-md min-h-[600px] overflow-y-auto">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {formData.content || "Önizleme için içerik girin..."}
                    </ReactMarkdown>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Yazıları</h1>
        <Button onClick={() => {
          resetForm();
          setIsEditing(true);
        }}>
          Yeni Yazı Ekle
        </Button>
      </div>

      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    {format(new Date(post.date), "d MMMM yyyy", { locale: tr })} • {post.reading_time}
                    {post.is_draft && (
                      <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        Taslak
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(post)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-muted rounded-md text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 