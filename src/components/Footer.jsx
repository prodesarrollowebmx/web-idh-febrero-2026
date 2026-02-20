"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
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

export default function Footer() {
  const sedes = useMemo(() => contactoData.sedes || [], []);
  const [selectedSedeId, setSelectedSedeId] = useState(sedes[0]?.id || "");
  const selectedSede = useMemo(
    () => sedes.find((sede) => sede.id === selectedSedeId) || sedes[0],
    [sedes, selectedSedeId]
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
            {contactoData.sedes.map((sede) => (
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
            {sedes.map((sede) => (
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
                <img
                  src={selectedSedeMapPreviewSrc}
                  alt={`Mapa de ${selectedSedeLabel}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
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
