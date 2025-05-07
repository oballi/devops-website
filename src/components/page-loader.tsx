"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Tailwind ile minimal üstte ilerleyen bar
export function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let fadeTimeout: NodeJS.Timeout;
    setVisible(true);
    setLoading(true);
    setProgress(20);

    // Simüle edilen ilerleme (isteğe göre ayarlanabilir)
    timeout = setTimeout(() => setProgress(80), 300);
    const finish = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        // Fade out başlat
        fadeTimeout = setTimeout(() => {
          setVisible(false);
          setProgress(0);
        }, 700); // opacity geçiş süresiyle uyumlu (700ms)
      }, 300);
    }, 700);

    return () => {
      clearTimeout(timeout);
      clearTimeout(finish);
      clearTimeout(fadeTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      aria-label="Sayfa yükleniyor"
      role="status"
      className="fixed top-0 left-0 w-full z-50"
    >
      <div
        className={`h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 transition-all duration-700 transition-opacity ${loading ? "opacity-100" : "opacity-0"}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
} 