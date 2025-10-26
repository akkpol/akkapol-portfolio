'use client';
import { useState } from 'react';

interface ProfileImageProps {
  src: string;
  alt: string;
}

export default function ProfileImage({ src, alt }: ProfileImageProps) {
  const [error, setError] = useState(false);

  const handleError = () => {
    console.error('Failed to load profile image:', src);
    setError(true);
  };

  if (error) {
    return (
      <div className="w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400 text-sm">Profile Image</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      className="w-full aspect-square object-cover rounded-xl"
      loading="eager"
      decoding="sync"
    />
  );
}

