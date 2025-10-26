import { LinkedInData, Basics, Experience, Skill, Certification } from '@/types';

export function validateBasics(basics: Basics): boolean {
  if (!basics.name || basics.name.trim() === '') {
    console.error('Error: Name is required');
    return false;
  }
  if (!basics.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basics.email)) {
    console.error('Error: Valid email is required');
    return false;
  }
  if (!basics.headline || basics.headline.trim() === '') {
    console.error('Error: Headline is required');
    return false;
  }
  return true;
}

export function validateExperience(experience: Experience[]): boolean {
  return experience.every((exp, index) => {
    if (!exp.title || exp.title.trim() === '') {
      console.error(`Error: Experience ${index} title is required`);
      return false;
    }
    if (!exp.company || exp.company.trim() === '') {
      console.error(`Error: Experience ${index} company is required`);
      return false;
    }
    return true;
  });
}

export function validateSkills(skills: Skill[]): boolean {
  return skills.every((skill, index) => {
    if (!skill.name || skill.name.trim() === '') {
      console.error(`Error: Skill ${index} name is required`);
      return false;
    }
    if (typeof skill.level !== 'number' || skill.level < 0 || skill.level > 100) {
      console.error(`Error: Skill ${index} level must be between 0 and 100`);
      return false;
    }
    return true;
  });
}

export function validateCertifications(certifications: Certification[]): boolean {
  return certifications.every((cert, index) => {
    if (!cert.name || cert.name.trim() === '') {
      console.error(`Error: Certification ${index} name is required`);
      return false;
    }
    return true;
  });
}

export function validateProfileData(data: LinkedInData): boolean {
  try {
    if (!validateBasics(data.basics)) return false;
    if (!validateExperience(data.experience)) return false;
    if (!validateSkills(data.skills)) return false;
    if (!validateCertifications(data.certifications)) return false;
    return true;
  } catch (error) {
    console.error('Error validating profile data:', error);
    return false;
  }
}

export function safeGet<T>(func: () => T, fallback: T): T {
  try {
    return func();
  } catch (error) {
    console.error('Error in safeGet:', error);
    return fallback;
  }
}

