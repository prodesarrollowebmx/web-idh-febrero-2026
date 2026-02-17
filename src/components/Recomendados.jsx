import React from "react";

export default function Recomendados() {
  const items = ["Recomendado 1", "Recomendado 2", "Recomendado 3"];
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Recomendados</h2>
      <div className="flex gap-4 overflow-x-auto">
        {items.map((it) => (
          <div key={it} className="min-w-[200px] p-4 border rounded bg-white dark:bg-zinc-800">
            <h3 className="font-medium">{it}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Descripción breve.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
