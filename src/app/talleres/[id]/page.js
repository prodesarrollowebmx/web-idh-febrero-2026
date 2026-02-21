"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use } from "react";
import talleresData from "../../../../secciones/talleres.json";

export default function TallerDetailPage({ params }) {
  const { id } = use(params);
  const taller = talleresData.cursos.find((t) => t.id === id);
  const actividadGratuita =
    typeof taller?.gratuita === "boolean"
      ? taller.gratuita
      : (taller?.precio || "").toLowerCase().includes("gratis");

  if (!taller) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative w-full h-96 md:h-[500px]">
          <Image
            src={taller.imagen}
            alt={taller.titulo}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <Link href="/talleres" className="text-sm text-white/70 hover:text-white mb-4 inline-block">
              ← Volver a talleres
            </Link>
            <h1 className="font-display text-4xl md:text-5xl mb-4">{taller.titulo}</h1>
            <div className="flex flex-wrap gap-6 text-sm md:text-base">
              <div>
                <span className="text-white/70">Fecha:</span> {taller.fecha}
              </div>
              <div>
                <span className="text-white/70">Hora:</span> {taller.hora}
              </div>
              <div>
                <span className="text-white/70">Instructor:</span> {taller.instructor}
              </div>
              {actividadGratuita && (
                <div>
                  <span className="text-white/70">Actividad:</span> Actividad gratuita
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            {/* Descripción Larga */}
            <div>
              <h2 className="font-display text-2xl text-zinc-900 mb-4">Acerca de este taller</h2>
              <p className="text-base text-zinc-600 leading-relaxed">
                {taller.contenidoLargo}
              </p>
            </div>

            {/* Objetivos */}
            <div>
              <h2 className="font-display text-2xl text-zinc-900 mb-4">Objetivos del taller</h2>
              <ul className="space-y-3">
                {taller.objetivos.map((objetivo, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="shrink-0 h-2 w-2 rounded-full bg-[#5b7fa8] mt-2" />
                    <span className="text-zinc-600">{objetivo}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contenido del Taller */}
            <div>
              <h2 className="font-display text-2xl text-zinc-900 mb-4">Contenido del programa</h2>
              <ul className="space-y-2">
                {taller.contenido.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-[#5b7fa8] mt-2" />
                    <span className="text-zinc-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructor */}
            <div className="rounded-3xl border border-white/70 bg-white/50 p-8">
              <h3 className="font-display text-xl text-zinc-900 mb-2">{taller.instructor}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                {taller.bioInstructor}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="glass-card rounded-3xl p-8 space-y-6 sticky top-20">
              {/* Duración */}
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">Duración</div>
                <div className="font-display text-lg text-zinc-900">{taller.duracion}</div>
              </div>

              {/* Nivel */}
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">Nivel</div>
                <div className="font-display text-lg text-zinc-900">{taller.nivel}</div>
              </div>

              {/* Modalidad */}
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">Modalidad</div>
                <div className="font-display text-lg text-zinc-900">{taller.modalidad || "Por confirmar"}</div>
              </div>

              {/* Cupos */}
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">Cupos disponibles</div>
                <div className="font-display text-lg text-zinc-900">{taller.cupos} personas</div>
              </div>

              {/* Requisitos */}
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">Requisitos</div>
                <div className="text-sm text-zinc-600">{taller.requisitos}</div>
              </div>

              {/* Sedes */}
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">Sedes disponibles</div>
                <div className="space-y-1">
                  {taller.sedes.map((sede, index) => (
                    <div key={index} className="text-sm text-zinc-600">
                      {sede}
                    </div>
                  ))}
                </div>
              </div>

              {/* Precio */}
              <div className="border-t border-white/70 pt-6">
                {actividadGratuita && (
                  <>
                    <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">Actividad</div>
                    <div className="font-display text-lg text-zinc-900 mb-4">Actividad gratuita</div>
                  </>
                )}
                {!actividadGratuita && (
                  <>
                    <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">Precio</div>
                    <div className="font-display text-3xl text-[#5b7fa8] mb-6">{taller.precio}</div>
                  </>
                )}
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center w-full rounded-full bg-[#5b7fa8] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#4a6a94] transition-colors"
                >
                  Solicitar detalle
                </Link>
                {taller.formularioRegistro && (
                  <a
                    href={taller.formularioRegistro}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center w-full rounded-full border border-sky-300 px-6 py-3 text-sm uppercase tracking-[0.2em] text-zinc-700 hover:bg-white/50 transition-colors"
                  >
                    Registrar participación
                  </a>
                )}
              </div>

              {/* Estado */}
              {!taller.activo && (
                <div className="bg-red-50 border border-red-200 rounded-3xl p-4 text-center">
                  <p className="text-sm text-red-600 font-medium">Este taller aún no está disponible</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#f5f7fa] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-display text-3xl text-zinc-900">¿Listo para comenzar?</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Contactanos para confirmar tu lugar o si tienes más preguntas sobre este taller.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-full bg-[#5b7fa8] px-8 py-3 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#4a6a94] transition-colors"
            >
              Solicitar detalle
            </Link>
            {taller.formularioRegistro && (
              <a
                href={taller.formularioRegistro}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-sky-300 px-8 py-3 text-sm uppercase tracking-[0.2em] text-zinc-700 hover:bg-white/50 transition-colors"
              >
                Registrar participación
              </a>
            )}
            <Link
              href="/talleres"
              className="inline-flex items-center justify-center rounded-full border border-sky-300 px-8 py-3 text-sm uppercase tracking-[0.2em] text-zinc-700 hover:bg-white/50 transition-colors"
            >
              Ver otros talleres
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
