import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'src/waifu-tips.js',
        autoload: 'src/autoload.js',
      },
      output: {
        dir: '.',
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'main' ? 'waifu-tips.js' :
            chunkInfo.name === 'autoload' ? 'autoload.js' :
              '[name].js';
        },
      },
    },
  },
});