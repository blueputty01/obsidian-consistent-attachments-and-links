import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dotenv from 'dotenv';
import copy from 'rollup-plugin-copy';

dotenv.config();

const rootPath = `${process.env.OBSIDIAN_PATH}/consistent-attachments-and-links`;

export default {
  input: 'src/main.ts',
  output: {
    dir: rootPath,
    sourcemap: 'inline',
    format: 'cjs',
    exports: 'default',
  },
  external: ['obsidian'],
  plugins: [
    typescript(),
    nodeResolve({ browser: true }),
    commonjs(),
    copy({
      targets: [{ src: 'manifest.json', dest: rootPath }],
    }),
  ],
};
