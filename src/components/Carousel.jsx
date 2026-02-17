"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const slides = ["/next.svg", "/vercel.svg", "/next.svg"];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center h-64 md:h-96">
        <Image src={slides[index]} alt={`slide-${index}`} width={720} height={360} className="object-contain" />
        <button
          aria-label="prev"
          onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full"
        >
          ‹
        </button>
        <button
          aria-label="next"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full"
        >
          ›
        </button>
      </div>
    </div>
  );
}
