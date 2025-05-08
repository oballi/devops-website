import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface SocialMedia {
  github?: string;
  twitter?: string;
  linkedin?: string;
}

interface Expertise {
  infrastructure: string[];
  cicd: string[];
  monitoring: string[];
  development: string[];
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Certification {
  title: string;
  issuer: string;
}

interface AboutData {
  avatar_url: string;
  title: string;
  subtitle: string;
  bio: string;
  social_media: SocialMedia;
  expertise: Expertise;
  experience: Experience[];
  certifications: Certification[];
}

export const metadata = {
  title: "Hakkımda | DevOps Blog",
  description: "Bu blogun arkasındaki DevOps mühendisi hakkında daha fazla bilgi edinin.",
};

async function getAboutData(): Promise<AboutData | null> {
  const { data, error } = await supabase
    .from('about_settings')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Veri çekme hatası:', error);
    return null;
  }

  return data?.[0] || null;
}

export default async function AboutPage() {
  const aboutData = await getAboutData();

  if (!aboutData) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Veriler yüklenirken bir hata oluştu.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={aboutData.avatar_url || "/avatar-placeholder.png"} alt="Profile" />
                <AvatarFallback>DB</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {aboutData.title || "Hakkımda"}
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {aboutData.subtitle || "DevOps Mühendisi & Teknik Yazar"}
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                  {aboutData.social_media?.github && (
                    <Link href={aboutData.social_media.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80">
                      <GithubIcon className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  )}
                  {aboutData.social_media?.twitter && (
                    <Link href={aboutData.social_media.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80">
                      <TwitterIcon className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                  )}
                  {aboutData.social_media?.linkedin && (
                    <Link href={aboutData.social_media.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80">
                      <LinkedinIcon className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Hikayem</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {aboutData.bio || "Henüz biyografi eklenmemiş."}
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Uzmanlık Alanları</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Altyapı & Bulut</h3>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        {aboutData.expertise?.infrastructure?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">CI/CD & Otomasyon</h3>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        {aboutData.expertise?.cicd?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">İzleme & Gözlemleme</h3>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        {aboutData.expertise?.monitoring?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Development</h3>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        {aboutData.expertise?.development?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">İş Deneyimi</h2>
                <div className="space-y-6">
                  {aboutData.experience?.map((exp, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <p className="text-muted-foreground">{exp.company} | {exp.period}</p>
                      <p className="text-muted-foreground whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Sertifikalar</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {aboutData.certifications?.map((cert, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-bold">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                  ))}
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