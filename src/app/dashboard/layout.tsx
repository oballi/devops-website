"use client";
import { useState, useEffect } from "react";
import { DashboardSidebar } from "./sidebar";
import { MenuIcon } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  // İlk yüklemede localStorage'dan oku
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("dashboardSidebarOpen");
      if (stored !== null) setOpen(stored === "true");
    }
  }, []);
  // Değiştikçe localStorage'a yaz
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboardSidebarOpen", open ? "true" : "false");
    }
  }, [open]);

  return (
    <div className="min-h-screen bg-muted flex flex-row">
      {/* Sadece sidebar kapalıyken açma butonu */}
      {!open && (
        <button
          className="fixed top-4 left-4 z-50 bg-background border rounded-full p-2 shadow md:top-6 md:left-6"
          onClick={() => setOpen(true)}
          aria-label="Menüyü Aç"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      )}
      <DashboardSidebar open={open} setOpen={setOpen} />
      <main className="flex-1 p-8 transition-all duration-300">{children}</main>
    </div>
  );
} 