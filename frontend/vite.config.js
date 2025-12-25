import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      manifest: {
        name: "Blooger",
        short_name: "Blog",
        description: "welcome to our blog channel",
        theme_color: "#777C6D",
        icons: [
          {
            src: "icons/blog_icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "icons/blog_icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "icons/blog_icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "icons/blog_icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "icons/blog_icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "icons/blog_icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "icons/blog_icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/blog_icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "icons/blog_icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "icons/blog_icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url:'/',
        display:'standalone'
      },
      registerType:'autoUpdate'
    }),
  ],
});
