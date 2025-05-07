import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLinkIcon, GithubIcon } from "lucide-react";

export const metadata = {
  title: "Projeler | DevOps Blog",
  description: "DevOps projelerimi ve açık kaynak katkılarımı keşfedin.",
};

// Mock data for projects
const projects = [
  {
    id: 1,
    title: "Kubernetes Dağıtım Yöneticisi",
    description: "Birden fazla küme arasında Kubernetes dağıtımlarını yönetmek ve otomatikleştirmek için bir araç.",
    tags: ["Kubernetes", "Go", "CI/CD"],
    github: "https://github.com/username/k8s-deployment-manager",
    demo: "https://k8s-manager-demo.com",
    image: "/project-placeholder.jpg",
  },
  {
    id: 2,
    title: "Altyapı Kodu Şablonları",
    description: "Yaygın altyapı desenleri için yeniden kullanılabilir Terraform modülleri ve CloudFormation şablonları koleksiyonu.",
    tags: ["Terraform", "AWS", "IaC"],
    github: "https://github.com/username/iac-templates",
    demo: "",
    image: "/project-placeholder.jpg",
  },
  {
    id: 3,
    title: "CI/CD Pipeline Oluşturucu",
    description: "Proje gereksinimlerine göre çeşitli platformlar için CI/CD pipeline yapılandırmaları oluşturan bir web uygulaması.",
    tags: ["CI/CD", "JavaScript", "DevOps"],
    github: "https://github.com/username/cicd-generator",
    demo: "https://cicd-generator.com",
    image: "/project-placeholder.jpg",
  },
  {
    id: 4,
    title: "Bulut Maliyet Optimizasyonu",
    description: "Bulut kaynak kullanımını analiz eden ve maliyet optimizasyonu için öneriler sunan bir araç.",
    tags: ["AWS", "Python", "Maliyet Optimizasyonu"],
    github: "https://github.com/username/cloud-cost-optimizer",
    demo: "",
    image: "/project-placeholder.jpg",
  },
  {
    id: 5,
    title: "İzleme Paneli",
    description: "Çeşitli kaynaklardan gelen metrikleri görselleştirmek için özelleştirilebilir bir izleme paneli.",
    tags: ["Prometheus", "Grafana", "İzleme"],
    github: "https://github.com/username/monitoring-dashboard",
    demo: "https://monitoring-demo.com",
    image: "/project-placeholder.jpg",
  },
  {
    id: 6,
    title: "Konteyner Güvenlik Tarayıcısı",
    description: "Konteyner görüntülerini güvenlik açıkları için tarayan ve düzeltme önerileri sunan bir araç.",
    tags: ["Docker", "Güvenlik", "Python"],
    github: "https://github.com/username/container-security-scanner",
    demo: "",
    image: "/project-placeholder.jpg",
  },
];

export default function ProjectsPage() {
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
                  DevOps Projeleri
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Açık kaynak projelerimi ve DevOps araçlarımı keşfedin.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="w-full py-12 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id} className="flex flex-col overflow-hidden">
                  <div className="aspect-video w-full bg-muted/60 flex items-center justify-center">
                    {/* Placeholder for project image */}
                    <div className="text-4xl font-bold text-muted-foreground/30">
                      {project.title.charAt(0)}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </CardContent>
                  <CardFooter className="flex gap-2 mt-auto">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="mr-1 h-4 w-4" />
                        GitHub
                      </Link>
                    </Button>
                    {project.demo && (
                      <Button size="sm" asChild>
                        <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLinkIcon className="mr-1 h-4 w-4" />
                          Demo
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Source Contributions */}
        <section className="w-full py-12 md:py-24 bg-muted/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Açık Kaynak Katkıları
                </h2>
                <p className="text-muted-foreground">
                  Açık kaynak DevOps projelerine yaptığım bazı katkılar.
                </p>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Kubernetes</CardTitle>
                    <CardDescription>
                      <Link href="https://github.com/kubernetes/kubernetes" target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                        <GithubIcon className="mr-1 h-4 w-4" />
                        kubernetes/kubernetes
                      </Link>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Kubernetes projesine dokümantasyon sorunlarını düzelterek ve özel kaynak tanımları için örnekler ekleyerek katkıda bulundum.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Terraform</CardTitle>
                    <CardDescription>
                      <Link href="https://github.com/hashicorp/terraform" target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                        <GithubIcon className="mr-1 h-4 w-4" />
                        hashicorp/terraform
                      </Link>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Terraform AWS sağlayıcısına yeni kaynak türleri için destek ekleyerek ve hata işlemeyi geliştirerek katkıda bulundum.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Prometheus</CardTitle>
                    <CardDescription>
                      <Link href="https://github.com/prometheus/prometheus" target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                        <GithubIcon className="mr-1 h-4 w-4" />
                        prometheus/prometheus
                      </Link>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Prometheus projesine belirli uygulamalar için özel dışa aktarıcılar geliştirerek ve dokümantasyonu iyileştirerek katkıda bulundum.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-12 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                İşbirliği Yapmak İster misiniz?
              </h2>
              <p className="text-muted-foreground">
                Bir projede işbirliği yapmakla ilgileniyorsanız veya çalışmalarım hakkında sorularınız varsa, lütfen iletişime geçmekten çekinmeyin.
              </p>
              <div className="flex justify-center mt-4">
                <Button asChild>
                  <Link href="/contact">İletişime Geç</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 