"use client";
import { useState, useEffect } from "react";
import { DashboardSidebar } from "./sidebar";

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
      <DashboardSidebar open={open} setOpen={setOpen} />
      <main className="flex-1 p-8 transition-all duration-300">{children}</main>
    </div>
  );
} 