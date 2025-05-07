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
    title: "Getting Started with Docker for DevOps Engineers",
    description: "Learn how to use Docker effectively in your DevOps workflow with these practical tips.",
    date: "May 15, 2023",
    tags: ["Docker", "Containers", "DevOps"],
    readingTime: "5 min read",
  },
  {
    id: 2,
    title: "Kubernetes Best Practices for Production Environments",
    description: "Discover how to optimize your Kubernetes clusters for production with these battle-tested strategies.",
    date: "June 3, 2023",
    tags: ["Kubernetes", "Cloud", "DevOps"],
    readingTime: "7 min read",
  },
  {
    id: 3,
    title: "CI/CD Pipelines with GitHub Actions",
    description: "A comprehensive guide to setting up efficient CI/CD pipelines using GitHub Actions.",
    date: "July 12, 2023",
    tags: ["CI/CD", "GitHub", "Automation"],
    readingTime: "6 min read",
  },
  {
    id: 4,
    title: "Infrastructure as Code with Terraform",
    description: "How to manage your infrastructure efficiently using Terraform and best practices for IaC.",
    date: "August 5, 2023",
    tags: ["Terraform", "IaC", "Cloud"],
    readingTime: "8 min read",
  },
  {
    id: 5,
    title: "Monitoring Microservices with Prometheus and Grafana",
    description: "Set up comprehensive monitoring for your microservices architecture using Prometheus and Grafana.",
    date: "September 18, 2023",
    tags: ["Monitoring", "Prometheus", "Grafana"],
    readingTime: "9 min read",
  },
  {
    id: 6,
    title: "Securing Your Kubernetes Clusters",
    description: "Essential security practices to protect your Kubernetes clusters from common vulnerabilities.",
    date: "October 22, 2023",
    tags: ["Kubernetes", "Security", "DevOps"],
    readingTime: "7 min read",
  },
];

export const metadata = {
  title: "Blog | DevOps Blog",
  description: "Read the latest articles on DevOps engineering, tools, and best practices.",
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
                  Explore articles, tutorials, and insights on DevOps engineering.
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
                        Read More
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
                  Browse by Category
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