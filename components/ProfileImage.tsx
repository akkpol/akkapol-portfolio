'use client';
import { useState } from 'react';

interface ProfileImageProps {
  src: string;
  alt: string;
}

export default function ProfileImage({ src, alt }: ProfileImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    console.error('Failed to load profile image:', src);
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  if (error) {
    return (
      <div className="w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400 text-sm">Profile Image</span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square">
      {loading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
      )}
      <img
        src={src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className="w-full h-full object-cover rounded-xl"
        loading="lazy"
      />
    </div>
  );
}

