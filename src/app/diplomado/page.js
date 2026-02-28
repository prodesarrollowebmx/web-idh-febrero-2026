import Link from "next/link";

export const metadata = {
  title: "Diplomado",
  description:
    "Formación de Instructor de Hatha Yoga con enfoque integral, certificación y acompañamiento docente.",
  alternates: {
    canonical: "/diplomado",
  },
  openGraph: {
    title: "Diplomado de Hatha Yoga | IDH Yoga",
    description:
      "Programa presencial con clases grabadas, contenidos teóricos-prácticos y certificación internacional.",
    url: "/diplomado",
  },
  twitter: {
    title: "Diplomado de Hatha Yoga | IDH Yoga",
    description:
      "Programa presencial con clases grabadas, contenidos teóricos-prácticos y certificación internacional.",
  },
};

export default function DiplomadoPage() {
  const modulos = [
    "Practica y metodologias de ensenanza",
    "Filosofia y textos clasicos",
    "Anatomia aplicada y biomecanica",
    "Meditacion, pranayama y etica",
  ];

  const trayectoria = [
    "Desde 1964, en que establecimos el primer Instituto de Yoga en Chile, el IDH se ha dedicado a promover la salud y el bienestar, a través de la enseñanza de la Yoga. Y a lo largo de 6 décadas, hemos capacitado a miles de Instructores de Yoga, que han egresados de nuestros programas de formación.",
    "Actualmente, el Diplomado para ser Instructor de Yoga nivel básico, es una especialización que ofrece el IDH de Chile, en conjunto con el IDH YogaRam, de México, para todas aquellas personas que deseen actualizarse y capacitarse como Instructores de Hatha Yoga.",
    "Este Diplomado permite conocer, vivir y aplicar las herramientas psicofísicas de esta milenaria disciplina, para luego impartir clases. Los egresados del Diplomado, reciben la Certificación como Instructores de Yoga, que se basa en el estándar de competencia laboral de Instructor de Yoga con reconocimiento ante la SEP (Secretaria de Educación Pública de México) y con validez internacional.",
    "Es un programa presencial, con apoyo de la plataforma virtual de IDH pues las clases son grabadas y se suben a la plataforma cada semana. Son 20 sesiones que se imparten los días sábado en la mañana (de 10 a 14 hrs), más 2 sesiones del proceso de Certificación, lo que da un total de 80 horas de clases.",
    "Además el participante debe asistir a 40 horas de clases de Yoga, en la semana, a lo largo del Diplomado, ya sea que las tome de forma presencial u online.",
  ];

  const opcionConveniente = [
    "20 semanas de trabajo + 2 semanas de finales y proceso de certificación",
    "Lecciones grabadas en la plataforma educativa.",
    "Refuerzo del trabajo en sesiones en vivo por zoom. En coordinación con el Docente.",
    "Incluye certificación del IDH Yoga Ram internacional e Instituto de Desarrollo Humano Chile.",
  ];

  const areasConocimiento = [
    "Filosofía de la Yoga",
    "Sistemas de integración (anatomofisiología)",
    "Atención Centrada en el alumno",
    "Elementos didácticos para dirigir una clase de Yoga",
    "Estándar de Competencia",
  ];

  const contenidosGenerales = [
    "Historia del Yoga",
    "Fundamentos de la práctica de Asanas",
    "Angas",
    "Chakras",
    "Sistemas energéticos",
    "El Prana",
    "Técnicas de Respiración",
    "Ejercicios de Calentamiento",
    "Ejercicios Psicofísicos",
    "Estiramientos",
    "Técnicas de Relajación",
    "Herramientas para la Atención Mental y Conciencia Plena",
    "Asanas y sus Beneficios",
    "Diseño y preparación de clases",
    "Acondicionamiento Físico",
    "Valores Del Docente",
  ];

  const preguntasFrecuentes = [
    {
      pregunta: "¿Es necesario tener experiencia?",
      respuesta:
        "No, no se necesita tener experiencia, sólo debes estar con las ganas de aprender y con la posibilidad de realizar ejercicio físico. No se requiere de ningún tipo de estudio previo y de ningún nivel de desarrollo académico.",
    },
    {
      pregunta: "¿Quiénes dirigen el diplomado?",
      respuesta:
        "Está dirigido por Profesores de Yoga certificados y miembros de IDH Yoga de Chile, con 30 años de práctica y dedicación docente. Los temas relacionados con la salud están dirigidos por profesionales titulados del área de la salud.",
    },
    {
      pregunta: "¿De qué manera se puede pagar el diplomado?",
      respuesta:
        "Se puede pagar en efectivo, con tarjetas de crédito o débito y con transferencia.",
    },
    {
      pregunta: "¿Cómo los puedo contactar y hablar con alguien?",
      respuesta:
        "Puedes mandar whatsapp o llamarnos directamente al +569 77987629 o mandar correo a contacto@idhyoga.com o puedes visitarnos en nuestra sede de Compañía 1516 en Santiago centro, Metro Santa Ana Líneas 2 y 5.",
    },
    {
      pregunta: "¿Qué reconocimientos recibiré?",
      respuesta:
        "Al terminar el diplomado IDH Yoga Chile te entrega un diploma de participación y aprobación del diplomado de yoga. Luego, una vez realizadas las evaluaciones teóricas y prácticas del estándar de competencia laboral de Profesor de Yoga, recibirás la Certificación internacional a través de un diploma, que te entrega CONOCER, organismo encargado de la SEP de México para estos efectos.",
    },
  ];

  return (
    <main className="min-h-screen">
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Diplomado</p>
        <h1 className="section-title text-4xl md:text-5xl mt-4">
          Formacion Instructor de Hatha Yoga
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
              Incluye tutorias, practicas supervisadas en un grato ambiente presencial. El
              enfoque integra técnica, filosofía y autocuidado.
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

      <section className="max-w-6xl mx-auto px-4 pb-20 space-y-12">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:p-8">
          <h2 className="section-title text-2xl md:text-3xl">Diplomado Instructor de Hatha Yoga Marzo 2026</h2>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-sky-50 p-6 md:p-8 space-y-4">
          <h3 className="section-title text-2xl">Trayectoria</h3>
          {trayectoria.map((texto) => (
            <p key={texto} className="text-sm text-zinc-700 leading-relaxed">
              {texto}
            </p>
          ))}
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-blue-50 p-6 md:p-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="section-title text-2xl">¿Qué podré hacer al terminar?</h3>
            <p className="text-sm text-zinc-700 leading-relaxed">
              Al terminar el diplomado contarás con los conocimientos y la información que te permitirán presentar sin ningún contratiempo el examen para certificarte como instructor de yoga. Así mismo, podrás dirigir clases de yoga tanto presencial como en línea, con seguridad, prestancia y cuidando a las personas que sean tus alumnos.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="section-title text-2xl">¿Qué requisitos necesito? ¡NINGUNO!</h3>
            <p className="text-sm text-zinc-700 leading-relaxed">
              No necesitas tener experiencia, sólo debes estar con las ganas de aprender y con la posibilidad de realizar ejercicio físico.
            </p>
            <p className="text-sm text-zinc-700 leading-relaxed">
              No se requiere de ningún tipo de estudio previo y de ningún nivel de desarrollo académico.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-indigo-50 p-6 md:p-8 space-y-4">
          <h3 className="section-title text-2xl">Opción conveniente</h3>
          <ul className="space-y-2 text-sm text-zinc-700">
            {opcionConveniente.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-cyan-50 p-6 md:p-8 space-y-4">
          <h3 className="section-title text-2xl">Áreas de conocimiento</h3>
          <ul className="space-y-2 text-sm text-zinc-700">
            {areasConocimiento.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-teal-50 p-6 md:p-8 space-y-4">
          <h3 className="section-title text-2xl">Todo lo que verás en el diplomado</h3>
          <ul className="grid gap-2 md:grid-cols-2 text-sm text-zinc-700">
            {contenidosGenerales.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-emerald-50 p-6 md:p-8 space-y-3">
          <h3 className="section-title text-2xl">Promociones</h3>
          <p className="text-sm text-zinc-700">10% de descuento por pago al contado.</p>
          <p className="text-sm text-zinc-700">15% de descuento por pago contado y anticipado (aplica para quienes paguen antes del 10 de diciembre 2024).</p>
          <p className="text-sm text-zinc-700">Pago en 7 cuotas de $150.000.- cada una.</p>
          <p className="text-sm text-zinc-700">Valor del Diplomado: $1.000.000-.</p>
          <p className="text-sm text-zinc-700">Matrícula: $100.000-.</p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-violet-50 p-6 md:p-8 space-y-5">
          <h3 className="section-title text-2xl">Preguntas frecuentes</h3>
          {preguntasFrecuentes.map(({ pregunta, respuesta }) => (
            <div key={pregunta} className="space-y-1">
              <p className="text-base font-medium text-zinc-900">{pregunta}</p>
              <p className="text-sm text-zinc-700 leading-relaxed">{respuesta}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-fuchsia-50 p-6 md:p-8 space-y-3">
          <h3 className="section-title text-2xl">¿Más dudas o preguntas?</h3>
          <p className="text-sm text-zinc-700">WhatsApp al +56 9 7798 7629</p>
          <p className="text-sm text-zinc-700">Email: contacto@idhyoga.com</p>
          <p className="text-sm text-zinc-700">Dirección Compañía: Compañía 1516, Santiago Centro</p>
          <p className="text-sm text-zinc-700">Dirección Vergara: Vergara 644, Santiago Centro</p>
        </div>
      </section>
    </main>
  );
}
