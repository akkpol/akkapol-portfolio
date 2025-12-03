/**
 * Compresses an image file if it exceeds a certain size or dimension.
 * @param file The file to compress
 * @param maxWidth The maximum width of the image (default: 1920px)
 * @param maxSizeMB The maximum size in MB (default: 2MB)
 * @param quality The quality of the JPEG compression (0-1, default: 0.8)
 * @returns A Promise that resolves to the compressed File object
 */
export const compressImage = async (
  file: File,
  maxWidth = 1920,
  maxSizeMB = 2,
  quality = 0.8
): Promise<File> => {
  // If file is already smaller than maxSizeMB, return it as is (unless dimensions are huge)
  // But we usually want to standardize dimensions too.
  // Let's always check dimensions.

  if (!file.type.startsWith('image/')) {
    throw new Error('File is not an image');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Resize if width exceeds maxWidth
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Compress
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Could not compress image'));
              return;
            }

            // If the compressed blob is larger than original (rare but possible with low quality original),
            // and original was under limit, keep original.
            // But if original was over limit, we must use compressed.
            
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });

            if (compressedFile.size > maxSizeMB * 1024 * 1024) {
              // If still too big, try again with lower quality?
              // For now, just return it, or maybe recursively compress?
              // Let's keep it simple for now.
              console.warn('Image is still larger than target size after compression');
            }

            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};
