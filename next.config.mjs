import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin ();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '/**', // Match all paths under the domain
      },
    ],
  },
};

export default withNextIntl (nextConfig);
