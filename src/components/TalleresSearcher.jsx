"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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

  const isActividadGratuita = (taller) => {
    if (typeof taller.gratuita === "boolean") {
      return taller.gratuita;
    }

    return (taller.precio || "").toLowerCase().includes("gratis");
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
          {filteredTalleres.map((taller) => (
            <article
              key={taller.id}
              className="glass-card rounded-3xl overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={taller.imagen}
                  alt={taller.titulo}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  {taller.fecha}
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
                </div>
              </div>
            </article>
          ))}
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
