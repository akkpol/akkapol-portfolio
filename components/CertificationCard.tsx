'use client';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
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
          <div className={`sm:w-40 sm:h-40 w-full ${certification.pdf ? 'h-48' : 'h-40'} relative bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center overflow-hidden`}>
            {certification.pdf ? (
              <div className="w-full h-full relative group">
                <iframe
                  src={`${certification.pdf}#view=FitH`}
                  className="w-full h-full border-0"
                  title={certification.name}
                  loading="lazy"
                />
                <a 
                  href={certification.pdf} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors group-hover:opacity-100 opacity-0"
                  title="Click to open PDF in new tab"
                >
                  <div className="bg-white/90 dark:bg-gray-900/90 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 shadow-lg">
                    <ExternalLink size={14} />
                    <span>Open PDF</span>
                  </div>
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
            {certification.logo ? (
              <div className="flex-shrink-0">
                <img 
                  src={certification.logo} 
                  alt={certification.issuer}
                  className="w-12 h-12 object-contain"
                  loading="lazy"
                />
              </div>
            ) : (
              <Award size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            )}
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
          {certification.logo ? (
            <div className="flex-shrink-0">
              <img 
                src={certification.logo} 
                alt={certification.issuer}
                className="w-10 h-10 object-contain"
                loading="lazy"
              />
            </div>
          ) : (
            <Award size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
          )}
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
