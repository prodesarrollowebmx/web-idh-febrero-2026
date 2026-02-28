import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use } from "react";
import asesoriaData from "../../../../secciones/home/asesorias.json";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const asesoria = asesoriaData.servicios.find((servicio) => servicio.id === id);

  if (!asesoria) {
    return {
      title: "Asesoría no encontrada",
      description: "La asesoría solicitada no está disponible.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: asesoria.titulo,
    description: asesoria.descripcion,
    alternates: {
      canonical: `/asesorias/${asesoria.id}`,
    },
    openGraph: {
      title: `${asesoria.titulo} | IDH Yoga`,
      description: asesoria.descripcion,
      url: `/asesorias/${asesoria.id}`,
    },
    twitter: {
      title: `${asesoria.titulo} | IDH Yoga`,
      description: asesoria.descripcion,
    },
  };
}

export function generateStaticParams() {
  return asesoriaData.servicios.map((servicio) => ({ id: servicio.id }));
}

export default function AsesoriaDetailPage({ params }) {
  const { id } = use(params);
  const asesoria = asesoriaData.servicios.find((servicio) => servicio.id === id);
  const descripcionExtendida = asesoria?.contenidoLargo || asesoria?.descripcion;

  if (!asesoria) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-10">
        <Link href="/asesorias" className="text-sm text-zinc-500 hover:text-zinc-900">
          ← Volver a asesorías
        </Link>
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mt-6">Asesoría</p>
        {asesoria.imagen && (
          <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden mt-6">
            <Image
              src={asesoria.imagen}
              alt={asesoria.titulo}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        )}
        <h1 className="section-title text-4xl md:text-5xl mt-4">{asesoria.titulo}</h1>
        <p className="text-sm text-zinc-600 mt-4 max-w-3xl leading-relaxed">{asesoria.descripcion}</p>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 glass-card rounded-3xl p-8 space-y-6">
            <div>
              <h2 className="font-display text-2xl text-zinc-900">Descripción detallada</h2>
              <p className="mt-4 text-sm text-zinc-600 leading-relaxed whitespace-pre-line">
                {descripcionExtendida}
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-zinc-900">¿Qué incluye?</h2>
              <ul className="mt-4 space-y-3">
                {asesoria.incluye.map((item, index) => (
                  <li key={index} className="text-sm text-zinc-600 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="glass-card rounded-3xl p-8 space-y-6 h-fit md:sticky md:top-20">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">Duración</div>
              <div className="font-display text-xl text-zinc-900">{asesoria.duracion}</div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">Precio</div>
              <div className="font-display text-2xl text-[#5b7fa8]">{asesoria.precio}</div>
            </div>

            <Link
              href="/contacto"
              className="inline-flex items-center justify-center w-full rounded-full bg-[#5b7fa8] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#4a6a94] transition-colors"
            >
              Solicitar detalle
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
