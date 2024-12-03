import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin ();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rdetnsqoqldakdjkaatr.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/listingImages/**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '/**', // Match all paths under the domain
      },
    ],
  },
};

export default withNextIntl (nextConfig);
