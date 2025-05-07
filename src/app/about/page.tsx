import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Me | DevOps Blog",
  description: "Learn more about the DevOps engineer behind this blog.",
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
                  About Me
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  DevOps Engineer & Technical Writer
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
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">My Story</h2>
                <p className="text-muted-foreground">
                  Hello! I'm a passionate DevOps engineer with over 8 years of experience in the field. 
                  I specialize in cloud infrastructure, containerization, CI/CD pipelines, and automation. 
                  Throughout my career, I've worked with various technologies and platforms, helping 
                  organizations streamline their development processes and improve their operational efficiency.
                </p>
                <p className="text-muted-foreground">
                  I started this blog to share my knowledge and experiences with the community. 
                  My goal is to provide practical insights, tutorials, and best practices that can 
                  help fellow engineers in their DevOps journey.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Expertise</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Infrastructure & Cloud</h3>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>AWS, Azure, GCP</li>
                        <li>Terraform, CloudFormation</li>
                        <li>Kubernetes, Docker</li>
                        <li>Infrastructure as Code</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">CI/CD & Automation</h3>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>Jenkins, GitHub Actions</li>
                        <li>GitLab CI, CircleCI</li>
                        <li>Ansible, Puppet</li>
                        <li>Bash, Python scripting</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Monitoring & Observability</h3>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>Prometheus, Grafana</li>
                        <li>ELK Stack</li>
                        <li>Datadog, New Relic</li>
                        <li>Distributed tracing</li>
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
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Certifications</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold">AWS Certified DevOps Engineer</h3>
                    <p className="text-sm text-muted-foreground">Amazon Web Services</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold">Certified Kubernetes Administrator</h3>
                    <p className="text-sm text-muted-foreground">Cloud Native Computing Foundation</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold">Microsoft Azure DevOps Engineer</h3>
                    <p className="text-sm text-muted-foreground">Microsoft</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold">HashiCorp Certified Terraform Associate</h3>
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