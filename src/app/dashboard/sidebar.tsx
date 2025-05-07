"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, LayoutDashboard, FileText, Terminal } from "lucide-react";

const menu = [
  { label: "Genel Bakış", href: "/dashboard", icon: LayoutDashboard },
  { label: "Bloglar", href: "/dashboard/blogs", icon: FileText },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function DashboardSidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed md:static left-0 top-0 z-40 min-h-screen bg-background border-r flex flex-col py-8 transition-all duration-300",
        open ? "w-64" : "w-20"
      )}
      style={{ boxShadow: "2px 0 8px 0 rgba(0,0,0,0.03)" }}
    >
      <div className={cn("flex items-center gap-2 mb-8 px-4 transition-all duration-300", open ? "justify-start" : "justify-center")}> 
        <Terminal className="h-6 w-6 text-primary shrink-0" />
        <span className={cn("text-primary text-2xl font-bold transition-all duration-300", open ? "opacity-100" : "opacity-0 w-0")}>
          Admin Paneli
        </span>
      </div>
      <nav className="flex flex-col gap-2 flex-1">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors group",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span
                className={cn(
                  "transition-all duration-300 whitespace-nowrap overflow-hidden",
                  open ? "opacity-100 ml-0 w-auto" : "opacity-0 ml-0 w-0"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="flex-1" />
      {/* Açma/kapama butonu sidebar'ın en altında ve her zaman erişilebilir */}
      <button
        className={cn(
          "w-10 h-10 flex items-center justify-center bg-background border rounded-full shadow mx-auto mb-4 transition-all duration-300",
          open ? "rotate-0" : "rotate-0"
        )}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Menüyü Kapat" : "Menüyü Aç"}
      >
        {open ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>
    </aside>
  );
} 