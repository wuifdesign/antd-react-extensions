import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import del from 'rollup-plugin-delete';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    external(),
    postcss({ modules: true }),
    typescript({
      tsconfigOverride: {
        exclude: [
          'node_modules',
          'dist',
          'rollup.config.js',
          '**/*.stories.tsx',
          '**/*.spec.tsx',
          '**/*.spec.ts',
        ],
      },
      rollupCommonJSResolveHack: false,
      clean: true,
    }),
    commonjs(),
  ],
};
