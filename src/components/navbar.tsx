"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { HomeIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dynamicLinks, setDynamicLinks] = useState<{ name: string; href: string }[]>([]);

  const navLinks = [
    { name: "Anasayfa", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Hakkımda", href: "/about" },
    { name: "Projeler", href: "/projects" },
    { name: "İletişim", href: "/contact" },
  ];

  useEffect(() => {
    async function fetchMenuPages() {
      const { data } = await supabase
        .from("pages")
        .select("title, slug")
        .eq("is_published", true)
        .eq("show_in_menu", true)
        .order("created_at", { ascending: true });
      if (data) {
        setDynamicLinks(data.map((p: any) => ({ name: p.title, href: `/${p.slug}` })));
      }
    }
    fetchMenuPages();
  }, []);

  // Statik ve dinamik linkleri birleştir
  const allLinks = [
    navLinks[0], // Anasayfa
    navLinks[1], // Blog
    ...dynamicLinks,
    navLinks[2], // İletişim
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        {/* Logo - Sol */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <HomeIcon className="h-5 w-5" />
            <span className="font-bold">DevOps Blog</span>
          </Link>
        </div>
        {/* Spacer - Ortada */}
        <div className="flex-1" />
        {/* Menü - Sağ */}
        <nav className="hidden md:flex items-center gap-6">
          {allLinks.map((link) => (
            <Link
              key={link.name + link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-foreground/80"
            >
              {link.name}
            </Link>
          ))}
          <ModeToggle />
        </nav>
        {/* Mobil Menü */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              {allLinks.map((link) => (
                <Link
                  key={link.name + link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-foreground/80"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex justify-start mt-4">
                <ModeToggle />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
} 