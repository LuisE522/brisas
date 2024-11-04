// next.config.js
/* const { i18n } = require('./next-i18next.config'); */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "**",
        },
    ],
},
};

module.exports = nextConfig;