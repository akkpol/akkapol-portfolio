import { LinkedInData, Basics, Experience, SkillGroup, Certification, Education } from '@/types';

export type ValidationResult = {
  success: boolean;
  errors?: string[];
};

function isString(val: any): val is string {
  return typeof val === 'string';
}

function isArray(val: any): val is any[] {
  return Array.isArray(val);
}

export function validateBasics(basics: Basics, errors: string[]): void {
  if (!basics) {
    errors.push('Basics data is missing');
    return;
  }
  if (!isString(basics.name) || basics.name.trim() === '') errors.push('Basics: name is required');
  if (!isString(basics.headline)) errors.push('Basics: headline must be a string');
  if (!isString(basics.about)) errors.push('Basics: about must be a string');
  if (!isString(basics.location)) errors.push('Basics: location must be a string');
  if (!isString(basics.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basics.email)) {
    errors.push('Basics: valid email is required');
  }

  if (basics.socials) {
    if (!isString(basics.socials.linkedin)) errors.push('Basics: socials.linkedin must be a string');
  } else {
    errors.push('Basics: socials is required');
  }

  if (!isArray(basics.keywords) || !basics.keywords.every(isString)) {
    errors.push('Basics: keywords must be an array of strings');
  }

  // Optional fields
  if (basics.phone !== undefined && !isString(basics.phone)) errors.push('Basics: phone must be a string');
  if (basics.line !== undefined && !isString(basics.line)) errors.push('Basics: line must be a string');
  if (basics.portfolio !== undefined && !isString(basics.portfolio)) errors.push('Basics: portfolio must be a string');
  if (basics.github !== undefined && !isString(basics.github)) errors.push('Basics: github must be a string');
  if (basics.image !== undefined && !isString(basics.image)) errors.push('Basics: image must be a string');
}

export function validateExperience(experience: Experience[], errors: string[]): void {
  if (!isArray(experience)) {
    errors.push('Experience must be an array');
    return;
  }
  experience.forEach((exp, index) => {
    if (!isString(exp.company) || exp.company.trim() === '') errors.push(`Experience[${index}]: company is required`);
    if (!isString(exp.title) || exp.title.trim() === '') errors.push(`Experience[${index}]: title is required`);
    if (!isString(exp.startDate)) errors.push(`Experience[${index}]: startDate must be a string`);
    if (!isString(exp.endDate)) errors.push(`Experience[${index}]: endDate must be a string`);
    if (!isString(exp.location)) errors.push(`Experience[${index}]: location must be a string`);
    if (!isArray(exp.highlights) || !exp.highlights.every(isString)) {
      errors.push(`Experience[${index}]: highlights must be an array of strings`);
    }
  });
}

export function validateSkills(skills: SkillGroup[], errors: string[]): void {
  if (!isArray(skills)) {
    errors.push('Skills must be an array');
    return;
  }
  skills.forEach((skillGroup, index) => {
    if (!isString(skillGroup.title) || skillGroup.title.trim() === '') {
      errors.push(`SkillGroup[${index}]: title is required`);
    }
    if (!isArray(skillGroup.items) || skillGroup.items.length === 0 || !skillGroup.items.every(isString)) {
      errors.push(`SkillGroup[${index}]: items must be a non-empty array of strings`);
    }
  });
}

export function validateCertifications(certifications: Certification[], errors: string[]): void {
  if (!isArray(certifications)) {
    errors.push('Certifications must be an array');
    return;
  }
  certifications.forEach((cert, index) => {
    if (!isString(cert.name) || cert.name.trim() === '') errors.push(`Certification[${index}]: name is required`);
    if (!isString(cert.issuer)) errors.push(`Certification[${index}]: issuer is required`);
    if (!isString(cert.year)) errors.push(`Certification[${index}]: year is required`);
    if (cert.image !== undefined && !isString(cert.image)) errors.push(`Certification[${index}]: image must be a string`);
    if (cert.pdf !== undefined && !isString(cert.pdf)) errors.push(`Certification[${index}]: pdf must be a string`);
    if (cert.logo !== undefined && !isString(cert.logo)) errors.push(`Certification[${index}]: logo must be a string`);
    if (cert.notes !== undefined && !isString(cert.notes)) errors.push(`Certification[${index}]: notes must be a string`);
  });
}

export function validateEducation(education: Education[], errors: string[]): void {
  if (!isArray(education)) {
    errors.push('Education must be an array');
    return;
  }
  education.forEach((edu, index) => {
    if (!isString(edu.institution) || edu.institution.trim() === '') errors.push(`Education[${index}]: institution is required`);
    if (edu.degree !== undefined && !isString(edu.degree)) errors.push(`Education[${index}]: degree must be a string`);
    if (!isString(edu.startDate)) errors.push(`Education[${index}]: startDate must be a string`);
    if (!isString(edu.endDate)) errors.push(`Education[${index}]: endDate must be a string`);
    if (edu.summary !== undefined && !isString(edu.summary)) errors.push(`Education[${index}]: summary must be a string`);
    if (edu.program !== undefined && !isString(edu.program)) errors.push(`Education[${index}]: program must be a string`);
    if (edu.location !== undefined && !isString(edu.location)) errors.push(`Education[${index}]: location must be a string`);
    if (edu.year !== undefined && !isString(edu.year)) errors.push(`Education[${index}]: year must be a string`);
  });
}

export function validateProfileData(data: LinkedInData): ValidationResult {
  const errors: string[] = [];
  try {
    if (!data) {
      return { success: false, errors: ['No data provided'] };
    }
    validateBasics(data.basics, errors);
    validateExperience(data.experience, errors);
    validateSkills(data.skills, errors);
    validateCertifications(data.certifications, errors);
    validateEducation(data.education, errors);

    return {
      success: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (error) {
    console.error('Error validating profile data:', error);
    return { success: false, errors: ['Internal validation error'] };
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
