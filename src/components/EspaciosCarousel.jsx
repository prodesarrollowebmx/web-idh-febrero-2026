"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function EspaciosCarousel({ imagenes, nombre }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imagenes.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative isolate w-full h-full min-h-0 overflow-hidden flex items-center justify-center group">
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        {imagenes.map((imagen, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={imagen}
              alt={`${nombre} - Imagen ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      {imagenes.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100"
            aria-label="Imagen anterior"
          >
            <svg
              className="w-5 h-5 text-zinc-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100"
            aria-label="Imagen siguiente"
          >
            <svg
              className="w-5 h-5 text-zinc-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Indicadores de página */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {imagenes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Imagen ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
