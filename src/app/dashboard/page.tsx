"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardHome() {
  // Mock istatistikler
  const stats = [
    { label: "Toplam Blog", value: 12 },
    { label: "Yayınlanan Blog", value: 10 },
    { label: "Taslak Blog", value: 2 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 