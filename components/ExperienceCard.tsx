import { motion } from 'framer-motion';
import { Briefcase, CalendarDays } from 'lucide-react';
import { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

function validateExperience(exp: Experience): boolean {
  if (!exp.title || exp.title.trim() === '') {
    console.warn('Experience missing title at index', exp);
    return false;
  }
  if (!exp.company || exp.company.trim() === '') {
    console.warn('Experience missing company at index', exp);
    return false;
  }
  return true;
}

function formatDate(isoMonth: string): string {
  if (!isoMonth) return '';
  if (typeof isoMonth === 'string' && isoMonth.toLowerCase() === 'present') return 'Present';
  const parts = String(isoMonth).split('-');
  if (parts.length < 2) return String(isoMonth);
  const [y, m] = parts;
  const d = new Date(Number(y), Number(m) - 1 || 0, 1);
  return isNaN(d.getTime()) ? String(isoMonth) : d.toLocaleString('en-US', { month: 'short', year: 'numeric' });
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  if (!validateExperience(experience)) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="mb-6 border rounded-2xl p-5 bg-white/70 dark:bg-white/5"
    >
      <h3 className="font-semibold flex items-center gap-2">
        <Briefcase size={18} />
        {experience.title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300">{experience.company}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
        <CalendarDays size={14} /> {formatDate(experience.startDate)} — {formatDate(experience.endDate)} · {experience.location}
      </p>
      <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 dark:text-gray-200 space-y-1">
        {experience.highlights.map((h, idx) => (
          <li key={idx}>{h}</li>
        ))}
      </ul>
    </motion.div>
  );
}

