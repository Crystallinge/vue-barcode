const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const pkg = require('./package');

const now = new Date();

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/vue-barcode.js',
      format: 'umd',
    },
    {
      file: 'dist/vue-barcode.common.js',
      format: 'cjs',
    },
    {
      file: 'dist/vue-barcode.esm.js',
      format: 'es',
    },
    {
      file: 'docs/js/vue-barcode.js',
      format: 'umd',
    },
  ],
  name: 'VueBarcode',
  plugins: [
    nodeResolve(),
    commonjs(),
    babel(),
  ],
  banner: `/*!
 * vue-barcode v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) ${now.getFullYear()} Xkeshi
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */
`,
};
