import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    base: './',
    build: {
        outDir: 'docs',
        assetsDir: 'assets',
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'src/animations/*',
                    dest: 'animations'
                }
            ]
        })
    ]
});
