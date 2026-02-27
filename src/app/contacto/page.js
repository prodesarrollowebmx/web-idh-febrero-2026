import Link from "next/link";
import contactoData from "../../../secciones/home/contacto.json";
import ContactoForm from "../../components/ContactoForm";

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
        <ContactoForm
          contactoData={contactoData}
          formClassName="rounded-4xl border border-white/70 bg-white/70 p-8 grid gap-4"
        />

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
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/70">Contacto</div>
                <p className="text-sm text-white/80 mt-2">
                  Teléfono: {sede.telefono}
                  <br />
                  WhatsApp: {sede.whatsapp}
                  <br />
                  Email: {sede.email}
                </p>
              </div>
            </div>
          ))}
          
        </div>
      </section>
    </main>
  );
}
