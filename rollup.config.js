import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/formique-builder.js',
  output: [
    {
      file: 'dist/formique-builder.umd.js',
      format: 'umd',
      name: 'FormiqueBuilder', // Global variable name
      sourcemap: true
    },
    {
      file: 'dist/formique-builder.umd.min.js',
      format: 'umd',
      name: 'FormiqueBuilder',
      plugins: [terser()],
      sourcemap: true
    },
    {
      file: 'dist/formique-builder.esm.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/formique-builder.cjs.js',
      format: 'cjs',
      sourcemap: true
    }
  ],
  plugins: [resolve(), commonjs()]
};