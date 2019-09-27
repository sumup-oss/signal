import 'dotenv/config';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';

const { SERVICE_URL, APPLICATION_NAME } = process.env;

export default {
  input: 'src/perf.ts',
  output: [
    {
      file: 'build/perf.js',
      format: 'iife'
    }
  ],
  plugins: [
    replace({
      'process.env.SERVICE_URL': JSON.stringify(SERVICE_URL),
      'process.env.APPLICATION_NAME': JSON.stringify(APPLICATION_NAME)
    }),
    json({
      namedExports: false
    }),
    nodeResolve({
      mainFields: ['module', 'main']
    }),
    commonjs({
      include: ['./src/perf.js', 'node_modules/**'], // Default: undefined

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false, // Default: false
      sourceMap: false // Default: true
    }),
    typescript({
      typescript: require('typescript')
    }),
    terser()
  ]
};
