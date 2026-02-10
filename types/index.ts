export interface Basics {
  name: string;
  headline: string;
  about: string;
  location: string;
  email: string;
  phone?: string;
  line?: string;
  portfolio?: string;
  github?: string;
  socials: {
    linkedin: string;
  };
  keywords: string[];
  image?: string;
}

export interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  highlights: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Certification {
  id?: string;
  name: string;
  issuer: string;
  year: string;
  image?: string;
  pdf?: string;
  logo?: string;
  notes?: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  summary?: string;
  program?: string;
  location?: string;
  year?: string;
}

export interface LinkedInData {
  basics: Basics;
  experience: Experience[];
  skills: SkillGroup[];
  certifications: Certification[];
  education: Education[];
}

