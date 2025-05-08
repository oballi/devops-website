import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Boşlukları tire ile değiştir
    .replace(/[^\w\-]+/g, "") // Alfanumerik olmayan karakterleri kaldır
    .replace(/\-\-+/g, "-") // Birden fazla tireyi tek tireye dönüştür
    .replace(/^-+/, "") // Baştaki tireleri kaldır
    .replace(/-+$/, "") // Sondaki tireleri kaldır
}
