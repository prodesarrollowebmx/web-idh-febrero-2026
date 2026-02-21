"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const STOP_WORDS = new Set(["hr", "hrs", "hora", "horas", "de", "del", "la", "el"]);

function normalizeText(value = "") {
  return value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function tokenizeQuery(query = "") {
  return normalizeText(query)
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
    .filter((token) => !STOP_WORDS.has(token));
}

export default function HorariosSearcher({ clases, sedes }) {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("buscar") || "";
  const selectedSedeId = searchParams.get("sede") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Crear un mapa de sedes por id
  const sedesById = sedes.reduce((acc, sede) => {
    acc[sede.id] = sede;
    return acc;
  }, {});

  // Filtrar clases según tokens de búsqueda relacionados
  const filteredClases = clases.filter((clase) => {
    if (selectedSedeId && clase.sedeId !== selectedSedeId) {
      return false;
    }

    const tokens = tokenizeQuery(searchTerm);
    if (tokens.length === 0) return true;

    const searchableText = normalizeText([
      clase.titulo,
      clase.horario,
      clase.duracion,
      clase.nivel,
      clase.instructor,
      clase.cupo,
      sedesById[clase.sedeId]?.nombre,
    ].filter(Boolean).join(" "));

    return tokens.every((token) => searchableText.includes(token));
  });

  return (
    <div className="space-y-8">
      {/* Buscador */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/70 p-6 shadow-lg">
        <input
          type="text"
          placeholder="Busca por nombre de clase, hora, día, instructor o sede..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        {searchTerm && (
          <p className="text-sm text-zinc-500 mt-2">
            {filteredClases.length} clase{filteredClases.length !== 1 ? "s" : ""} encontrada{filteredClases.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Resultados */}
      {filteredClases.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClases.map((clase) => (
            <article
              key={clase.id}
              className="glass-card rounded-3xl p-6 space-y-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl text-zinc-900">
                    {clase.titulo}
                  </h2>
                  <div className="text-xs uppercase tracking-[0.3em] text-zinc-500 mt-2">
                    {sedesById[clase.sedeId]?.nombre || "Sede"}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/50 pt-4 space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                    Horario:
                  </span>
                  <span className="text-sm text-zinc-900">{clase.horario}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                    Duración:
                  </span>
                  <span className="text-sm text-zinc-900">{clase.duracion}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                    Nivel:
                  </span>
                  <span className="text-sm text-zinc-900">{clase.nivel}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                    Instructor:
                  </span>
                  <span className="text-sm text-zinc-900">{clase.instructor}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                    Cupo:
                  </span>
                  <span className="text-sm text-zinc-900">{clase.cupo}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/50">
                <Link
                  href="/contacto"
                  className="inline-flex rounded-full bg-[#5b7fa8] px-4 py-2 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#4a6a94] transition-colors"
                >
                  Reservar
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-zinc-500 text-lg">
            {searchTerm
              ? "No encontramos clases que coincidan con tu búsqueda."
              : "No hay clases disponibles."}
          </p>
        </div>
      )}
    </div>
  );
}
