import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Hakkımda | DevOps Blog",
  description: "Bu blogun arkasındaki DevOps mühendisi hakkında daha fazla bilgi edinin.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src="/avatar-placeholder.png" alt="Profile" />
                <AvatarFallback>DB</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Hakkımda
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  DevOps Mühendisi & Teknik Yazar
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80">
                    <GithubIcon className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80">
                    <TwitterIcon className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80">
                    <LinkedinIcon className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="w-full py-12 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Hikayem</h2>
                <p className="text-muted-foreground">
                  Merhaba! Ben 8 yılı aşkın deneyime sahip tutkulu bir DevOps mühendisiyim. 
                  Bulut altyapısı, konteynerizasyon, CI/CD pipeline'ları ve otomasyon konularında uzmanlaştım. 
                  Kariyerim boyunca, organizasyonların geliştirme süreçlerini optimize etmelerine ve 
                  operasyonel verimliliklerini artırmalarına yardımcı olmak için çeşitli teknolojiler ve 
                  platformlarla çalıştım.
                </p>
                <p className="text-muted-foreground">
                  Bu blogu, bilgi ve deneyimlerimi toplulukla paylaşmak için başlattım. 
                  Amacım, DevOps yolculuğunda meslektaşlarıma yardımcı olabilecek pratik içgörüler, 
                  öğreticiler ve en iyi uygulamalar sunmaktır.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Uzmanlık Alanları</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Altyapı & Bulut</h3>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>AWS, Azure, GCP</li>
                        <li>Terraform, CloudFormation</li>
                        <li>Kubernetes, Docker</li>
                        <li>Altyapı Kodu (IaC)</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">CI/CD & Otomasyon</h3>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>Jenkins, GitHub Actions</li>
                        <li>GitLab CI, CircleCI</li>
                        <li>Ansible, Puppet</li>
                        <li>Bash, Python scriptleri</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">İzleme & Gözlemleme</h3>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>Prometheus, Grafana</li>
                        <li>ELK Stack</li>
                        <li>Datadog, New Relic</li>
                        <li>Dağıtık izleme</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Development</h3>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>Go, Python</li>
                        <li>JavaScript, TypeScript</li>
                        <li>Node.js, React</li>
                        <li>API development</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Work Experience</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Senior DevOps Engineer</h3>
                    <p className="text-muted-foreground">TechCorp Inc. | 2020 - Present</p>
                    <p className="text-muted-foreground">
                      Leading the DevOps team in implementing and maintaining cloud infrastructure, 
                      CI/CD pipelines, and monitoring solutions. Responsible for improving deployment 
                      processes and ensuring high availability of services.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">DevOps Engineer</h3>
                    <p className="text-muted-foreground">Cloud Solutions Ltd. | 2017 - 2020</p>
                    <p className="text-muted-foreground">
                      Designed and implemented containerized applications using Docker and Kubernetes. 
                      Automated infrastructure provisioning with Terraform and improved CI/CD pipelines.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Systems Administrator</h3>
                    <p className="text-muted-foreground">Tech Innovations | 2015 - 2017</p>
                    <p className="text-muted-foreground">
                      Managed on-premises and cloud infrastructure. Implemented monitoring solutions 
                      and automated routine tasks to improve operational efficiency.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Sertifikalar</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold">AWS Sertifikalı DevOps Mühendisi</h3>
                    <p className="text-sm text-muted-foreground">Amazon Web Services</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold">Sertifikalı Kubernetes Yöneticisi</h3>
                    <p className="text-sm text-muted-foreground">Cloud Native Computing Foundation</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold">Microsoft Azure DevOps Mühendisi</h3>
                    <p className="text-sm text-muted-foreground">Microsoft</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold">HashiCorp Sertifikalı Terraform Uzmanı</h3>
                    <p className="text-sm text-muted-foreground">HashiCorp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 