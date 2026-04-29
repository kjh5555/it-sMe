export interface Project {
  title: string;
  description: string;
  longDescription: string;
  badges: string[];
  featured?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  techStack: string[];
  timeline?: string;
  role?: string;
  challenges?: string[];
  achievements?: string[];
  imageUrl: string;
  images?: { url: string; caption: string }[];
}
