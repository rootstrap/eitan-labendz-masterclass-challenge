/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "www.masterclass.dev",
          port: "",
          pathname: "/course-images/attachments/**",
        },
      ],
    },
    async redirects() {
      return [
        {
          source: "/",
          destination: "/courses",
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;
