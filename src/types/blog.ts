export interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
  readingTime: string;
  slug: string;
  author: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface BlogPostFormData {
  title: string;
  description: string;
  content: string;
  tags: string[];
  slug: string;
  author: string;
  status: 'draft' | 'published';
} 