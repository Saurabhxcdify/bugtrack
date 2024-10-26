/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: "/",
            destination: "/projects",
            permanent: true,
          },
        ];
    },
};

export default nextConfig;
