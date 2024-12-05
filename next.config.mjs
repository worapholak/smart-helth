/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      optimizeCss: true,
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
    poweredByHeader: false,
  };
  
  export default nextConfig;