"use client";

import { useState, useEffect } from "react";

export default function TestimoniosCarousel({ testimonios }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonios.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonios.length, isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonios.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonios.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative testimonios-shell">
      <div className="overflow-hidden rounded-3xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonios.map((testimonio) => (
            <div
              key={testimonio.id}
              className="w-full shrink-0"
            >
              <article className="testimonios-card bg-transparent border-0 shadow-none rounded-3xl p-8 md:p-10 space-y-2 flex flex-col">
                <p className="text-base md:text-lg text-zinc-600 leading-relaxed text-center">
                  &ldquo;{testimonio.comentario}&rdquo;
                </p>
                <div className="text-sm uppercase tracking-[0.2em] text-zinc-500 mt-1 text-center">
                  {testimonio.nombre}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Controles de navegación */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={goToPrevious}
          className="p-3 rounded-full border border-sky-300 hover:bg-sky-50 transition-colors"
          aria-label="Testimonio anterior"
        >
          <svg
            className="w-5 h-5 text-blue-600"
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

        <div className="flex gap-2">
          {testimonios.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-blue-700"
                  : "w-2 bg-sky-300 hover:bg-sky-400"
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-3 rounded-full border border-sky-300 hover:bg-sky-50 transition-colors"
          aria-label="Testimonio siguiente"
        >
          <svg
            className="w-5 h-5 text-blue-600"
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
      </div>
    </div>
  );
}
