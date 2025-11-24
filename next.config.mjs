/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: "rrhhdeploy",
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
