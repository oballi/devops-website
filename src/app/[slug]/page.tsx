import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { use } from "react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data } = await supabase
    .from("pages")
    .select("title, content")
    .eq("slug", slug)
    .single();
  if (!data) return { title: "Sayfa Bulunamadı" };
  return {
    title: data.title,
    description: data.content?.slice(0, 160) || ""
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!page || !page.is_published) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        {page.type === "about" ? (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{page.title}</h1>
            {page.data?.avatar && (
              <img src={page.data.avatar} alt="Profil" className="w-32 h-32 rounded-full mb-4" />
            )}
            {page.data?.subtitle && <h2 className="text-xl text-muted-foreground">{page.data.subtitle}</h2>}
            {page.data?.biography && (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.data.biography}</ReactMarkdown>
            )}
            {/* Uzmanlıklar, deneyimler, sertifikalar, sosyal medya vs. burada gösterilebilir */}
          </div>
        ) : page.type === "projects" ? (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{page.title}</h1>
            <ul className="space-y-2">
              {(page.data?.projects || []).map((proj: any, i: number) => (
                <li key={i} className="border rounded p-3">
                  <div className="font-semibold">{proj.title}</div>
                  <div className="text-muted-foreground text-sm">{proj.description}</div>
                  {proj.link && <a href={proj.link} className="text-primary underline" target="_blank">Projeye Git</a>}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{page.title}</h1>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.content}</ReactMarkdown>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 