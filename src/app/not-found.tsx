import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">404</h1>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Sayfa Bulunamadı</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Üzgünüz, aradığınız sayfayı bulamadık.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/">Ana Sayfa</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/blog">Blogu Keşfet</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 