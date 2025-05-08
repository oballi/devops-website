import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  reading_time: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_draft: boolean;
  category_ids: number[];
}

export const metadata = {
  title: "Blog | DevOps Blog",
  description: "DevOps mühendisliği, araçlar ve en iyi uygulamalar hakkında en son makaleleri okuyun.",
};

async function getBlogPageSize(): Promise<number> {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "blog_page_size")
    .single();
  if (!error && data) return Number(data.value);
  return 6;
}

async function getBlogPosts(page: number, pageSize: number): Promise<{ posts: BlogPost[]; total: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .eq('is_draft', false)
    .order('created_at', { ascending: false })
    .range(from, to);
  if (error) {
    console.error('Blog yazıları yüklenirken hata oluştu:', error);
    return { posts: [], total: 0 };
  }
  return { posts: data || [], total: count || 0 };
}

function Pagination({ page, pageCount }: { page: number; pageCount: number }) {
  if (pageCount <= 1) return null;
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: pageCount }).map((_, i) => (
        <Link
          key={i}
          href={`/blog?page=${i + 1}`}
          className={`px-3 py-1 rounded ${page === i + 1 ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"}`}
        >
          {i + 1}
        </Link>
      ))}
    </div>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page) > 0 ? Number(searchParams.page) : 1;
  const pageSize = await getBlogPageSize();
  const { posts: blogPosts, total } = await getBlogPosts(page, pageSize);
  const pageCount = Math.ceil(total / pageSize);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  DevOps Blog
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  DevOps mühendisliği hakkında makaleleri, öğreticileri ve içgörüleri keşfedin.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Blog Posts */}
        <section className="w-full py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Card key={post.id} className="flex flex-col overflow-hidden">
                  <CardHeader className="flex flex-col space-y-1.5">
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="flex items-center text-xs">
                      <span>{new Date(post.date).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                      <span className="mx-1">•</span>
                      <span>{post.reading_time}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {post.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start space-y-2 pt-0">
                    <Button variant="link" className="px-0" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Devamını Oku
                        <ArrowRightIcon className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <Pagination page={page} pageCount={pageCount} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 