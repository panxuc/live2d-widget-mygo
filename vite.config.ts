import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'src/waifu-tips.js',
      },
      output: {
        dir: '.',
        entryFileNames: 'waifu-tips.js',
      },
    },
  },
});