import Link from "next/link";
import Image from "next/image";
import asesoriaData from "../../../secciones/home/asesorias.json";

export const metadata = { title: "Asesorías" };

export default function AsesoriasPage() {
  return (
    <main className="min-h-screen">
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{asesoriaData.subtitulo}</p>
        <h1 className="section-title text-4xl md:text-5xl mt-4">
          {asesoriaData.titulo}
        </h1>
        <p className="text-sm text-zinc-600 mt-4 max-w-2xl">
          {asesoriaData.descripcion}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={asesoriaData.cta.url}
            className="rounded-full bg-[#5b7fa8] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white"
          >
            {asesoriaData.cta.texto}
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {asesoriaData.servicios.map((servicio) => (
            (() => {
              const sedes = Array.isArray(servicio.sedes)
                ? servicio.sedes.filter(Boolean)
                : servicio.servicio
                  ? [servicio.servicio]
                  : [];

              return (
            <article key={servicio.id} className="glass-card rounded-3xl p-8 space-y-6">
              {servicio.imagen && (
                <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                  <Image
                    src={servicio.imagen}
                    alt={servicio.titulo}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <div>
                <h2 className="font-display text-2xl text-zinc-900">{servicio.titulo}</h2>
                <p className="text-sm text-zinc-600 mt-3 leading-relaxed">
                  {servicio.descripcion}
                </p>
              </div>

              <div className="border-t border-white/50 pt-6 space-y-4">
                {sedes.length > 0 && (
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-1">
                      {sedes.length > 1 ? "Sedes:" : "Servicio:"}
                    </div>
                    <div className="text-sm text-zinc-900">{sedes.join(", ")}</div>
                  </div>
                )}

                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-1">
                    Duración:
                  </div>
                  <div className="text-sm text-zinc-900">{servicio.duracion}</div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-3">
                    Incluye:
                  </div>
                  <ul className="space-y-2">
                    {servicio.incluye.map((item, index) => (
                      <li key={index} className="text-sm text-zinc-600 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/50 pt-6">
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/asesorias/${servicio.id}`}
                    className="inline-flex rounded-full border border-sky-300 px-4 py-2 text-sm uppercase tracking-[0.2em] text-zinc-700 hover:bg-white/50 transition-colors"
                  >
                    Más información
                  </Link>
                  <Link
                    href="/contacto"
                    className="inline-flex rounded-full bg-[#5b7fa8] px-4 py-2 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#4a6a94] transition-colors"
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            </article>
              );
            })()
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-[36px] border border-white/70 bg-white/70 p-10 md:p-14">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Más información</p>
            <h2 className="section-title text-3xl md:text-4xl">¿Preguntas sobre las asesorías?</h2>
            <p className="text-sm text-zinc-600 max-w-2xl leading-relaxed">
              Contáctanos para conocer más detalles, consultar disponibilidad de horarios o ajustar algún programa a tus necesidades específicas. Estamos aquí para acompañarte en tu camino.
            </p>
            <Link
              href="/contacto"
              className="inline-flex rounded-full border border-sky-300 px-6 py-3 text-sm uppercase tracking-[0.2em] hover:border-blue-600"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
