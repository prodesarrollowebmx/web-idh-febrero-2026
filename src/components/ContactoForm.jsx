"use client";

import { useMemo, useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function sanitizeText(value) {
  return String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function ContactoForm({ contactoData, formClassName = "grid gap-4", mode = "contacto" }) {
  const isFooterForm = mode === "footer";
  const initialFields = useMemo(
    () =>
      contactoData.formulario.campos.reduce((acc, campo) => {
        acc[campo.nombre] = "";
        return acc;
      }, {}),
    [contactoData.formulario.campos]
  );

  const [formData, setFormData] = useState({
    sede: "",
    ...initialFields,
  });
  const [estado, setEstado] = useState({ tipo: "", mensaje: "" });
  const [enviando, setEnviando] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setEstado({ tipo: "", mensaje: "" });

    const payload = {
      sede: sanitizeText(formData.sede),
      nombre: sanitizeText(formData.nombre),
      email: sanitizeText(formData.email).toLowerCase(),
      mensaje: sanitizeText(formData.mensaje),
      source: isFooterForm ? "footer" : "contacto",
    };

    if ((!isFooterForm && !payload.sede) || !payload.nombre || !payload.email || !payload.mensaje) {
      setEstado({ tipo: "error", mensaje: "Completa todos los campos del formulario." });
      return;
    }

    if (!EMAIL_REGEX.test(payload.email)) {
      setEstado({ tipo: "error", mensaje: "Ingresa un correo electrónico válido." });
      return;
    }

    if (payload.nombre.length < 2 || payload.nombre.length > 120) {
      setEstado({ tipo: "error", mensaje: "El nombre debe tener entre 2 y 120 caracteres." });
      return;
    }

    if (payload.mensaje.length < 10 || payload.mensaje.length > 2000) {
      setEstado({ tipo: "error", mensaje: "El mensaje debe tener entre 10 y 2000 caracteres." });
      return;
    }

    setEnviando(true);

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responsePayload = await response.json();

      if (!response.ok) {
        throw new Error(responsePayload.error || "No se pudo enviar tu mensaje.");
      }

      setEstado({ tipo: "ok", mensaje: "Tu mensaje fue enviado correctamente." });
      setFormData({
        sede: "",
        ...initialFields,
      });
    } catch (error) {
      setEstado({
        tipo: "error",
        mensaje: error.message || "No se pudo enviar tu mensaje.",
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      {!isFooterForm ? (
        <select
          name="sede"
          required
          value={formData.sede}
          onChange={handleChange}
          onInvalid={(event) => {
            event.target.setCustomValidity("Selecciona una sede de la lista.");
          }}
          onInput={(event) => {
            event.target.setCustomValidity("");
          }}
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
      ) : null}

      {contactoData.formulario.campos.map((campo) => (
        campo.tipo === "textarea" ? (
          <textarea
            key={campo.nombre}
            name={campo.nombre}
            placeholder={campo.placeholder}
            rows={campo.filas}
            value={formData[campo.nombre]}
            onChange={handleChange}
            required
            className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm"
          />
        ) : (
          <input
            key={campo.nombre}
            type={campo.tipo}
            name={campo.nombre}
            placeholder={campo.placeholder}
            value={formData[campo.nombre]}
            onChange={handleChange}
            minLength={campo.nombre === "nombre" ? 2 : undefined}
            maxLength={campo.nombre === "nombre" ? 120 : undefined}
            required
            className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm"
          />
        )
      ))}

      <button
        type="submit"
        disabled={enviando}
        className="rounded-full bg-[#5b7fa8] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white disabled:opacity-60"
      >
        {enviando ? "Enviando..." : contactoData.formulario.boton}
      </button>

      {estado.mensaje ? (
        <p
          className={`text-sm ${estado.tipo === "ok" ? "text-zinc-600" : "text-red-600"}`}
          role="status"
          aria-live="polite"
        >
          {estado.mensaje}
        </p>
      ) : null}
    </form>
  );
}
