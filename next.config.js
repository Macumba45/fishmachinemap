/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
    },

    compiler: {
        styledComponents: true,
    },
    reactStrictMode: true,
}

module.exports = nextConfig
