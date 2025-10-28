'use client';
import { motion } from 'framer-motion';
import { Award, FileText, ExternalLink } from 'lucide-react';
import { Certification } from '@/types';

interface CertificationCardProps {
  certification: Certification;
  index: number;
}

function validateCertification(cert: Certification): boolean {
  if (!cert.name || cert.name.trim() === '') {
    console.warn('Certification missing name');
    return false;
  }
  return true;
}

export default function CertificationCard({ certification, index }: CertificationCardProps) {
  if (!validateCertification(certification)) {
    return null;
  }

  const hasMedia = certification.image || certification.pdf;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 120 }}
      className={`border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 mb-4 hover:shadow-lg transition-all overflow-hidden ${hasMedia ? 'p-0' : 'p-4'}`}
    >
      {hasMedia ? (
        <div className="flex flex-col sm:flex-row">
          <div className={`sm:w-40 sm:h-40 w-full ${certification.pdf ? 'h-40' : 'h-48'} relative bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center`}>
            {certification.pdf ? (
              <div className="text-center p-4">
                <FileText size={48} className="text-gray-400 dark:text-gray-600 mx-auto mb-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF Certificate</p>
                <a 
                  href={certification.pdf} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View PDF <ExternalLink size={12} />
                </a>
              </div>
            ) : certification.image ? (
              <img
                src={certification.image}
                alt={certification.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : null}
          </div>
          <div className="flex-1 p-4 sm:p-5 flex items-start gap-3">
            <Award size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-base mb-1">{certification.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {certification.issuer}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Issued {certification.year}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Award size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <div>
            <p className="font-medium">{certification.name}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {certification.issuer} · {certification.year}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
