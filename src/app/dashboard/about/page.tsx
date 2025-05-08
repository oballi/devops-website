"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    avatarUrl: "",
    title: "",
    subtitle: "",
    bio: "",
    socialMedia: {
      github: "",
      twitter: "",
      linkedin: "",
    },
    expertise: {
      infrastructure: [] as string[],
      cicd: [] as string[],
      monitoring: [] as string[],
      development: [] as string[],
    },
    experience: [] as Array<{
      title: string;
      company: string;
      period: string;
      description: string;
    }>,
    certifications: [] as Array<{
      title: string;
      issuer: string;
    }>,
  });

  useEffect(() => {
    fetchAboutSettings();
  }, []);

  const fetchAboutSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('about_settings')
        .select('*')
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setFormData({
          avatarUrl: data[0].avatar_url || "",
          title: data[0].title || "",
          subtitle: data[0].subtitle || "",
          bio: data[0].bio || "",
          socialMedia: data[0].social_media || {
            github: "",
            twitter: "",
            linkedin: "",
          },
          expertise: data[0].expertise || {
            infrastructure: [],
            cicd: [],
            monitoring: [],
            development: [],
          },
          experience: data[0].experience || [],
          certifications: data[0].certifications || [],
        });
      }
    } catch (error) {
      console.error('Veri çekme hatası:', error);
      toast.error('Hakkımda bilgileri yüklenirken bir hata oluştu');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Önce mevcut kaydı kontrol et
      const { data: existingData } = await supabase
        .from('about_settings')
        .select('id')
        .limit(1);

      let result;
      
      if (existingData && existingData.length > 0) {
        // Güncelleme
        result = await supabase
          .from('about_settings')
          .update({
            avatar_url: formData.avatarUrl,
            title: formData.title,
            subtitle: formData.subtitle,
            bio: formData.bio,
            social_media: formData.socialMedia,
            expertise: formData.expertise,
            experience: formData.experience,
            certifications: formData.certifications,
          })
          .eq('id', existingData[0].id);
      } else {
        // Yeni kayıt
        result = await supabase
          .from('about_settings')
          .insert([{
            avatar_url: formData.avatarUrl,
            title: formData.title,
            subtitle: formData.subtitle,
            bio: formData.bio,
            social_media: formData.socialMedia,
            expertise: formData.expertise,
            experience: formData.experience,
            certifications: formData.certifications,
          }]);
      }

      if (result.error) throw result.error;

      toast.success("Değişiklikler başarıyla kaydedildi");
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      toast.error("Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpertiseChange = (category: string, value: string) => {
    const items = value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      expertise: {
        ...prev.expertise,
        [category]: items,
      },
    }));
  };

  const handleExperienceAdd = () => {
    setFormData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { title: '', company: '', period: '', description: '' }
      ],
    }));
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleExperienceRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleCertificationAdd = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { title: '', issuer: '' }
      ],
    }));
  };

  const handleCertificationChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const handleCertificationRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hakkımda</h1>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profil Bilgileri</CardTitle>
            <CardDescription>
              Profil fotoğrafı ve temel bilgilerinizi düzenleyin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="avatarUrl">Profil Fotoğrafı URL</Label>
                <Input
                  id="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Başlık</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="DevOps Mühendisi & Teknik Yazar"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Alt Başlık</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="DevOps Mühendisi & Teknik Yazar"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biyografi</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Kendiniz hakkında kısa bir açıklama yazın"
                  rows={5}
                />
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sosyal Medya</CardTitle>
            <CardDescription>
              Sosyal medya hesaplarınızı güncelleyin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={formData.socialMedia.github}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialMedia: { ...formData.socialMedia, github: e.target.value }
                    })}
                    placeholder="github.com/kullaniciadi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={formData.socialMedia.twitter}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialMedia: { ...formData.socialMedia, twitter: e.target.value }
                    })}
                    placeholder="twitter.com/kullaniciadi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.socialMedia.linkedin}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialMedia: { ...formData.socialMedia, linkedin: e.target.value }
                    })}
                    placeholder="linkedin.com/in/kullaniciadi"
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uzmanlık Alanları</CardTitle>
            <CardDescription>
              Uzmanlık alanlarınızı virgülle ayırarak girin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="infrastructure">Altyapı & Bulut</Label>
                  <Input
                    id="infrastructure"
                    value={formData.expertise.infrastructure.join(', ')}
                    onChange={(e) => handleExpertiseChange('infrastructure', e.target.value)}
                    placeholder="AWS, Azure, GCP, Terraform, CloudFormation"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cicd">CI/CD & Otomasyon</Label>
                  <Input
                    id="cicd"
                    value={formData.expertise.cicd.join(', ')}
                    onChange={(e) => handleExpertiseChange('cicd', e.target.value)}
                    placeholder="Jenkins, GitHub Actions, GitLab CI, CircleCI"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monitoring">İzleme & Gözlemleme</Label>
                  <Input
                    id="monitoring"
                    value={formData.expertise.monitoring.join(', ')}
                    onChange={(e) => handleExpertiseChange('monitoring', e.target.value)}
                    placeholder="Prometheus, Grafana, ELK Stack, Datadog"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="development">Development</Label>
                  <Input
                    id="development"
                    value={formData.expertise.development.join(', ')}
                    onChange={(e) => handleExpertiseChange('development', e.target.value)}
                    placeholder="Go, Python, JavaScript, TypeScript, Node.js"
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>İş Deneyimi</CardTitle>
            <CardDescription>
              İş deneyimlerinizi ekleyin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.experience.map((exp, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">Deneyim #{index + 1}</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleExperienceRemove(index)}
                    >
                      Sil
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Pozisyon</Label>
                      <Input
                        value={exp.title}
                        onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                        placeholder="Senior DevOps Engineer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Şirket</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        placeholder="TechCorp Inc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Dönem</Label>
                      <Input
                        value={exp.period}
                        onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                        placeholder="2020 - Present"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Açıklama</Label>
                      <Textarea
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                        placeholder="İş tanımı ve sorumluluklar"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={handleExperienceAdd} variant="outline">
                Deneyim Ekle
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sertifikalar</CardTitle>
            <CardDescription>
              Sertifikalarınızı ekleyin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.certifications.map((cert, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">Sertifika #{index + 1}</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCertificationRemove(index)}
                    >
                      Sil
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Sertifika Adı</Label>
                      <Input
                        value={cert.title}
                        onChange={(e) => handleCertificationChange(index, 'title', e.target.value)}
                        placeholder="AWS Sertifikalı DevOps Mühendisi"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Veren Kurum</Label>
                      <Input
                        value={cert.issuer}
                        onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                        placeholder="Amazon Web Services"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={handleCertificationAdd} variant="outline">
                Sertifika Ekle
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 