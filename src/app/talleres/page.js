import Link from "next/link";
import { Suspense } from "react";
import talleresData from "../../../secciones/talleres.json";
import TalleresSearcher from "../../components/TalleresSearcher";

export const metadata = { title: "Talleres" };

export default function TalleresPage() {
  // Filtrar solo talleres activos
  const talleresActivos = talleresData.cursos.filter((taller) => taller.activo);

  return (
    <main className="min-h-screen">
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Talleres</p>
        <h1 className="section-title text-4xl md:text-5xl mt-4">
          {talleresData.titulo}
        </h1>
        <p className="text-sm text-zinc-600 mt-4 max-w-2xl">
          {talleresData.descripcion}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contacto"
            className="rounded-full bg-[#5b7fa8] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white"
          >
            Reservar cupo
          </Link>
          <Link
            href="/contacto"
            className="rounded-full border border-sky-300 px-6 py-3 text-sm uppercase tracking-[0.2em]"
          >
            Pedir info
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <Suspense fallback={<p className="text-sm text-zinc-500">Cargando talleres...</p>}>
          <TalleresSearcher talleres={talleresActivos} />
        </Suspense>
      </section>
    </main>
  );
}
