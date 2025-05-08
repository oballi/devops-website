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
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Blog yazıları yüklenirken hata oluştu:', error);
    return [];
  }

  return data || [];
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

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
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
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
                <Badge className="px-3 py-1 text-sm">Docker</Badge>
                <Badge className="px-3 py-1 text-sm">Kubernetes</Badge>
                <Badge className="px-3 py-1 text-sm">CI/CD</Badge>
                <Badge className="px-3 py-1 text-sm">Cloud</Badge>
                <Badge className="px-3 py-1 text-sm">Terraform</Badge>
                <Badge className="px-3 py-1 text-sm">Monitoring</Badge>
                <Badge className="px-3 py-1 text-sm">Security</Badge>
                <Badge className="px-3 py-1 text-sm">Automation</Badge>
                <Badge className="px-3 py-1 text-sm">DevOps</Badge>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 