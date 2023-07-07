/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { joinPathFragments } from '@nx/devkit';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/react-draft-wysiwyg-input',

  plugins: [
    dts({
      entryRoot: 'src',
      tsConfigFilePath: joinPathFragments(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
      insertTypesEntry: true, // tannv notes: add [name].d.ts per entry point
    }),
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: {
        index: 'src/index.ts',
        validators: 'src/lib/validators/index.ts',
        utils: 'src/lib/utils/index.ts',
      },
      name: 'react-draft-wysiwyg-input',
      fileName: '[name]',
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'draft-js',
        'react-draft-wysiwyg',
        'class-validator',
        'draftjs-to-html',
      ],
    },
  },
});
