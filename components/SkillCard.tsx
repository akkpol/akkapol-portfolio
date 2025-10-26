import { motion } from 'framer-motion';
import { Skill } from '@/types';
import ProgressBar from './ProgressBar';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
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

