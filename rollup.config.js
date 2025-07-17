import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        preferBuiltins: false,
      }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
    external: (id) => {
      return ['react', 'react-dom', 'react/jsx-runtime'].includes(id) || 
             id.startsWith('react/') || 
             id.startsWith('react-dom/') ||
             ['date-fns'].includes(id) ||
             id.startsWith('date-fns/');
    },
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts({ tsconfig: './tsconfig.json' })],
    external: (id) => {
      return /\.css$/.test(id) ||
             ['react', 'react-dom', 'react/jsx-runtime'].includes(id) || 
             id.startsWith('react/') || 
             id.startsWith('react-dom/') ||
             ['date-fns'].includes(id) ||
             id.startsWith('date-fns/');
    },
  },
];
