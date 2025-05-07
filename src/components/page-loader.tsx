"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Sade ve akıcı loading bar
export function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    setLoading(true);
    setProgress(20);

    timeout = setTimeout(() => setProgress(80), 300);
    const finish = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
    }, 700);

    return () => {
      clearTimeout(timeout);
      clearTimeout(finish);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      aria-label="Sayfa yükleniyor"
      role="status"
      className="fixed top-0 left-0 w-full z-50"
    >
      <div
        className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
} 