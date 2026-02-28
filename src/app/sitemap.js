import talleresData from "../../secciones/talleres.json";
import asesoriasData from "../../secciones/home/asesorias.json";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.idhyoga.com").replace(/\/$/, "");

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    "",
    "/clases",
    "/talleres",
    "/diplomado",
    "/asesorias",
    "/espacios",
    "/contacto",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const talleresRoutes = (talleresData.cursos || [])
    .filter((taller) => taller?.activo)
    .map((taller) => ({
      url: `${siteUrl}/talleres/${taller.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  const asesoriasRoutes = (asesoriasData.servicios || []).map((servicio) => ({
    url: `${siteUrl}/asesorias/${servicio.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...talleresRoutes, ...asesoriasRoutes];
}
