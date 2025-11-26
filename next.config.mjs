/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estático para subir a cPanel / Apache
  output: "export",
  trailingSlash: true,
  distDir: "rrhhdeploy",
  assetPrefix: "",
  basePath: "",

  // Opciones del compilador (puedes dejarlas si te sirven)
  compiler: {
    reactRemoveProperties: true,
  },

  // IMÁGENES: usar remotePatterns en Next 16
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sistemas.diresahuanuco.gob.pe",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "diresahuanuco.gob.pe",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "recursoshumanos.diresahuanuco.gob.pe",
        pathname: "/**",
      },
    ],
  },

  // TS: si quieres compilar aunque haya errores de typescript
  typescript: {
    ignoreBuildErrors: true,
  },

  // ⚠️ OJO:
  // - NO hay experimental.serverComponents (ya no es válido en Next 16)
  // - NO hay eslint aquí; se configura con eslint.config.mjs o .eslintrc
};

export default nextConfig;
