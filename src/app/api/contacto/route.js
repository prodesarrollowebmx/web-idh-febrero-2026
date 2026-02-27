import { Resend } from "resend";
import contactoData from "../../../../secciones/home/contacto.json";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const FOOTER_RECIPIENT = "contacto@idhyoga.com";
const CONTACT_RECIPIENTS_BY_SEDE = {
  centro: "contacto@idhyoga.com",
  vergara: "vergara@idhyoga.com",
  online: "contacto@idhyoga.com",
};

const sedesById = contactoData.sedes.reduce((acc, sede) => {
  acc[sede.id] = sede;
  return acc;
}, {});

function sanitizeText(value) {
  return String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export async function POST(request) {
  if (!resend) {
    return Response.json(
      { error: "Falta configurar RESEND_API_KEY." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const nombre = sanitizeText(body?.nombre);
  const email = sanitizeText(body?.email).toLowerCase();
  const mensaje = sanitizeText(body?.mensaje);
  const sedeId = sanitizeText(body?.sede);
  const source = sanitizeText(body?.source).toLowerCase();

  if (!nombre || !email || !mensaje || (source !== "footer" && !sedeId)) {
    return Response.json(
      { error: "Completa todos los campos del formulario." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return Response.json(
      { error: "Ingresa un correo electrónico válido." },
      { status: 400 }
    );
  }

  if (nombre.length < 2 || nombre.length > 120) {
    return Response.json(
      { error: "El nombre debe tener entre 2 y 120 caracteres." },
      { status: 400 }
    );
  }

  if (mensaje.length < 10 || mensaje.length > 2000) {
    return Response.json(
      { error: "El mensaje debe tener entre 10 y 2000 caracteres." },
      { status: 400 }
    );
  }

  const sede = sedesById[sedeId];
  const recipient = source === "footer" ? FOOTER_RECIPIENT : CONTACT_RECIPIENTS_BY_SEDE[sedeId];

  if (!recipient) {
    return Response.json(
      { error: "La sede seleccionada no tiene destinatario configurado." },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to: [recipient],
      replyTo: email,
      subject: `Nueva consulta web (${source === "footer" ? "Footer" : sede?.nombre || "Contacto"})`,
      text: `Origen: ${source === "footer" ? "footer" : "contacto"}\nSede: ${sede?.nombre || "No aplica"}\nNombre: ${nombre}\nCorreo: ${email}\n\nMensaje:\n${mensaje}`,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "No fue posible enviar el correo. Intenta nuevamente." },
      { status: 500 }
    );
  }
}
