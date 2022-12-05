import 'dotenv/config';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import strip from '@rollup/plugin-strip';
import terser from '@rollup/plugin-terser';

const { SERVICE_URL, APPLICATION_NAME, PERFORMANCE_OBSERVER_METRICS } =
  process.env;

export default {
  input: 'src/perf.ts',
  output: [
    {
      file: 'build/perf.js',
      format: 'iife',
    },
  ],
  plugins: [
    replace({
      'preventAssignment': true,
      'process.env.SERVICE_URL': JSON.stringify(SERVICE_URL),
      'process.env.APPLICATION_NAME': JSON.stringify(APPLICATION_NAME),
      'process.env.PERFORMANCE_OBSERVER_METRICS': JSON.stringify(
        PERFORMANCE_OBSERVER_METRICS,
      ),
    }),
    json({
      namedExports: false,
    }),
    nodeResolve({
      mainFields: ['jsnext:main', 'main'],
    }),
    commonjs({
      include: ['./src/perf.js', 'node_modules/**'], // Default: undefined
      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false, // Default: false
      sourceMap: false, // Default: true
    }),
    typescript({
      typescript: require('typescript'),
    }),
    strip(),
    terser({
      module: false,
      mangle: true,
      compress: true,
      output: {
        comments: false,
      },
    }),
  ],
};
