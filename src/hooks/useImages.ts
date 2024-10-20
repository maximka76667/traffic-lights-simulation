import { useEffect, useState } from "react";

// Custom hook to load images
const useImages = (imageSources: string[]) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await Promise.all<HTMLImageElement>(
        imageSources.map((src) => {
          return new Promise((resolve) => {
            const img = new window.Image();
            img.src = src;
            img.onload = () => resolve(img);
          });
        })
      );
      setImages(loadedImages);
    };

    loadImages();
  }, [imageSources]);

  return images;
};

export default useImages;
