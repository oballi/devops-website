import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Docker for DevOps Engineers",
    description: "Learn how to use Docker effectively in your DevOps workflow with these practical tips.",
    date: "2023-05-15",
    tags: ["Docker", "Containers", "DevOps"],
    readingTime: "5 min read",
    content: `
      ## Introduction to Docker

      Docker is a platform that enables developers to build, package, and deploy applications in containers. Containers are lightweight, portable, and self-sufficient environments that can run applications consistently across different computing environments.

      ## Why Docker is Essential for DevOps

      In a DevOps workflow, Docker provides several benefits:

      1. **Consistency**: Docker ensures that your application runs the same way in development, testing, and production environments.
      2. **Isolation**: Containers isolate applications from each other, preventing conflicts between dependencies.
      3. **Portability**: Docker containers can run on any system that has Docker installed, making deployment easier.
      4. **Scalability**: Docker makes it easy to scale applications horizontally by spinning up multiple containers.

      ## Getting Started with Docker

      ### Installation

      To install Docker on your system, follow these steps:

      \`\`\`bash
      # Update your package index
      sudo apt-get update

      # Install packages to allow apt to use a repository over HTTPS
      sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

      # Add Docker's official GPG key
      curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

      # Set up the Docker repository
      sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

      # Update the package index again
      sudo apt-get update

      # Install Docker CE
      sudo apt-get install -y docker-ce
      \`\`\`

      ### Basic Docker Commands

      Here are some essential Docker commands to get you started:

      - \`docker pull\`: Pull an image from Docker Hub
      - \`docker run\`: Run a container from an image
      - \`docker ps\`: List running containers
      - \`docker images\`: List available images
      - \`docker stop\`: Stop a running container
      - \`docker rm\`: Remove a container
      - \`docker rmi\`: Remove an image

      ## Creating a Dockerfile

      A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Here's a simple example:

      \`\`\`dockerfile
      # Use an official Node.js runtime as the base image
      FROM node:14

      # Set the working directory in the container
      WORKDIR /app

      # Copy package.json and package-lock.json to the container
      COPY package*.json ./

      # Install dependencies
      RUN npm install

      # Copy the rest of the application code
      COPY . .

      # Expose port 3000
      EXPOSE 3000

      # Define the command to run the application
      CMD ["npm", "start"]
      \`\`\`

      ## Docker Compose

      Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application's services.

      \`\`\`yaml
      version: '3'
      services:
        web:
          build: .
          ports:
            - "3000:3000"
          depends_on:
            - db
        db:
          image: postgres
          environment:
            POSTGRES_PASSWORD: example
      \`\`\`

      ## Best Practices for Docker in DevOps

      1. **Keep containers small**: Use minimal base images and multi-stage builds.
      2. **Use .dockerignore**: Exclude files not needed in the container.
      3. **Implement CI/CD pipelines**: Automate building and testing Docker images.
      4. **Use Docker Compose for local development**: Make it easy for developers to spin up the entire stack.
      5. **Implement proper logging**: Configure logging drivers to collect logs from containers.

      ## Conclusion

      Docker is a powerful tool for DevOps engineers that simplifies the process of building, shipping, and running applications. By following the best practices outlined in this article, you can effectively integrate Docker into your DevOps workflow and improve your development and deployment processes.
    `,
  },
  {
    id: 2,
    title: "Kubernetes Best Practices for Production Environments",
    description: "Discover how to optimize your Kubernetes clusters for production with these battle-tested strategies.",
    date: "2023-06-03",
    tags: ["Kubernetes", "Cloud", "DevOps"],
    readingTime: "7 min read",
    content: `
      ## Introduction to Kubernetes in Production

      Kubernetes has become the de facto standard for container orchestration in production environments. However, running Kubernetes in production requires careful planning and adherence to best practices to ensure reliability, security, and performance.

      ## Resource Management

      Proper resource management is crucial for production Kubernetes clusters. Here are some best practices:

      ### Resource Requests and Limits

      Always specify resource requests and limits for your containers:

      \`\`\`yaml
      resources:
        requests:
          memory: "128Mi"
          cpu: "100m"
        limits:
          memory: "256Mi"
          cpu: "200m"
      \`\`\`

      This helps Kubernetes make better scheduling decisions and prevents resource contention.

      ### Namespace Resource Quotas

      Use namespace resource quotas to limit resource usage per namespace:

      \`\`\`yaml
      apiVersion: v1
      kind: ResourceQuota
      metadata:
        name: compute-resources
        namespace: my-namespace
      spec:
        hard:
          pods: "10"
          requests.cpu: "4"
          requests.memory: 8Gi
          limits.cpu: "8"
          limits.memory: 16Gi
      \`\`\`

      ## High Availability

      For production environments, high availability is essential:

      1. **Use multiple replicas**: Deploy at least 3 replicas of your application.
      2. **Implement pod disruption budgets**: Ensure a minimum number of pods are always available.
      3. **Use anti-affinity rules**: Spread pods across different nodes.
      4. **Configure liveness and readiness probes**: Ensure Kubernetes can detect and recover from failures.

      ## Security Best Practices

      Security is paramount in production Kubernetes environments:

      1. **Use RBAC**: Implement Role-Based Access Control to limit permissions.
      2. **Network policies**: Restrict network traffic between pods.
      3. **Pod security policies**: Enforce security standards for pods.
      4. **Image security**: Use trusted images and scan for vulnerabilities.
      5. **Secrets management**: Use a secure solution for managing secrets.

      ## Monitoring and Logging

      Comprehensive monitoring and logging are essential for production Kubernetes clusters:

      1. **Prometheus and Grafana**: Monitor cluster and application metrics.
      2. **Distributed tracing**: Implement tools like Jaeger or Zipkin.
      3. **Centralized logging**: Use ELK stack or similar solutions.
      4. **Alerts**: Set up alerting for critical issues.

      ## Backup and Disaster Recovery

      Implement a robust backup and disaster recovery strategy:

      1. **Regular etcd backups**: Back up the Kubernetes control plane.
      2. **Application data backups**: Use tools like Velero.
      3. **Disaster recovery plan**: Document and test your recovery procedures.
      4. **Multi-region deployments**: Consider deploying across multiple regions for critical applications.

      ## Scaling Strategies

      Implement proper scaling strategies for your applications:

      1. **Horizontal Pod Autoscaler**: Scale based on CPU or custom metrics.
      2. **Vertical Pod Autoscaler**: Automatically adjust resource requests.
      3. **Cluster Autoscaler**: Scale the cluster based on resource demands.

      ## CI/CD Integration

      Integrate Kubernetes with your CI/CD pipeline:

      1. **GitOps**: Use tools like ArgoCD or Flux.
      2. **Canary deployments**: Gradually roll out changes.
      3. **Blue-green deployments**: Minimize downtime during deployments.

      ## Conclusion

      Running Kubernetes in production requires careful planning and adherence to best practices. By following the guidelines outlined in this article, you can build a reliable, secure, and performant Kubernetes environment for your applications.
    `,
  },
  {
    id: 3,
    title: "CI/CD Pipelines with GitHub Actions",
    description: "A comprehensive guide to setting up efficient CI/CD pipelines using GitHub Actions.",
    date: "2023-07-12",
    tags: ["CI/CD", "GitHub", "Automation"],
    readingTime: "6 min read",
    content: `
      ## Introduction to GitHub Actions

      GitHub Actions is a powerful CI/CD platform that allows you to automate your software development workflows right in your GitHub repository. With GitHub Actions, you can build, test, and deploy your code directly from GitHub.

      ## Getting Started with GitHub Actions

      GitHub Actions workflows are defined in YAML files stored in the \`.github/workflows\` directory of your repository. Here's a simple example of a workflow file:

      \`\`\`yaml
      name: CI

      on:
        push:
          branches: [ main ]
        pull_request:
          branches: [ main ]

      jobs:
        build:
          runs-on: ubuntu-latest
          
          steps:
          - uses: actions/checkout@v2
          
          - name: Set up Node.js
            uses: actions/setup-node@v2
            with:
              node-version: '14'
              
          - name: Install dependencies
            run: npm ci
            
          - name: Run tests
            run: npm test
      \`\`\`

      ## Key Components of GitHub Actions

      ### Workflows

      Workflows are automated procedures that you set up in your repository. They are defined by a YAML file in the \`.github/workflows\` directory.

      ### Events

      Events are specific activities that trigger a workflow. Common events include:
      - Push
      - Pull request
      - Issue creation
      - Scheduled events (cron)
      - Manual triggers

      ### Jobs

      Jobs are sets of steps that execute on the same runner. By default, jobs run in parallel, but you can configure them to run sequentially.

      ### Steps

      Steps are individual tasks that run commands or actions. Steps run sequentially within a job.

      ### Actions

      Actions are reusable units of code that can be used in your workflows. GitHub provides many pre-built actions, and you can also create your own.

      ## Building a CI/CD Pipeline

      Let's create a complete CI/CD pipeline for a Node.js application:

      \`\`\`yaml
      name: CI/CD Pipeline

      on:
        push:
          branches: [ main ]
        pull_request:
          branches: [ main ]

      jobs:
        test:
          runs-on: ubuntu-latest
          
          steps:
          - uses: actions/checkout@v2
          
          - name: Set up Node.js
            uses: actions/setup-node@v2
            with:
              node-version: '14'
              
          - name: Install dependencies
            run: npm ci
            
          - name: Lint code
            run: npm run lint
            
          - name: Run tests
            run: npm test
            
          - name: Upload test coverage
            uses: actions/upload-artifact@v2
            with:
              name: coverage
              path: coverage/
              
        build:
          needs: test
          runs-on: ubuntu-latest
          
          steps:
          - uses: actions/checkout@v2
          
          - name: Set up Node.js
            uses: actions/setup-node@v2
            with:
              node-version: '14'
              
          - name: Install dependencies
            run: npm ci
            
          - name: Build application
            run: npm run build
            
          - name: Upload build artifacts
            uses: actions/upload-artifact@v2
            with:
              name: build
              path: build/
              
        deploy:
          needs: build
          runs-on: ubuntu-latest
          if: github.ref == 'refs/heads/main'
          
          steps:
          - uses: actions/checkout@v2
          
          - name: Download build artifacts
            uses: actions/download-artifact@v2
            with:
              name: build
              path: build/
              
          - name: Deploy to production
            uses: some-deployment-action@v1
            with:
              api-key: \${{ secrets.DEPLOY_API_KEY }}
      \`\`\`

      ## Advanced GitHub Actions Features

      ### Environment Variables and Secrets

      You can use environment variables and secrets to store sensitive information:

      \`\`\`yaml
      jobs:
        deploy:
          runs-on: ubuntu-latest
          env:
            NODE_ENV: production
          steps:
            - name: Deploy with secret
              run: ./deploy.sh
              env:
                API_KEY: \${{ secrets.API_KEY }}
      \`\`\`

      ### Matrix Builds

      Matrix builds allow you to test against multiple versions or configurations:

      \`\`\`yaml
      jobs:
        test:
          runs-on: ubuntu-latest
          strategy:
            matrix:
              node-version: [12.x, 14.x, 16.x]
          
          steps:
          - uses: actions/checkout@v2
          
          - name: Use Node.js \${{ matrix.node-version }}
            uses: actions/setup-node@v2
            with:
              node-version: \${{ matrix.node-version }}
              
          - name: Install dependencies
            run: npm ci
            
          - name: Run tests
            run: npm test
      \`\`\`

      ### Caching Dependencies

      You can cache dependencies to speed up your workflows:

      \`\`\`yaml
      jobs:
        build:
          runs-on: ubuntu-latest
          
          steps:
          - uses: actions/checkout@v2
          
          - name: Set up Node.js
            uses: actions/setup-node@v2
            with:
              node-version: '14'
              
          - name: Cache Node.js modules
            uses: actions/cache@v2
            with:
              path: ~/.npm
              key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
              restore-keys: |
                \${{ runner.os }}-node-
                
          - name: Install dependencies
            run: npm ci
      \`\`\`

      ## Best Practices for GitHub Actions

      1. **Keep secrets secure**: Never hardcode sensitive information in your workflow files.
      2. **Use specific versions for actions**: Pin to specific versions to avoid breaking changes.
      3. **Minimize workflow execution time**: Use caching and optimize your workflows.
      4. **Test your workflows**: Make sure your workflows work as expected before merging.
      5. **Use self-hosted runners for specialized needs**: For specific hardware or software requirements.

      ## Conclusion

      GitHub Actions provides a powerful and flexible platform for implementing CI/CD pipelines directly within your GitHub repository. By following the best practices outlined in this article, you can create efficient, secure, and reliable pipelines for your projects.
    `,
  },
];

export function generateMetadata({ params }: { params: { id: string } }) {
  const post = blogPosts.find((post) => post.id === parseInt(params.id));
  
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

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id);
  const post = blogPosts.find((post) => post.id === postId);
  
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
              Back to all posts
            </Link>
          </Button>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <time dateTime={post.date}>{formattedDate}</time>
              <span>•</span>
              <span>{post.readingTime}</span>
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
          
          <div className="prose prose-zinc dark:prose-invert max-w-none">
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