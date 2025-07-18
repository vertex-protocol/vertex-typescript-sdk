import { defineConfig } from 'tsup';
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';
import { copy } from 'esbuild-plugin-copy';

export default defineConfig([
    {
        entry: ['src/**/*.ts'],
        format: ['cjs', 'esm'],
        target: 'esnext',
        outDir: 'dist',
        dts: true,
        sourcemap: true,
        clean: true,
        tsconfig: './tsconfig.build.json',
        esbuildPlugins: [
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            esbuildPluginFilePathExtensions({ esmExtension: 'js' }),
            copy({
                resolveFrom: 'cwd',
                assets: {
                    from: ['./src/**/*.json'],
                    to: ['./dist'],
                },
            }),
        ],
    },
]);
