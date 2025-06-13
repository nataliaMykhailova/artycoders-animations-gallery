// vite.config.js
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    base: './',          // важливо – всі шляхи стануть відносними
    build: {
        outDir: 'docs',     // Vite запише готовий сайт у папку docs/
        assetsDir: 'assets' // туди ж потраплять JS/CSS зібрані файли
    },
    plugins: [
        viteStaticCopy({
            targets: [
                { src: 'src/animations/*', dest: 'animations' }
            ]
        })
    ]
});
