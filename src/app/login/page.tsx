"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAdmin", "true");
      router.push("/dashboard");
    } else {
      setError("Kullanıcı adı veya şifre hatalı.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <form
        onSubmit={handleSubmit}
        className="bg-background shadow-lg rounded-xl p-8 w-full max-w-sm flex flex-col gap-6 border"
      >
        <h1 className="text-2xl font-bold text-center">Yönetici Girişi</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-medium">Kullanıcı Adı</label>
          <Input
            id="username"
            autoComplete="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="admin"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">Şifre</label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="admin"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <Button type="submit" className="w-full">Giriş Yap</Button>
      </form>
    </div>
  );
} 