import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Mock data for blog posts
const blogPosts = [
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
  {
    id: 4,
    title: "Terraform ile Altyapı Kodu",
    description: "Terraform kullanarak altyapınızı verimli bir şekilde yönetin ve IaC için en iyi uygulamaları öğrenin.",
    date: "5 Ağustos 2023",
    tags: ["Terraform", "IaC", "Bulut"],
    readingTime: "8 dk okuma",
  },
  {
    id: 5,
    title: "Prometheus ve Grafana ile Mikroservisleri İzleme",
    description: "Prometheus ve Grafana kullanarak mikroservis mimariniz için kapsamlı izleme kurulumu.",
    date: "18 Eylül 2023",
    tags: ["İzleme", "Prometheus", "Grafana"],
    readingTime: "9 dk okuma",
  },
  {
    id: 6,
    title: "Kubernetes Kümelerinizi Güvenli Hale Getirme",
    description: "Kubernetes kümelerinizi yaygın güvenlik açıklarından korumak için temel güvenlik uygulamaları.",
    date: "22 Ekim 2023",
    tags: ["Kubernetes", "Güvenlik", "DevOps"],
    readingTime: "7 dk okuma",
  },
];

export const metadata = {
  title: "Blog | DevOps Blog",
  description: "DevOps mühendisliği, araçlar ve en iyi uygulamalar hakkında en son makaleleri okuyun.",
};

export default function BlogPage() {
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
        <section className="w-full py-12 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
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
          </div>
        </section>

        {/* Categories */}
        <section className="w-full py-12 md:py-24 bg-muted/40">
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