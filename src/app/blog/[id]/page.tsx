import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
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

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getBlogPost(parseInt(params.id));
  
  if (!post) {
    return {
      title: "Post Not Found | DevOps Blog",
      description: "The requested blog post could not be found.",
    };
  }
  
  return {
    title: `${post.title} | DevOps Blog`,
    description: post.description,
  };
}

async function getBlogPost(id: number): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Blog yazısı yüklenirken hata oluştu:', error);
    return null;
  }

  return data;
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id);
  const post = await getBlogPost(postId);
  
  if (!post) {
    notFound();
  }
  
  const formattedDate = format(new Date(post.date), "MMMM d, yyyy");
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Button variant="ghost" size="sm" className="mb-6" asChild>
            <Link href="/blog">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Tüm yazılara dön
            </Link>
          </Button>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <time dateTime={post.date}>{formattedDate}</time>
              <span>•</span>
              <span>{post.reading_time}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {post.content.split('\n').map((line, index) => {
              if (line.startsWith('##')) {
                return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{line.replace('##', '').trim()}</h2>;
              } else if (line.startsWith('###')) {
                return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{line.replace('###', '').trim()}</h3>;
              } else if (line.trim().startsWith('```')) {
                const codeBlock = line.trim().replace('```', '').trim();
                return (
                  <pre key={index} className="bg-muted p-4 rounded-md overflow-x-auto my-4">
                    <code className="text-sm">{codeBlock}</code>
                  </pre>
                );
              } else if (line.trim().startsWith('1.') || line.trim().startsWith('2.') || line.trim().startsWith('3.') || line.trim().startsWith('4.') || line.trim().startsWith('5.')) {
                return <li key={index} className="ml-6 my-1">{line.replace(/^\d+\.\s/, '').trim()}</li>;
              } else if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
                return <li key={index} className="ml-6 my-1">{line.replace(/^[-*]\s/, '').trim()}</li>;
              } else if (line.trim() === '') {
                return <div key={index} className="h-4" />;
              } else {
                return <p key={index} className="my-4">{line.trim()}</p>;
              }
            })}
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
} 