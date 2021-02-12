import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { readdirSync } from 'fs';

const inputBase = 'ui/js';
const outputBase = 'public/js';
const shouldSourcemap = process.env.NODE_ENV !== 'production';

const jsBundle = (name) => {
  return {
    context: 'window',
    input: `${inputBase}/${name}.ts`,
    output: {
      sourcemap: shouldSourcemap,
      file: `${outputBase}/${name}.bundle.js`,
      format: 'iife',
    },
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: 'tsconfig.client.json',
        sourceMap: shouldSourcemap,
      }),
      terser(),
    ],
  };
};

const filesToBundle = readdirSync(inputBase).filter((filename) =>
  filename.endsWith('.ts'),
);

export default filesToBundle.map((filename) => {
  const filenameWithoutExtension = filename.substring(
    0,
    filename.lastIndexOf('.'),
  );

  return jsBundle(filenameWithoutExtension);
});
