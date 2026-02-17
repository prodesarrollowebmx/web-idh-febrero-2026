import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl md:text-7xl font-bold text-zinc-700">404</h1>
          <p className="text-xl md:text-2xl text-zinc-700">Página no encontrada</p>
        </div>
        <p className="text-zinc-600 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o fue removida.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-[#5b7fa8] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#4a6a94] transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
