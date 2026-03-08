"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const MONTHS_BY_NAME = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  setiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

function normalizeSpanishText(value = "") {
  return value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function inferActividadRealizadaByFecha(fecha) {
  const normalizedFecha = normalizeSpanishText(fecha);
  const match = normalizedFecha.match(/(\d{1,2})\s+de\s+([a-z]+)(?:\s+de\s+(\d{4}))?/);

  if (!match) {
    return false;
  }

  const day = Number.parseInt(match[1], 10);
  const month = MONTHS_BY_NAME[match[2]];
  const year = match[3] ? Number.parseInt(match[3], 10) : new Date().getFullYear();

  if (!Number.isInteger(day) || month === undefined || !Number.isInteger(year)) {
    return false;
  }

  const actividadDate = new Date(year, month, day);
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return actividadDate < todayDate;
}

function parseSpanishDate(fecha) {
  const normalizedFecha = normalizeSpanishText(fecha);
  const match = normalizedFecha.match(/(\d{1,2})\s+de\s+([a-z]+)(?:\s+de\s+(\d{4}))?/);

  if (!match) {
    return null;
  }

  const day = Number.parseInt(match[1], 10);
  const month = MONTHS_BY_NAME[match[2]];
  const year = match[3] ? Number.parseInt(match[3], 10) : new Date().getFullYear();

  if (!Number.isInteger(day) || month === undefined || !Number.isInteger(year)) {
    return null;
  }

  const parsedDate = new Date(year, month, day);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

export default function TalleresSearcher({ talleres }) {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("buscar") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredTalleres = talleres.filter((taller) => {
    if (!normalizedSearch) {
      return true;
    }

    const fieldsToMatch = [
      taller.titulo,
      taller.descripcion,
      taller.fecha,
      taller.duracion,
      taller.instructor,
      taller.hora,
      taller.nivel,
      taller.modalidad,
    ];

    const matchFields = fieldsToMatch.some(
      (value) => value && value.toLowerCase().includes(normalizedSearch)
    );

    const matchSede = (taller.sedes || []).some((sede) =>
      sede.toLowerCase().includes(normalizedSearch)
    );

    return matchFields || matchSede;
  });

  const sortedTalleres = [...filteredTalleres].sort((a, b) => {
    const dateA = parseSpanishDate(a.fecha);
    const dateB = parseSpanishDate(b.fecha);

    if (!dateA && !dateB) {
      return 0;
    }

    if (!dateA) {
      return 1;
    }

    if (!dateB) {
      return -1;
    }

    return dateB.getTime() - dateA.getTime();
  });

  const isActividadGratuita = (taller) => {
    if (typeof taller.gratuita === "boolean") {
      return taller.gratuita;
    }

    return (taller.precio || "").toLowerCase().includes("gratis");
  };

  const isActividadRealizada = (taller) => {
    return inferActividadRealizadaByFecha(taller.fecha);
  };

  return (
    <div className="space-y-8">
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/70 p-6 shadow-lg">
        <input
          type="text"
          placeholder="Buscar ej: marzo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <p className="mt-2 text-xs text-zinc-500">
          Busca por taller, fecha, hora, instructor o sede.
        </p>
        {searchTerm && (
          <p className="text-sm text-zinc-500 mt-2">
            {filteredTalleres.length} taller{filteredTalleres.length !== 1 ? "es" : ""} encontrado{filteredTalleres.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {filteredTalleres.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {sortedTalleres.map((taller) => {
            const actividadRealizada = isActividadRealizada(taller);

            return (
            <article
              key={taller.id}
              className={`rounded-3xl overflow-hidden ${
                actividadRealizada
                  ? "border border-zinc-200 bg-zinc-100/80"
                  : "glass-card"
              }`}
            >
              <div className="relative w-full h-48">
                <Image
                  src={taller.imagen}
                  alt={taller.titulo}
                  fill
                  className={`object-cover ${actividadRealizada ? "grayscale opacity-70" : ""}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  <span>{taller.fecha}</span>
                  {actividadRealizada && (
                    <span className="inline-flex rounded-full border border-zinc-300 bg-zinc-200 px-2 py-1 text-[10px] font-semibold tracking-[0.15em] text-zinc-700">
                      Actividad realizada
                    </span>
                  )}
                </div>
                {isActividadGratuita(taller) && (
                  <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-zinc-700">
                    Actividad gratuita
                  </div>
                )}
                <h2 className="font-display text-2xl text-zinc-900">{taller.titulo}</h2>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {taller.descripcion}
                </p>
                <div className="pt-4 space-y-3 text-xs text-zinc-500">
                  <div>Duración: {taller.duracion}</div>
                  <div>Instructor: {taller.instructor}</div>
                  <div>
                    Sede: {(taller.sedes || []).length > 0 ? taller.sedes.join(" • ") : "Por confirmar"}
                  </div>
                  {isActividadGratuita(taller) && <div>Actividad gratuita</div>}
                  {!actividadRealizada && (
                    <>
                      <div className="pt-2 flex gap-2">
                        <Link
                          href={`/talleres/${taller.id}`}
                          className="flex-1 flex items-center justify-center rounded-full border border-sky-300 px-3 py-2 text-xs uppercase tracking-[0.2em] text-zinc-700 hover:bg-white/50 transition-colors whitespace-nowrap"
                        >
                          Más información
                        </Link>
                        <Link
                          href="/contacto"
                          className="flex-1 flex items-center justify-center rounded-full bg-[#5b7fa8] px-3 py-2 text-xs uppercase tracking-[0.12em] text-center leading-tight text-white hover:bg-[#4a6a94] transition-colors"
                        >
                          Solicitar detalle
                        </Link>
                      </div>
                      {taller.formularioRegistro && (
                        <a
                          href={taller.formularioRegistro}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-center rounded-full border border-sky-300 px-3 py-2 text-xs uppercase tracking-[0.2em] text-zinc-700 hover:bg-white/50 transition-colors whitespace-nowrap"
                        >
                          Registrar participación
                        </a>
                      )}
                    </>
                  )}
                  {actividadRealizada && (
                    <span className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-zinc-300 bg-zinc-200 px-3 py-2 text-xs uppercase tracking-[0.2em] text-zinc-700">
                      Actividad realizada
                    </span>
                  )}
                </div>
              </div>
            </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-zinc-500 text-lg">
            {searchTerm
              ? "No encontramos talleres que coincidan con tu búsqueda."
              : "No hay talleres disponibles."}
          </p>
        </div>
      )}
    </div>
  );
}
