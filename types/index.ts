export interface Basics {
  name: string;
  headline: string;
  about: string;
  location: string;
  email: string;
  socials: {
    linkedin: string;
  };
  keywords: string[];
}

export interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  image?: string;
  pdf?: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface LinkedInData {
  basics: Basics;
  experience: Experience[];
  skills: Skill[];
  certifications: Certification[];
  education: Education[];
}

