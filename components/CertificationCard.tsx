import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { Certification } from '@/types';

interface CertificationCardProps {
  certification: Certification;
  index: number;
}

export default function CertificationCard({ certification, index }: CertificationCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="flex items-center gap-3 border rounded-2xl p-4 bg-white/70 dark:bg-white/5 mb-3"
    >
      <Award size={18} />
      <div>
        <p className="font-medium">{certification.name}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {certification.issuer} · {certification.year}
        </p>
      </div>
    </motion.div>
  );
}

