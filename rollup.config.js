const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const pkg = require('./package');

const now = new Date();

export default {
  entry: 'src/index.js',
  targets: [
    {
      dest: 'dist/vue-barcode.js',
    },
    {
      dest: 'dist/vue-barcode.common.js',
      format: 'cjs',
    },
    {
      dest: 'dist/vue-barcode.esm.js',
      format: 'es',
    },
    {
      dest: 'docs/js/vue-barcode.js',
    },
  ],
  format: 'umd',
  moduleName: 'VueBarcode',
  plugins: [
    nodeResolve({
      jsnext: true,
    }),
    commonjs(),
    babel(),
  ],
  banner: `/*!
 * vue-barcode v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) ${now.getFullYear()} ${pkg.author}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */
`,
};
