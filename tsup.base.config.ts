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
        // A separate tsconfig to disable `composite` and `incremental` options
        // which are not compatible with tsup.
        // See https://github.com/egoist/tsup/issues/647
        tsconfig: './tsconfig.build.json',
        esbuildPlugins: [
            // This plugin rewrites our extension-less imports to use '.js' as required in bundler-less environments.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            esbuildPluginFilePathExtensions({ esmExtension: 'js' }),

            // This plugin copies JSON files to the output `dist` directory.
            // It resolves paths from the current working directory, so structure is kept.
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
