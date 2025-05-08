"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { AtSignIcon, GlobeIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [contactInfo, setContactInfo] = useState({
    email: "",
    website: "",
    location: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_settings')
        .select('*')
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setContactInfo({
          email: data[0].email || "",
          website: data[0].website || "",
          location: data[0].address || "",
          socialMedia: data[0].social_media || {
            facebook: "",
            instagram: "",
            twitter: "",
            linkedin: "",
          },
        });
      }
    } catch (error) {
      console.error('Veri çekme hatası:', error);
      toast.error('İletişim bilgileri yüklenirken bir hata oluştu');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }
        ]);

      if (error) throw error;

      toast.success("Mesajınız başarıyla gönderildi! En kısa sürede size geri döneceğim.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error('Gönderme hatası:', error);
      toast.error('Mesajınız gönderilirken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  İletişime Geçin
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Bir sorunuz veya işbirliği için bana ulaşmaktan çekinmeyin!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full py-12 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">İletişim Bilgileri</h2>
                <p className="text-muted-foreground">
                  İletişime geçmek için formu doldurun veya aşağıdaki kanallardan ulaşın.
                  En kısa sürede size geri döneceğim.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MailIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground">{contactInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <GlobeIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Website</h3>
                      <p className="text-sm text-muted-foreground">{contactInfo.website}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPinIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-sm text-muted-foreground">{contactInfo.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold tracking-tight">Bana Takip Et</h3>
                  <div className="flex space-x-4">
                    {contactInfo.socialMedia.facebook && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                          <span className="sr-only">Facebook</span>
                        </a>
                      </Button>
                    )}
                    {contactInfo.socialMedia.twitter && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={contactInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          </svg>
                          <span className="sr-only">Twitter</span>
                        </a>
                      </Button>
                    )}
                    {contactInfo.socialMedia.linkedin && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={contactInfo.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect width="4" height="12" x="2" y="9"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      </Button>
                    )}
                    {contactInfo.socialMedia.instagram && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                            <rect width="20" height="20" x="2" y="2" r="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                          </svg>
                          <span className="sr-only">Instagram</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Mesaj Gönder</CardTitle>
                  <CardDescription>
                    Formu doldurun ve en kısa sürede size geri döneceğim.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Adınız
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Adınız"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Konu
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Konu"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Mesaj
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Mesajınız"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 bg-muted/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Sıkça Sorulan Sorular
                </h2>
                <p className="text-muted-foreground">
                  İşbirliği ve danışmanlık hakkında sık sorulan soruların cevaplarını bulun.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Danışmanlık hizmeti sunuyor musunuz?</h3>
                  <p className="text-muted-foreground">
                    Evet, DevOps uygulaması, bulut migrasyonu, CI/CD pipeline optimizasyonu ve 
                    altyapı otomasyonu için danışmanlık hizmetleri sunuyorum. Özel ihtiyaçlarınız için 
                    benimle iletişime geçebilirsiniz.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Blogunuzda misafir yazar olabilir miyim?</h3>
                  <p className="text-muted-foreground">
                    DevOps topluluğuna değer katacak kaliteli misafir yazılarına açığım. 
                    Lütfen önerdiğiniz konu ve taslak ile birlikte bana bir mesaj gönderin.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Sorulara ne kadar sürede yanıt veriyorsunuz?</h3>
                  <p className="text-muted-foreground">
                    Genellikle iş günlerinde tüm sorulara 24-48 saat içinde yanıt veriyorum. 
                    Acil konular için lütfen mesaj konusunda belirtin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 