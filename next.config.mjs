/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: "rrhhdeploy",
  assetPrefix: "",
  basePath: "",

  // AGREGAR ESTO para deshabilitar completamente RSC
  experimental: {
    serverComponents: false,
  },

  // Deshabilitar features que causan el problema
  compiler: {
    reactRemoveProperties: true,
  },

  images: {
    unoptimized: true,
    domains: [
      "sistemas.diresahuanuco.gob.pe",
      "diresahuanuco.gob.pe",
      "recursoshumanos.diresahuanuco.gob.pe",
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
