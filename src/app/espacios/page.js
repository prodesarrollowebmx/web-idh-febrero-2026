import Link from "next/link";
import EspaciosCarousel from "../../components/EspaciosCarousel";
import espaciosData from "../../../secciones/home/espacios.json";
import clasesData from "../../../secciones/clases.json";

export const metadata = { title: "Renta de Espacios" };

export default function EspaciosPage() {
  const sedesById = clasesData.sedes.reduce((acc, sede) => {
    acc[sede.id] = sede;
    return acc;
  }, {});

  return (
    <main className="min-h-screen">
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{espaciosData.subtitulo}</p>
        <h1 className="section-title text-4xl md:text-5xl mt-4">
          {espaciosData.titulo}
        </h1>
        <p className="text-sm text-zinc-600 mt-4 max-w-2xl">
          {espaciosData.descripcion}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={espaciosData.cta.url}
            className="rounded-full bg-[#5b7fa8] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white"
          >
            {espaciosData.cta.texto}
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid gap-8">
          {espaciosData.espacios.map((espacio) => (
            <article key={espacio.id} className="glass-card rounded-3xl overflow-hidden flex flex-col md:block">
              {/* Carrusel en mobile */}
              <div className="md:hidden h-64 overflow-hidden relative z-0">
                <EspaciosCarousel imagenes={espacio.imagenes} nombre={espacio.nombre} />
              </div>
              
              <div className="grid md:grid-cols-[1fr_1.2fr] gap-0 relative z-10">
                {/* Contenido */}
                <div className="p-8 space-y-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h2 className="font-display text-3xl text-zinc-900">{espacio.nombre}</h2>
                        <div className="text-xs uppercase tracking-[0.3em] text-zinc-500 mt-2">
                          {sedesById[espacio.sede]?.nombre || "Sede"}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                      {espacio.descripcion}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-1">
                          Capacidad:
                        </div>
                        <div className="text-sm text-zinc-900">{espacio.capacidad}</div>
                      </div>

                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-1">
                          Superficie:
                        </div>
                        <div className="text-sm text-zinc-900">{espacio.metros}</div>
                      </div>

                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-2">
                          Características:
                        </div>
                        <ul className="space-y-1">
                          {espacio.caracteristicas.map((caracteristica, index) => (
                            <li key={index} className="text-sm text-zinc-600 flex items-center gap-2">
                              <span className="text-blue-500">•</span>
                              {caracteristica}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/50 space-y-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-1">
                        Horarios:
                      </div>
                      <div className="text-sm text-zinc-600">{espacio.horarios}</div>
                    </div>
                    <Link
                      href="/contacto"
                      className="inline-flex rounded-full bg-[#5b7fa8] px-4 py-2 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#4a6a94] transition-colors"
                    >
                      Reservar
                    </Link>
                  </div>
                </div>

                {/* Carrusel de imágenes */}
                <div className="bg-linear-to-br from-blue-100 to-sky-100 p-0 h-full min-h-[400px] hidden md:block">
                  <EspaciosCarousel imagenes={espacio.imagenes} nombre={espacio.nombre} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-[36px] border border-white/70 bg-white/70 p-10 md:p-14">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Reservas y consultas</p>
              <h2 className="section-title text-3xl md:text-4xl">¿Quieres rentar un espacio?</h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Ponemos a tu disposición espacios diseñados para promover bienestar y práctica consciente. Contáctanos para conocer disponibilidades, tarifas especiales por paquetes y personalizar tu experiencia.
              </p>
              <Link
                href="/contacto"
                className="inline-flex rounded-full bg-[#5b7fa8] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#4a6a94] transition-colors"
              >
                Solicitar información
              </Link>
            </div>
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Servicios adicionales</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 text-lg mt-1">→</span>
                  <div>
                    <div className="font-semibold text-zinc-900 text-sm">Equipamiento completo</div>
                    <p className="text-xs text-zinc-600">Audio, espejos, cojines y accesorios</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 text-lg mt-1">→</span>
                  <div>
                    <div className="font-semibold text-zinc-900 text-sm">Flexibilidad horaria</div>
                    <p className="text-xs text-zinc-600">Paquetes personalizados según tus necesidades</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 text-lg mt-1">→</span>
                  <div>
                    <div className="font-semibold text-zinc-900 text-sm">Ambiente acogedor</div>
                    <p className="text-xs text-zinc-600">Diseñado para transmitir paz y bienestar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
