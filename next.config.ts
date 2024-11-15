// next.config.js
const next = require('next');

const nextConfig = {
  images: {
    domains: ['uploadthing.com', 'utfs.io'],
  },
};

module.exports = nextConfig;
// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['uploadthing.com', 'utfs.io'], // Przykład: dodanie domen do konfiguracji Next.js
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/login',
        permanent: false,
      },
    ];
  },
};
