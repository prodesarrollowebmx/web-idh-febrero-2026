import Link from "next/link";
import contactoData from "../../../secciones/home/contacto.json";

export const metadata = { title: "Contacto" };

export default function ContactoPage() {
  return (
    <main className="min-h-screen">
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{contactoData.subtitulo}</p>
        <h1 className="section-title text-4xl md:text-5xl mt-4">
          {contactoData.titulo}
        </h1>
        <p className="text-sm text-zinc-600 mt-4 max-w-2xl">
          {contactoData.descripcion}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16 grid gap-8 md:grid-cols-[1fr_0.9fr]">
        <form className="rounded-4xl border border-white/70 bg-white/70 p-8 grid gap-4">
          <select
            name="sede"
            required
            defaultValue=""
            className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm"
          >
            <option value="" disabled>
              Selecciona una sede
            </option>
            {contactoData.sedes.map((sede) => (
              <option key={sede.id} value={sede.id}>
                {sede.nombre}
              </option>
            ))}
          </select>
          {contactoData.formulario.campos.map((campo, index) => (
            campo.tipo === "textarea" ? (
              <textarea
                key={index}
                placeholder={campo.placeholder}
                rows={campo.filas}
                className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm"
              />
            ) : (
              <input
                key={index}
                type={campo.tipo}
                placeholder={campo.placeholder}
                className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm"
              />
            )
          ))}
          <button
            type="button"
            className="rounded-full bg-[#5b7fa8] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white"
          >
            {contactoData.formulario.boton}
          </button>
        </form>

        <div className="space-y-6">
          {contactoData.sedes.map((sede) => (
            <div key={sede.id} className="rounded-4xl bg-[#2c4a6b] text-white p-8 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/70">{sede.nombre}</div>
                <div className="font-display text-xl mt-3">{sede.direccion}</div>
                <p className="text-sm text-white/80 mt-1">{sede.ciudad}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/70">Horario</div>
                <p className="text-sm text-white/80 mt-2 whitespace-pre-line">
                  {sede.horarios}
                </p>
              </div>
            </div>
          ))}
          
          <div className="rounded-4xl bg-[#2c4a6b] text-white p-8 space-y-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/70">Contacto directo</div>
              <p className="text-sm text-white/80 mt-2">
                WhatsApp: {contactoData.informacion.whatsapp}
                <br />
                {contactoData.informacion.email}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
