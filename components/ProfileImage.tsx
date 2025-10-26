'use client';
import { useState } from 'react';

interface ProfileImageProps {
  src: string;
  alt: string;
}

export default function ProfileImage({ src, alt }: ProfileImageProps) {
  const [error, setError] = useState(false);
  
  return (
    <img
      src={error ? 'https://via.placeholder.com/560x560?text=Profile' : src}
      alt={alt}
      onError={() => setError(true)}
      className="w-full aspect-square object-cover rounded-xl"
    />
  );
}

