import React from "react";

export default function Cursos() {
  const cursos = [
    { title: "Curso A", desc: "Introducción práctica." },
    { title: "Curso B", desc: "Avanzado en técnicas." },
    { title: "Curso C", desc: "Proyecto final." },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Nuestros Cursos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cursos.map((c) => (
          <article key={c.title} className="p-4 border rounded bg-white dark:bg-zinc-800">
            <h3 className="font-medium">{c.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{c.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
