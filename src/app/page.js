import Link from "next/link";
import Image from "next/image";
import TestimoniosCarousel from "../components/TestimoniosCarousel";
import talleresData from "../../secciones/talleres.json";
import heroData from "../../secciones/home/hero.json";
import estadisticasData from "../../secciones/home/estadisticas.json";
import clasesData from "../../secciones/home/clases.json";
import diplomadoData from "../../secciones/home/diplomado.json";
import testimoniosData from "../../secciones/home/testimonios.json";
import agendaData from "../../secciones/home/agenda.json";
import contactoData from "../../secciones/home/contacto.json";
import ContactoForm from "../components/ContactoForm";

export const metadata = {
  title: "Inicio",
  description:
    "Escuela y comunidad de yoga en Santiago: clases, talleres, diplomado, asesorías y espacios para bienestar integral.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "IDH Yoga | Escuela y Comunidad",
    description:
      "Clases, talleres, diplomado, asesorías y experiencias de bienestar en IDH Yoga.",
    url: "/",
  },
  twitter: {
    title: "IDH Yoga | Escuela y Comunidad",
    description:
      "Clases, talleres, diplomado, asesorías y experiencias de bienestar en IDH Yoga.",
  },
};

export default function Home() {
  // Obtener solo los primeros 4 talleres activos marcados para home
  const talleresDestacados = talleresData.cursos
    .filter((taller) => taller.activo && taller.homeActivo)
    .slice(0, 4);
  const sedesById = agendaData.sedes.reduce((acc, sede) => {
    acc[sede.id] = sede;
    return acc;
  }, {});

  return (
    <div className="relative overflow-hidden">
      <section className="relative">
        <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[#c5e0f5] blur-3xl opacity-70" />
        <div className="absolute top-32 -left-20 h-52 w-52 rounded-full bg-[#b8d9ed] blur-3xl opacity-70" />
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-16 grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
              {heroData.etiqueta}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-zinc-900">
              {heroData.titulo}
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
              {heroData.descripcion}
            </p>
            <div className="flex flex-wrap gap-4">
              {heroData.ctas.map((cta, index) => (
                <Link
                  key={index}
                  href={cta.url}
                  className={cta.tipo === "primario" 
                    ? "rounded-full bg-[#5b7fa8] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white shadow-lg shadow-[#5b7fa8]/30"
                    : "rounded-full border border-sky-300 px-6 py-3 text-sm uppercase tracking-[0.2em] text-zinc-700"
                  }
                >
                  {cta.texto}
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              {estadisticasData.estadisticas.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/70 px-4 py-3">
                  <div className="font-display text-2xl text-zinc-900">
                    {item.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-4/5 rounded-4xl overflow-hidden shadow-2xl">
              <div className="relative h-full w-full">
                <Image
                  src={heroData.imagenHero}
                  alt="Clase destacada"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/80 mb-3">
                    {heroData.claseDestacada.etiqueta}
                  </div>
                  <div className="space-y-2">
                    <div className="font-display text-3xl">{heroData.claseDestacada.nombre}</div>
                    <p className="text-sm text-white/90">
                      {heroData.claseDestacada.descripcion}
                    </p>
                  </div>
                  <div className="text-sm text-white/80 mt-3">
                    {heroData.claseDestacada.horario} - {heroData.claseDestacada.sala} - {heroData.claseDestacada.duracion}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 glass-card rounded-3xl px-6 py-4 text-sm text-zinc-600">
              {heroData.anuncio}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{clasesData.subtitulo}</p>
            <h2 className="section-title text-3xl md:text-4xl">{clasesData.titulo}</h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md">
            {clasesData.descripcion}
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {clasesData.clases.map((item) => (
            (() => {
              const mostrarBotonVerHorarios = item.mostrarBotonVerHorarios ?? true;

              return (
            <article key={item.id} className="glass-card rounded-3xl overflow-hidden h-full flex flex-col">
              <div className="relative w-full h-48">
                <Image
                  src={item.imagen}
                  alt={item.titulo}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-6 flex flex-1 flex-col gap-4">
                <h3 className="font-display text-2xl text-zinc-900">{item.titulo}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{item.descripcion}</p>
                {mostrarBotonVerHorarios && (
                  <div className="mt-auto pt-4 border-t border-zinc-300/80">
                    <Link href={`/clases?buscar=${encodeURIComponent(item.titulo)}`} className="text-xs uppercase tracking-[0.2em] text-zinc-700 font-medium">
                      Ver horarios
                    </Link>
                  </div>
                )}
              </div>
            </article>
              );
            })()
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="rounded-[36px] bg-[#2c4a6b] text-white overflow-hidden grid md:grid-cols-[1.1fr_0.9fr]">
          <div className="p-10 md:p-14 space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">{diplomadoData.subtitulo}</p>
            <h2 className="section-title text-3xl md:text-4xl text-white">
              {diplomadoData.titulo}
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              {diplomadoData.descripcion}
            </p>
            <div className="flex flex-wrap gap-3">
              {diplomadoData.etiquetas.map((etiqueta, index) => (
                <span key={index} className="rounded-full border border-white/50 px-4 py-2 text-xs uppercase tracking-[0.2em]">
                  {etiqueta}
                </span>
              ))}
            </div>
            <Link
              href={diplomadoData.cta.url}
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#2c4a6b] px-6 py-3 text-sm uppercase tracking-[0.2em]"
            >
              {diplomadoData.cta.texto}
            </Link>
            <div className="bg-white/10 rounded-3xl p-6 space-y-4 mt-8">
              {diplomadoData.caracteristicas.map((item, index) => (
                <div key={index} className="flex items-center gap-4 text-sm text-white/80">
                  <span className="h-2 w-2 rounded-full bg-white/70" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden md:block h-full min-h-[500px]">
            <Image
              src={diplomadoData.imagen}
              alt="Diplomado"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Talleres</p>
            <h2 className="section-title text-3xl md:text-4xl">Talleres y cursos abiertos</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Programas cortos para profundizar en respiracion, filosofia y anatomia,
              abiertos a toda la comunidad.
            </p>
            <Link
              href="/talleres"
              className="inline-flex items-center gap-2 rounded-full border border-sky-300 px-6 py-3 text-sm uppercase tracking-[0.2em]"
            >
              Todos los Talleres
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {talleresDestacados.map((taller) => (
              <article key={taller.id} className="rounded-3xl border border-white/70 bg-white/70 overflow-hidden">
                <div className="relative w-full h-48">
                  <Image
                    src={taller.imagen}
                    alt={taller.titulo}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  {taller.gratuita && (
                    <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-zinc-700 mb-3">
                      Actividad gratuita
                    </div>
                  )}
                  <h3 className="font-display text-2xl text-zinc-900">{taller.titulo}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mt-3">{taller.descripcion}</p>
                  <div className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Proxima fecha: {taller.fecha}
                  </div>
                  <div className="mt-5">
                    <Link
                      href={`/talleres/${taller.id}`}
                      className="inline-flex items-center justify-center rounded-full border border-sky-300 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-700 hover:bg-white/50 transition-colors"
                    >
                      Más información
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{agendaData.subtitulo}</p>
            <h2 className="section-title text-3xl md:text-4xl">{agendaData.titulo}</h2>
            <p className="text-sm text-zinc-600">
              {agendaData.descripcion}
            </p>
            <Link
              href="/clases"
              className="inline-flex items-center gap-2 rounded-full border border-sky-300 px-6 py-3 text-sm uppercase tracking-[0.2em] text-zinc-700"
            >
              Ver todos los horarios
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {agendaData.horariosPorSede.map((bloque) => (
              <div key={bloque.sedeId} className="rounded-3xl border border-white/70 bg-white/70 p-6">
                <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  {sedesById[bloque.sedeId]?.nombre || "Sede"}
                </div>
                <div className="mt-4 divide-y divide-white/70">
                  {bloque.horarios.filter((item) => item.homeActivo).map((item) => (
                    <div key={`${bloque.sedeId}-${item.dia}`} className="py-3">
                      <div className="font-display text-lg text-zinc-900">{item.dia}</div>
                      <div className="text-sm text-zinc-600 leading-relaxed">{item.detalle}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{testimoniosData.subtitulo}</p>
            <h2 className="section-title text-3xl md:text-4xl">{testimoniosData.titulo}</h2>
          </div>
          <Link
            href={testimoniosData.cta.url}
            className="text-xs uppercase tracking-[0.2em] text-zinc-500"
          >
            {testimoniosData.cta.texto}
          </Link>
        </div>
        <TestimoniosCarousel testimonios={testimoniosData.testimonios} />
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-[36px] border border-white/70 bg-white/70 p-10 md:p-12 grid gap-10 md:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{contactoData.subtitulo}</p>
            <h2 className="section-title text-3xl md:text-4xl">{contactoData.titulo}</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {contactoData.descripcion}
            </p>
            <div className="text-sm text-zinc-600">
              WhatsApp: {contactoData.informacion.whatsapp}
              <br />
              {contactoData.informacion.email}
            </div>
          </div>
          <ContactoForm contactoData={contactoData} mode="footer" />
        </div>
      </section>
    </div>
  );
}
