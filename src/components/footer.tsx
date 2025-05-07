"use client";

import Link from "next/link";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { Separator } from "./ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col items-center text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">DevOps Blog</h3>
            <p className="text-sm text-muted-foreground">
              Sharing insights and experiences from the world of DevOps engineering.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/" className="text-sm hover:underline">Home</Link>
              <Link href="/blog" className="text-sm hover:underline">Blog</Link>
              <Link href="/about" className="text-sm hover:underline">About</Link>
              <Link href="/projects" className="text-sm hover:underline">Projects</Link>
              <Link href="/contact" className="text-sm hover:underline">Contact</Link>
            </div>
          </div>
          
          <div className="space-y-3 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-center">Connect</h3>
            <div className="flex space-x-4 justify-center">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-6 w-full" />
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full mb-8">
        <p className="text-sm text-muted-foreground">
          © {currentYear} DevOps Blog. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
} 