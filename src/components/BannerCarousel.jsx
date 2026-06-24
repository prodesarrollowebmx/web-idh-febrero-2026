"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function BannerCarousel({ bannerData }) {
  const [index, setIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const anuncios = bannerData.anuncios || [];
  const velocidad = bannerData.velocidadRotacion || 5000;

  useEffect(() => {
    if (!isAutoPlay || anuncios.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % anuncios.length);
    }, velocidad);

    return () => clearInterval(timer);
  }, [isAutoPlay, anuncios.length, velocidad]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setIndex((i) => (i - 1 + anuncios.length) % anuncios.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setIndex((i) => (i + 1) % anuncios.length);
  };

  const handleDotClick = (i) => {
    setIsAutoPlay(false);
    setIndex(i);
  };

  // Reactivar autoplay después de 10 segundos de inactividad
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAutoPlay(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [index]);

  if (!anuncios.length) return null;

  const anuncioActual = anuncios[index];
  const objectFit = anuncioActual.imagenConfig?.objectFit || "cover";
  const objectPositionMovil =
    anuncioActual.imagenConfig?.objectPositionMovil ||
    anuncioActual.imagenConfig?.objectPosition ||
    "center";
  const objectPositionDesktop =
    anuncioActual.imagenConfig?.objectPositionDesktop ||
    anuncioActual.imagenConfig?.objectPosition ||
    "center";
  const ctaUrl = anuncioActual.cta?.url || "";
  const esUrlExterna = /^https?:\/\//i.test(ctaUrl);

  return (
    <section className="max-w-6xl mx-auto px-4 pb-4">
      <div className="relative rounded-3xl bg-[#2c4a6b] px-6 py-6 md:px-10 md:py-7 text-white text-center overflow-hidden min-h-[680px] md:min-h-[760px] flex flex-col">
        {/* Imagen */}
        {anuncioActual.imagen && (
          <div className="relative w-full h-[340px] md:h-[380px] rounded-2xl overflow-hidden mb-6">
            <Image
              src={anuncioActual.imagen}
              alt={anuncioActual.imagenAlt || anuncioActual.titulo}
              fill
              className="object-cover md:hidden"
              style={{
                objectFit,
                objectPosition: objectPositionMovil,
              }}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <Image
              src={anuncioActual.imagen}
              alt={anuncioActual.imagenAlt || anuncioActual.titulo}
              fill
              className="object-cover hidden md:block"
              style={{
                objectFit,
                objectPosition: objectPositionDesktop,
              }}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        )}

        <div className="flex-1 flex flex-col">
          {/* Contenido */}
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            {anuncioActual.etiqueta}
          </p>
          <h2 className="font-display text-2xl md:text-3xl mt-3">
            {anuncioActual.titulo}
          </h2>
          <div className="mt-4 min-h-24 md:min-h-[120px]">
            {anuncioActual.contenido && (
              <p className="text-sm md:text-base text-white/85 max-w-3xl mx-auto leading-relaxed">
                {anuncioActual.contenido}
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="mt-auto pt-6 min-h-[72px] flex items-center justify-center">
            {anuncioActual.cta?.url && anuncioActual.cta?.texto && (
              <a
                href={ctaUrl}
                target={esUrlExterna ? "_blank" : undefined}
                rel={esUrlExterna ? "noopener noreferrer" : undefined}
                className="inline-flex rounded-full bg-white px-6 py-3 text-sm uppercase tracking-[0.2em] text-[#2c4a6b]"
              >
                {anuncioActual.cta.texto}
              </a>
            )}
          </div>
        </div>

        {/* Controles - Solo visible si hay múltiples anuncios */}
        {anuncios.length > 1 && (
          <>
            {/* Botones de navegación - Visible en móvil */}
            <div className="md:hidden flex items-center justify-between mt-6 gap-4">
              <button
                onClick={handlePrev}
                aria-label="Anuncio anterior"
                className="flex-1 bg-white/20 hover:bg-white/30 transition-colors p-3 rounded-full text-white"
              >
                ‹
              </button>
              <button
                onClick={handleNext}
                aria-label="Siguiente anuncio"
                className="flex-1 bg-white/20 hover:bg-white/30 transition-colors p-3 rounded-full text-white"
              >
                ›
              </button>
            </div>

            {/* Indicadores de puntos */}
            <div className="flex justify-center gap-2 mt-6">
              {anuncios.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  aria-label={`Ir al anuncio ${i + 1}`}
                  className={`transition-all ${
                    i === index
                      ? "bg-white w-3 h-3 rounded-full"
                      : "bg-white/40 hover:bg-white/60 w-2 h-2 rounded-full"
                  }`}
                />
              ))}
            </div>

            {/* Botones de navegación - Visible en desktop */}
            <div className="hidden md:flex absolute bottom-[30%] left-4 right-4 justify-between pointer-events-none z-10">
              <button
                onClick={handlePrev}
                aria-label="Anuncio anterior"
                className="pointer-events-auto bg-black/35 hover:bg-black/50 transition-colors p-3 rounded-full text-white text-2xl"
              >
                ‹
              </button>
              <button
                onClick={handleNext}
                aria-label="Siguiente anuncio"
                className="pointer-events-auto bg-black/35 hover:bg-black/50 transition-colors p-3 rounded-full text-white text-2xl"
              >
                ›
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
