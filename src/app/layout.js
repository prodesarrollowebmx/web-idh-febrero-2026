import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.idhyoga.com").replace(/\/$/, "");

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sansFont = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IDH Yoga | Escuela y Comunidad",
    template: "%s | IDH Yoga",
  },
  description: "Clases, talleres, asesorías, diplomado y espacios disponibles con enfoque integral de bienestar.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: siteUrl,
    siteName: "IDH Yoga",
    title: "IDH Yoga | Escuela y Comunidad",
    description: "Clases, talleres, asesorías, diplomado y espacios disponibles con enfoque integral de bienestar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "IDH Yoga | Escuela y Comunidad",
    description: "Clases, talleres, asesorías, diplomado y espacios disponibles con enfoque integral de bienestar.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${displayFont.variable} ${sansFont.variable} antialiased idh-body`}>
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
