> Not: Bu proje Cursor ile oluşturulmuştur. Asıl amaç yeteneklerini görmek ve keşfetmek içindir. 

# DevOps Blog

DevOps mühendislerinin içgörülerini, öğreticilerini ve deneyimlerini paylaşabilecekleri modern, minimal bir blog sitesi. Next.js, TypeScript, Tailwind CSS ve Shadcn UI ile geliştirilmiştir.

## Özellikler

- **Modern Arayüz**: Karanlık/aydınlık mod desteği ile temiz ve minimal tasarım
- **Duyarlı Tasarım**: Tüm cihazlar için optimize edilmiş (mobil, tablet, masaüstü)
- **Blog Sistemi**: Kategoriler ve etiketlerle blog yazılarını görüntüleme ve düzenleme
- **Proje Vitrini**: DevOps projelerini ve katkılarını sergileme
- **İletişim Formu**: Ziyaretçilerin iletişime geçebilmesi
- **Hakkında Sayfası**: Profesyonel geçmiş ve uzmanlık alanlarını paylaşma
- **SEO Optimizasyonu**: Arama motoru görünürlüğü için meta etiketleri

## Teknoloji Yığını

- **Framework**: Next.js 15 (App Router)
- **Programlama Dili**: TypeScript
- **Stil**: Tailwind CSS
- **UI Bileşenleri**: Shadcn UI
- **İkonlar**: Lucide React
- **Tema**: Karanlık/aydınlık mod için Next Themes
- **Tarih Formatı**: date-fns

## Başlangıç

### Ön Koşullar

- Node.js 18.17 veya daha yeni
- npm veya yarn

### Kurulum

1. Depoyu klonlayın:

```bash
git clone https://github.com/kullaniciadi/devops-blog.git
cd devops-blog/frontend
```

2. Bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
```

3. Geliştirme sunucusunu başlatın:

```bash
npm run dev
# veya
yarn dev
```

4. Sonucu görmek için tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Proje Yapısı

```
frontend/
├── public/           # Statik dosyalar
├── src/
│   ├── app/          # App router sayfaları
│   │   ├── about/    # Hakkında sayfası
│   │   ├── blog/     # Blog sayfaları
│   │   ├── contact/  # İletişim sayfası
│   │   ├── projects/ # Projeler sayfası
│   ├── components/   # React bileşenleri
│   │   ├── ui/       # shadcn/ui'dan UI bileşenleri
│   │   ├── navbar.tsx # Navigasyon bileşeni
│   │   ├── footer.tsx # Alt bilgi bileşeni
│   ├── lib/          # Yardımcı fonksiyonlar
```

## Dağıtım

Bu proje sıfır yapılandırma ile Vercel'de dağıtılabilir:

```bash
npm run build
# veya
yarn build
```

## Gelecek Geliştirmeler

- **Backend Entegrasyonu**: Blog yazılarını veritabanında saklamak için backend ekleme
- **Kimlik Doğrulama**: Yönetici işlevselliği için kullanıcı kimlik doğrulama
- **Yorumlar**: Blog yazıları için yorum sistemi ekleme
- **Bülten**: Bülten aboneliği özelliği ekleme
- **Arama**: Blog yazıları için arama işlevselliği ekleme

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır - detaylar için LICENSE dosyasına bakın.

## Teşekkürler

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
