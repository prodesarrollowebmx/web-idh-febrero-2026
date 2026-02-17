import Link from "next/link";
import { Suspense } from "react";
import HorariosSearcher from "../../components/HorariosSearcher";
import clasesData from "../../../secciones/clases.json";

export const metadata = { title: "Clases" };

export default function ClasesPage() {
  // Filtrar solo clases activas
  const clasesActivas = clasesData.clases.filter((clase) => clase.activo);

  return (
    <main className="min-h-screen">
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{clasesData.subtitulo}</p>
        <h1 className="section-title text-4xl md:text-5xl mt-4">
          {clasesData.titulo}
        </h1>
        <p className="text-sm text-zinc-600 mt-4 max-w-2xl">
          {clasesData.descripcion}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em]">
          <Link
            href="/clases"
            className="rounded-full border border-zinc-200 px-4 py-2 text-zinc-600 hover:text-zinc-900"
          >
            Todas las sedes
          </Link>
          {clasesData.sedes.map((sede) => (
            <Link
              key={sede.id}
              href={`/clases?sede=${sede.id}`}
              className="rounded-full border border-zinc-200 px-4 py-2 text-zinc-600 hover:text-zinc-900"
            >
              {sede.nombre}
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {clasesData.ctas.map((cta, index) => (
            <Link
              key={index}
              href={cta.url}
              className={
                cta.tipo === "primario"
                  ? "rounded-full bg-[#5b7fa8] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white"
                  : "rounded-full border border-sky-300 px-6 py-3 text-sm uppercase tracking-[0.2em]"
              }
            >
              {cta.texto}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <Suspense fallback={<p className="text-sm text-zinc-500">Cargando horarios...</p>}>
          <HorariosSearcher clases={clasesActivas} sedes={clasesData.sedes} />
        </Suspense>
      </section>
    </main>
  );
}
