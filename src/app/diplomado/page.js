import Link from "next/link";

export const metadata = { title: "Diplomado" };

export default function DiplomadoPage() {
  const modulos = [
    "Practica y metodologias de ensenanza",
    "Filosofia y textos clasicos",
    "Anatomia aplicada y biomecanica",
    "Meditacion, pranayama y etica",
  ];

  return (
    <main className="min-h-screen">
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Diplomado</p>
        <h1 className="section-title text-4xl md:text-5xl mt-4">
          Formacion docente 500 hrs
        </h1>
        <p className="text-sm text-zinc-600 mt-4 max-w-2xl">
          Un recorrido profundo para formar docentes con base solida, criterio y
          sensibilidad. Modalidad presencial con encuentros intensivos.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contacto"
            className="rounded-full bg-[#5b7fa8] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white"
          >
            Solicitar programa
          </Link>
          <Link
            href="/contacto"
            className="rounded-full border border-sky-300 px-6 py-3 text-sm uppercase tracking-[0.2em]"
          >
            Agenda una llamada
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-[36px] bg-[#2c4a6b] text-white p-10 md:p-12 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <h2 className="section-title text-3xl text-white">Estructura del programa</h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Incluye tutorias, practicas supervisadas y un retiro presencial. El
              enfoque integra tecnica, filosofia y autocuidado.
            </p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em]">
              <span className="rounded-full border border-white/50 px-4 py-2">Inicio Marzo 2026</span>
              <span className="rounded-full border border-white/50 px-4 py-2">Cupo limitado</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-3xl p-6 space-y-4">
            {modulos.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/80">
                <span className="h-2 w-2 rounded-full bg-white/70" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
