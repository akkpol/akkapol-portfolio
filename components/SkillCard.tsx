'use client';
import { motion } from 'framer-motion';
import { Skill } from '@/types';
import { Star } from 'lucide-react';

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

function getSkillLevel(level: number): string {
  if (level >= 90) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 60) return 'Intermediate';
  return 'Beginner';
}

function getStars(level: number): number {
  // Convert percentage to 5-star rating
  return Math.round((level / 100) * 5);
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  if (!validateSkill(skill)) {
    return null;
  }

  const starCount = getStars(skill.level);
  const levelText = getSkillLevel(skill.level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border p-5 bg-white/70 dark:bg-white/5 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium">
          {levelText}
        </span>
      </div>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < starCount 
              ? 'fill-yellow-400 text-yellow-400' 
              : 'fill-gray-200 dark:fill-gray-700 text-gray-200 dark:text-gray-700'
            }
          />
        ))}
      </div>
    </motion.div>
  );
}
