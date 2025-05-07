import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, CodeIcon, ServerIcon, TerminalIcon } from "lucide-react";

// Mock data for featured blog posts
const featuredPosts = [
  {
    id: 1,
    title: "DevOps Mühendisleri için Docker'a Başlangıç",
    description: "DevOps iş akışınızda Docker'ı etkili bir şekilde kullanmayı öğrenin.",
    date: "15 Mayıs 2023",
    tags: ["Docker", "Konteynerler", "DevOps"],
    readingTime: "5 dk okuma",
  },
  {
    id: 2,
    title: "Üretim Ortamları için Kubernetes En İyi Uygulamaları",
    description: "Kubernetes kümelerinizi üretim için optimize etmenin yollarını keşfedin.",
    date: "3 Haziran 2023",
    tags: ["Kubernetes", "Bulut", "DevOps"],
    readingTime: "7 dk okuma",
  },
  {
    id: 3,
    title: "GitHub Actions ile CI/CD Pipeline'ları",
    description: "GitHub Actions kullanarak verimli CI/CD pipeline'ları kurma rehberi.",
    date: "12 Temmuz 2023",
    tags: ["CI/CD", "GitHub", "Otomasyon"],
    readingTime: "6 dk okuma",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center w-full">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  DevOps İçgörüleri ve En İyi Uygulamalar
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Pratik rehberler, öğreticiler ve içgörülerle DevOps mühendisliği dünyasını keşfedin.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button asChild>
                  <Link href="/blog">
                    Blogu Oku
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/about">Hakkımda</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-4 text-center w-full">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Yazdığım Konular
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Pratik örnekler ve gerçek dünya uygulamalarıyla çeşitli DevOps konularını keşfedin.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-primary/10 p-4">
                  <ServerIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Altyapı</h3>
                <p className="text-center text-muted-foreground">
                  Bulut platformları, IaC ve modern altyapı çözümleri.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-primary/10 p-4">
                  <TerminalIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Otomasyon</h3>
                <p className="text-center text-muted-foreground">
                  CI/CD pipeline'ları, test stratejileri ve dağıtım otomasyonu.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-primary/10 p-4">
                  <CodeIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Geliştirme</h3>
                <p className="text-center text-muted-foreground">
                  DevOps kültürü, en iyi uygulamalar ve geliştiriciler için araçlar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Blog Posts */}
        <section className="w-full py-12 md:py-24 bg-muted/40">
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-4 text-center w-full">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Öne Çıkan Blog Yazıları
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  DevOps konularında en popüler makalelerimi keşfedin.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="flex flex-col overflow-hidden">
                  <CardHeader className="flex flex-col space-y-1.5">
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="flex items-center text-xs">
                      <span>{post.date}</span>
                      <span className="mx-1">•</span>
                      <span>{post.readingTime}</span>
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
            <div className="flex justify-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  Tüm Yazıları Gör
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-4 text-center w-full">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Güncel Kalın
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  En son DevOps içgörüleri ve öğreticileri için bültenime abone olun.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2 mx-auto">
                <form className="flex space-x-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="E-posta adresinizi girin"
                    type="email"
                    required
                  />
                  <Button type="submit">Abone Ol</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  E-posta adresinizi kimseyle paylaşmayacağım.
                </p>
              </div>
            </div>
        </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
