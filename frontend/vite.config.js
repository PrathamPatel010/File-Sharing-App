import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

const manifestForPlugin = {
    registerType: "prompt",
    manifest: {
        name: "QuickShare",
        short_name: "QuickShare",
        description: "Password Protected File Sharing App",
        icons: [{
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/maskable_1.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "apple touch icon"
            },
            {
                src: "/maskable_2.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable"
            }
        ],
        theme_color: '#f0e7db',
        background_color: '#17181f',
        display: "standalone",
        scope: '/',
        start_url: "/",
        orientation: 'portrait'
    },
};

export default defineConfig({
    base: "./",
    plugins: [react(), VitePWA(manifestForPlugin)],
})