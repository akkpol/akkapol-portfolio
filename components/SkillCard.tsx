import { motion } from 'framer-motion';
import { Skill } from '@/types';
import ProgressBar from './ProgressBar';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

function validateSkill(skill: Skill): boolean {
  if (!skill.name || skill.name.trim() === '') {
    console.warn('Skill missing name');
    return false;
  }
  if (typeof skill.level !== 'number' || isNaN(skill.level)) {
    console.warn('Skill level is not a valid number');
    return false;
  }
  return true;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  if (!validateSkill(skill)) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border p-5 bg-white/70 dark:bg-white/5"
    >
      <div className="flex justify-between text-sm font-medium">
        <span>{skill.name}</span>
        <span>{skill.level}%</span>
      </div>
      <div className="mt-3">
        <ProgressBar value={skill.level} />
      </div>
    </motion.div>
  );
}

