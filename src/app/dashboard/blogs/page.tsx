"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import MDEditor from "@uiw/react-md-editor";

const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

interface Blog {
  id: number;
  title: string;
  content: string;
  tags: string;
}

export default function BlogManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string | undefined>("");
  const [tags, setTags] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  function handleAddOrUpdateBlog(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content?.trim()) return;
    if (editId) {
      setBlogs(prev => prev.map(b => b.id === editId ? { ...b, title, content: content || "", tags } : b));
      setEditId(null);
    } else {
      setBlogs(prev => [
        { id: Date.now(), title, content: content || "", tags },
        ...prev,
      ]);
    }
    setTitle("");
    setContent("");
    setTags("");
  }

  function handleEdit(blog: Blog) {
    setEditId(blog.id);
    setTitle(blog.title);
    setContent(blog.content);
    setTags(blog.tags);
  }

  function handleDelete(id: number) {
    setBlogs(prev => prev.filter(b => b.id !== id));
    if (editId === id) {
      setEditId(null);
      setTitle("");
      setContent("");
      setTags("");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* İki sütun: Sol editör, sağ önizleme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sol: Blog ekleme/güncelleme formu ve markdown editör */}
        <form onSubmit={handleAddOrUpdateBlog} className="bg-background rounded-xl shadow p-6 flex flex-col gap-4 border">
          <h2 className="text-lg font-semibold mb-2">{editId ? "Blogu Güncelle" : "Yeni Blog Ekle"}</h2>
          <Input
            placeholder="Başlık"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <div className="w-full">
            <MDEditor
              value={content}
              onChange={setContent}
              height={220}
              preview="edit"
              textareaProps={{
                placeholder: "Markdown formatında içerik...",
                className: "font-mono text-sm min-h-[180px]"
              }}
            />
          </div>
          <Input
            placeholder="Etiketler (virgülle ayırın)"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
          <div className="flex gap-2">
            <Button type="submit">{editId ? "Güncelle" : "Kaydet"}</Button>
            {editId && (
              <Button type="button" variant="outline" onClick={() => { setEditId(null); setTitle(""); setContent(""); setTags(""); }}>İptal</Button>
            )}
          </div>
        </form>
        {/* Sağ: Markdown önizleme */}
        <div className="bg-background border rounded-xl p-6 shadow min-h-[260px]">
          <h3 className="text-base font-semibold mb-2">Markdown Önizleme</h3>
          <div className="prose max-w-none">
            {content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            ) : (
              <span className="text-muted-foreground text-sm">Markdown içeriği burada önizlenecek.</span>
            )}
          </div>
        </div>
      </div>
      {/* Blog listesi */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold mb-2">Bloglarım</h2>
        {blogs.length === 0 ? (
          <div className="text-muted-foreground text-sm">Henüz blog eklenmedi.</div>
        ) : (
          blogs.map(blog => (
            <Card key={blog.id} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{blog.title}</CardTitle>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {blog.tags && blog.tags.split(",").map(tag => (
                      <span key={tag} className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">{tag.trim()}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(blog)}>Düzenle</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(blog.id)}>Sil</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-sm text-muted-foreground">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </div>
  );
} 