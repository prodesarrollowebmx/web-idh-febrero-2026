"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full sticky top-0 z-50">
      <div className="bg-white/70 backdrop-blur-xl border-b border-white/60">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/logo-idh.png" 
                alt="IDH Yoga" 
                width={50} 
                height={50}
                className="w-auto h-12"
                priority
              />
              <span className="hidden 2xl:inline text-xs uppercase tracking-[0.2em] text-zinc-500">
                Escuela y Comunidad
              </span>
            </Link>
          </div>

          <div className="hidden xl:flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm uppercase tracking-[0.2em] text-zinc-600">
            <Link href="/" className="hover:text-zinc-900">
              Inicio
            </Link>
            <Link href="/clases" className="hover:text-zinc-900">
              Clases
            </Link>
            <Link href="/talleres" className="hover:text-zinc-900">
              Talleres
            </Link>
            <Link href="/diplomado" className="hover:text-zinc-900">
              Diplomado
            </Link>
            <Link href="/asesorias" className="hover:text-zinc-900">
              Asesorías
            </Link>
            <Link href="/espacios" className="hover:text-zinc-900">
              Espacios
            </Link>
            <Link href="/contacto" className="hover:text-zinc-900">
              Contacto
            </Link>
            </nav>

            <Link
              href="/contacto"
              className="rounded-full border border-sky-300 px-4 py-2 text-sm uppercase tracking-[0.2em] hover:border-blue-600"
            >
              Reserva
            </Link>
          </div>

          <div className="xl:hidden">
            <button
              aria-label="menu"
              onClick={() => setOpen((s) => !s)}
              className="px-3 py-2 rounded-full border border-sky-300 text-sm uppercase tracking-[0.2em]"
            >
              {open ? "Cerrar" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="xl:hidden bg-white border-b border-white/60">
          <div className="flex flex-col px-4 py-4 gap-3 text-sm uppercase tracking-[0.2em]">
            <Link href="/" onClick={() => setOpen(false)}>
              Inicio
            </Link>
            <Link href="/clases" onClick={() => setOpen(false)}>
              Clases
            </Link>
            <Link href="/talleres" onClick={() => setOpen(false)}>
              Talleres
            </Link>
            <Link href="/diplomado" onClick={() => setOpen(false)}>
              Diplomado
            </Link>
            <Link href="/asesorias" onClick={() => setOpen(false)}>
              Asesorías
            </Link>
            <Link href="/espacios" onClick={() => setOpen(false)}>
              Espacios
            </Link>
            <Link href="/contacto" onClick={() => setOpen(false)}>
              Contacto
            </Link>
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className="rounded-full border border-sky-300 px-4 py-2 text-center"
            >
              Reserva
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
