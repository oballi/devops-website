"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Pencil, Trash2, Eye, ArrowLeft, MoreHorizontalIcon, PlusIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  type?: string;
  data?: any;
  show_in_menu?: boolean;
}

const defaultPages = [
  { title: "Hakkımda", slug: "about", content: "", is_published: true, type: "about", data: {} },
  { title: "KVKK", slug: "kvkk", content: "", is_published: true, type: "custom", data: {} },
  { title: "Gizlilik Politikası", slug: "gizlilik-politikasi", content: "", is_published: true, type: "custom", data: {} },
  { title: "SSS", slug: "sss", content: "", is_published: true, type: "custom", data: {} },
  { title: "Projelerim", slug: "projects", content: "", is_published: true, type: "projects", data: { projects: [] } },
];

const PAGE_TYPES = [
  { value: "about", label: "Hakkımda (Profil)" },
  { value: "projects", label: "Projelerim" },
  { value: "custom", label: "Klasik (Başlık + İçerik)" },
];

export default function PagesList() {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [form, setForm] = useState<any>({
    title: "",
    slug: "",
    content: "",
    is_published: true,
    type: "custom",
    data: {},
    slugTouched: false,
    show_in_menu: false,
  });
  const [activeTab, setActiveTab] = useState("edit");

  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    setLoading(true);
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setPages(data);
      // Mevcut default sayfalardan Supabase'da olmayanları ekle
      const missing = defaultPages.filter(dp => !data.some(p => p.slug === dp.slug));
      if (missing.length > 0) {
        await supabase.from("pages").insert(missing);
        // Tekrar fetch
        const { data: newData } = await supabase
          .from("pages")
          .select("*")
          .order("created_at", { ascending: false });
        if (newData) setPages(newData);
      }
    }
    setLoading(false);
  }

  function handleEdit(page: Page) {
    setSelectedPage(page);
    setForm({
      title: page.title,
      slug: page.slug,
      content: page.content,
      is_published: page.is_published,
      type: page.type || "custom",
      data: page.data || {},
      slugTouched: false,
      show_in_menu: page.show_in_menu ?? false,
    });
    setIsEditing(true);
    setActiveTab("edit");
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu sayfayı silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    const { error } = await supabase.from("pages").delete().eq("id", id);
    if (error) toast.error("Sayfa silinemedi");
    else toast.success("Sayfa silindi");
    fetchPages();
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (selectedPage) {
      // Güncelle
      const { error } = await supabase
        .from("pages")
        .update({
          title: form.title,
          slug: form.slug,
          content: form.content,
          is_published: form.is_published,
          type: form.type,
          data: form.data,
          show_in_menu: form.show_in_menu,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedPage.id);
      if (error) toast.error("Sayfa güncellenemedi");
      else toast.success("Sayfa güncellendi");
    } else {
      // Yeni ekle
      const { error } = await supabase
        .from("pages")
        .insert([
          {
            title: form.title,
            slug: form.slug,
            content: form.content,
            is_published: form.is_published,
            type: form.type,
            data: form.data,
            show_in_menu: form.show_in_menu,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
      if (error) toast.error("Sayfa eklenemedi");
      else toast.success("Sayfa eklendi");
    }
    setIsEditing(false);
    setSelectedPage(null);
    setForm({ title: "", slug: "", content: "", is_published: true, type: "custom", data: {}, slugTouched: false, show_in_menu: false });
    fetchPages();
    setLoading(false);
  }

  function resetForm() {
    setIsEditing(false);
    setSelectedPage(null);
    setForm({ title: "", slug: "", content: "", is_published: true, type: "custom", data: {}, slugTouched: false, show_in_menu: false });
    setActiveTab("edit");
  }

  // Dinamik form alanları
  function renderDynamicFields() {
    if (form.type === "about") {
      return (
        <>
          <div className="space-y-2">
            <label className="font-medium">Profil Fotoğrafı (URL)</label>
            <Input
              value={form.data.avatar || ""}
              onChange={e => setForm({ ...form, data: { ...form.data, avatar: e.target.value } })}
            />
          </div>
          <div className="space-y-2">
            <label className="font-medium">Alt Başlık</label>
            <Input
              value={form.data.subtitle || ""}
              onChange={e => setForm({ ...form, data: { ...form.data, subtitle: e.target.value } })}
            />
          </div>
          <div className="space-y-2">
            <label className="font-medium">Biyografi (Markdown)</label>
            <Textarea
              value={form.data.biography || ""}
              onChange={e => setForm({ ...form, data: { ...form.data, biography: e.target.value } })}
              className="min-h-[120px] font-mono"
            />
          </div>
          {/* Uzmanlıklar, deneyimler, sertifikalar, sosyal medya vs. eklenebilir */}
        </>
      );
    }
    if (form.type === "projects") {
      return (
        <>
          <div className="space-y-2">
            <label className="font-medium">Projeler (JSON formatında)</label>
            <Textarea
              value={JSON.stringify(form.data.projects || [], null, 2)}
              onChange={e => {
                let val = [];
                try { val = JSON.parse(e.target.value); } catch {}
                setForm({ ...form, data: { ...form.data, projects: val } });
              }}
              className="min-h-[120px] font-mono"
            />
            <span className="text-xs text-muted-foreground">Her proje için başlık, açıklama, link vs. ekleyebilirsiniz.</span>
          </div>
        </>
      );
    }
    // custom ve diğer tipler için klasik içerik
    return (
      <div className="space-y-2">
        <label className="font-medium">İçerik (Markdown)</label>
        <Textarea
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          className="min-h-[120px] font-mono"
        />
      </div>
    );
  }

  async function handleTogglePublish(id: number, currentStatus: boolean) {
    const { error } = await supabase
      .from("pages")
      .update({ is_published: !currentStatus })
      .eq("id", id);
    
    if (error) {
      toast.error("Durum güncellenirken bir hata oluştu");
    } else {
      toast.success(`Sayfa ${!currentStatus ? "yayınlandı" : "taslağa alındı"}`);
      fetchPages();
    }
  }

  async function handleToggleMenu(id: number, currentStatus: boolean) {
    const { error } = await supabase
      .from("pages")
      .update({ show_in_menu: !currentStatus })
      .eq("id", id);
    
    if (error) {
      toast.error("Menü durumu güncellenirken bir hata oluştu");
    } else {
      toast.success(`Sayfa menüden ${!currentStatus ? "gösteriliyor" : "kaldırıldı"}`);
      fetchPages();
    }
  }

  if (isEditing) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={resetForm}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri Dön
            </Button>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_published"
                checked={form.is_published}
                onChange={e => setForm({ ...form, is_published: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="is_published">Yayında</label>
              <input
                type="checkbox"
                id="show_in_menu"
                checked={form.show_in_menu}
                onChange={e => setForm({ ...form, show_in_menu: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 ml-2"
              />
              <label htmlFor="show_in_menu" className="ml-1">Menüde göster</label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                className="border rounded px-2 py-1 text-sm ml-2"
              >
                {PAGE_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Kaydediliyor..." : selectedPage ? "Güncelle" : "Kaydet"}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="font-medium">Başlık</label>
                <Input
                  value={form.title}
                  onChange={e => {
                    const newTitle = e.target.value;
                    setForm((prev: any) => ({
                      ...prev,
                      title: newTitle,
                      slug: !prev.slugTouched ?
                        newTitle
                          .toLowerCase()
                          .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, "")
                        : prev.slug
                    }));
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium">Slug (URL)</label>
                <Input
                  value={form.slug}
                  onChange={e => setForm({ ...form, slug: e.target.value, slugTouched: true })}
                  required
                />
              </div>
              {renderDynamicFields()}
            </form>
            <div className="space-y-4">
              <div className="flex gap-2 mb-2">
                <Button type="button" variant={activeTab === "edit" ? "default" : "outline"} onClick={() => setActiveTab("edit")}>Düzenle</Button>
                <Button type="button" variant={activeTab === "preview" ? "default" : "outline"} onClick={() => setActiveTab("preview")}>Önizle</Button>
              </div>
              {activeTab === "edit" ? (
                <div className="prose prose-slate dark:prose-invert max-w-none p-4 border rounded-md min-h-[300px] overflow-y-auto bg-muted/40">
                  <span className="text-muted-foreground text-sm">İçeriği düzenleyin...</span>
                </div>
              ) : (
                <div className="prose prose-slate dark:prose-invert max-w-none p-4 border rounded-md min-h-[300px] overflow-y-auto">
                  {form.type === "about" && (
                    <>
                      <h2>{form.title}</h2>
                      {form.data.avatar && <img src={form.data.avatar} alt="Profil" className="w-24 h-24 rounded-full mb-4" />}
                      <h3>{form.data.subtitle}</h3>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{form.data.biography || ""}</ReactMarkdown>
                    </>
                  )}
                  {form.type === "projects" && (
                    <>
                      <h2>{form.title}</h2>
                      <ul>
                        {(form.data.projects || []).map((proj: any, i: number) => (
                          <li key={i} className="mb-2">
                            <strong>{proj.title}</strong> - {proj.description}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {form.type === "custom" && (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{form.content || "Önizleme için içerik girin..."}</ReactMarkdown>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Sayfalar</h1>
        <Button onClick={() => router.push("/dashboard/pages/new")}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Yeni Sayfa
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Başlık</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead>Menüde</TableHead>
            <TableHead>Son Güncelleme</TableHead>
            <TableHead className="w-[100px]">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page) => (
            <TableRow key={page.id}>
              <TableCell className="font-medium">{page.title}</TableCell>
              <TableCell>{page.slug}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    page.is_published
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {page.is_published ? "Yayında" : "Taslak"}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    page.show_in_menu
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {page.show_in_menu ? "Gösteriliyor" : "Gizli"}
                </span>
              </TableCell>
              <TableCell>
                {format(new Date(page.updated_at), "d MMMM yyyy HH:mm", {
                  locale: tr,
                })}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => router.push(`/dashboard/pages/${page.id}`)}
                    >
                      Düzenle
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleTogglePublish(page.id, page.is_published)}
                    >
                      {page.is_published ? "Taslağa Al" : "Yayınla"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleToggleMenu(page.id, page.show_in_menu)}
                    >
                      {page.show_in_menu ? "Menüden Kaldır" : "Menüye Ekle"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDelete(page.id)}
                    >
                      Sil
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 