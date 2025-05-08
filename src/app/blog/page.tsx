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
  tags: string[];
  reading_time: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const metadata = {
  title: "Blog | DevOps Blog",
  description: "DevOps mühendisliği, araçlar ve en iyi uygulamalar hakkında en son makaleleri okuyun.",
};

async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_draft', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Blog yazıları yüklenirken hata oluştu:', error);
    return [];
  }

  return data || [];
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const blogPosts = await getBlogPosts();
  const selectedTag = searchParams.tag as string | undefined;

  // Tüm blog yazılarından benzersiz etiketleri çıkar
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags))).sort();

  // Seçili etikete göre blog yazılarını filtrele
  const filteredPosts = selectedTag
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts;

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

        {/* Categories */}
        <section className="w-full py-12 bg-muted/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  Kategoriye Göre Göz At
                </h2>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {allTags.map((tag) => (
                  <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                    <Badge 
                      variant={selectedTag === tag ? "default" : "secondary"}
                      className="px-3 py-1 text-sm cursor-pointer hover:bg-primary/90 transition-colors"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="w-full py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {selectedTag && (
              <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between bg-muted/60 rounded-lg p-6 shadow-sm transition-all">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Badge variant="default" className="text-base px-4 py-2 bg-primary/90">
                      {selectedTag}
                    </Badge>
                    <span>Kategorisindeki Yazılar</span>
                  </h2>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Sadece <span className="font-semibold">{selectedTag}</span> etiketiyle işaretlenmiş yazılar gösteriliyor.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 md:mt-0"
                  asChild
                >
                  <Link href="/blog">
                    <span className="flex items-center gap-1">
                      <span>Filtreyi Kaldır</span>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1"><path d="M6 6l4 4m0-4l-4 4"/></svg>
                    </span>
                  </Link>
                </Button>
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
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
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                          <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-primary/90 transition-colors">
                            {tag}
                          </Badge>
                        </Link>
                      ))}
                    </div>
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
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 