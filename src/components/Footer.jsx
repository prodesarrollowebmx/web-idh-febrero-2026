"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import contactoData from "../../secciones/home/contacto.json";

function getSedePreviewImageById(sedeId) {
  const previewsBySede = {
    centro: "/maps/centro.svg",
    vergara: "/maps/vergara.svg",
  };

  return previewsBySede[sedeId] || "/maps/centro.svg";
}

function getSedeLabelById(sedeId, fallbackName = "") {
  const labelsBySede = {
    centro: "Sede Compañía",
    vergara: "Sede Vergara",
  };

  return labelsBySede[sedeId] || fallbackName || "Sede";
}

function SocialIcon({ type }) {
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="currentColor"
          d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6h1.7V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H8v3h2.3v8h3.2z"
        />
      </svg>
    );
  }

  if (type === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="currentColor"
          d="M23 12c0 2.1-.2 4.2-.6 5.2-.2.8-.8 1.4-1.6 1.6-1 .3-4.8.5-8.8.5s-7.8-.2-8.8-.5c-.8-.2-1.4-.8-1.6-1.6C1.2 16.2 1 14.1 1 12s.2-4.2.6-5.2c.2-.8.8-1.4 1.6-1.6C4.2 4.9 8 4.7 12 4.7s7.8.2 8.8.5c.8.2 1.4.8 1.6 1.6.4 1 .6 3.1.6 5.2zm-13.5 3.5 6-3.5-6-3.5v7z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm0 1.9A3.9 3.9 0 0 0 3.9 7.8v8.4a3.9 3.9 0 0 0 3.9 3.9h8.4a3.9 3.9 0 0 0 3.9-3.9V7.8a3.9 3.9 0 0 0-3.9-3.9H7.8zm8.9 1.4a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.9a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2z"
      />
    </svg>
  );
}

export default function Footer() {
  const sedes = useMemo(() => contactoData.sedes || [], []);
  const footerSedes = useMemo(() => sedes.filter((sede) => sede.id !== "online"), [sedes]);
  const redes = contactoData.informacion?.redes || {};
  const redesItems = [
    {
      id: "instagram-vergara",
      label: "Instagram Vergara",
      shortLabel: "IG Vergara",
      href: redes.instagramVergara,
      type: "instagram",
    },
    {
      id: "instagram-compania",
      label: "Instagram Compañía",
      shortLabel: "IG Compañía",
      href: redes.instagramCompania,
      type: "instagram",
    },
    {
      id: "facebook",
      label: "Facebook",
      shortLabel: "Facebook",
      href: redes.facebook,
      type: "facebook",
    },
    {
      id: "youtube",
      label: "YouTube",
      shortLabel: "YouTube",
      href: redes.youtube,
      type: "youtube",
    },
  ];
  const [selectedSedeId, setSelectedSedeId] = useState(footerSedes[0]?.id || "");
  const selectedSede = useMemo(
    () => footerSedes.find((sede) => sede.id === selectedSedeId) || footerSedes[0],
    [footerSedes, selectedSedeId]
  );
  const selectedSedeMapPreviewSrc = useMemo(
    () => getSedePreviewImageById(selectedSede?.id),
    [selectedSede]
  );
  const selectedSedeLabel = useMemo(
    () => getSedeLabelById(selectedSede?.id, selectedSede?.nombre),
    [selectedSede]
  );
  const selectedSedeGoogleMapsLink = selectedSede?.mapaUrl || "";

  return (
    <footer className="w-full mt-16 border-t border-white/60 bg-white/80">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="font-display text-2xl">IDH Yoga</div>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Espacios para practicar, estudiar y compartir yoga con un enfoque humano,
            sensible y profundo.
          </p>
          <div className="text-sm text-zinc-600">
            {contactoData.informacion.whatsapp}
            <br />
            {contactoData.informacion.email}
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">Redes sociales</div>
            <div className="flex flex-wrap gap-2">
              {redesItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-200 px-3 py-2 text-zinc-600 hover:text-zinc-900 hover:bg-sky-50 transition-colors"
                >
                  <SocialIcon type={item.type} />
                  <span className="text-[11px] uppercase tracking-[0.18em]">{item.shortLabel}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">
            Mapa del sitio
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-zinc-900">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/clases" className="hover:text-zinc-900">
                Clases
              </Link>
            </li>
            <li>
              <Link href="/talleres" className="hover:text-zinc-900">
                Talleres
              </Link>
            </li>
            <li>
              <Link href="/diplomado" className="hover:text-zinc-900">
                Diplomado
              </Link>
            </li>
            <li>
              <Link href="/asesorias" className="hover:text-zinc-900">
                Asesorías
              </Link>
            </li>
            <li>
              <Link href="/espacios" className="hover:text-zinc-900">
                Espacios
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-zinc-900">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">
            Sedes
          </h4>
          <div className="space-y-4">
            {footerSedes.map((sede) => (
              <div key={sede.id} className="text-sm cursor-pointer">
                <div className="font-semibold text-zinc-900">
                  {getSedeLabelById(sede.id, sede.nombre)}
                </div>
                <p className="text-zinc-600 text-xs mt-1">{sede.direccion}</p>
                <p className="text-zinc-600 text-xs">{sede.ciudad}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">
            Como llegar
          </h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {footerSedes.map((sede) => (
              <button
                key={sede.id}
                type="button"
                onClick={() => setSelectedSedeId(sede.id)}
                className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] transition-colors cursor-pointer ${
                  selectedSedeId === sede.id
                    ? "bg-[#5b7fa8] text-white"
                    : "border border-sky-200 text-zinc-600 hover:bg-sky-50 hover:text-zinc-900"
                }`}
              >
                {getSedeLabelById(sede.id, sede.nombre)}
              </button>
            ))}
          </div>
          <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/70">
            {selectedSedeMapPreviewSrc && selectedSedeGoogleMapsLink ? (
              <a
                href={selectedSedeGoogleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full w-full relative"
                aria-label={`Abrir ${selectedSedeLabel} en Google Maps`}
              >
                <Image
                  src={selectedSedeMapPreviewSrc}
                  alt={`Mapa de ${selectedSedeLabel}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute top-2 left-2 rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                  {selectedSedeLabel}
                </div>
                <div className="absolute bottom-2 right-2 rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                  Abrir en Google Maps
                </div>
              </a>
            ) : selectedSedeGoogleMapsLink ? (
              <a
                href={selectedSedeGoogleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full w-full flex items-center justify-center bg-zinc-50 text-zinc-500 text-xs uppercase tracking-[0.2em] hover:text-zinc-700"
              >
                Abrir en Google Maps
              </a>
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-zinc-50 text-zinc-500 text-xs uppercase tracking-[0.2em]">
                Mapa no disponible
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-center pb-6 text-xs uppercase tracking-[0.2em] text-zinc-500">
        © {new Date().getFullYear()} IDH Yoga. Todos los derechos reservados.
      </div>
    </footer>
  );
}
