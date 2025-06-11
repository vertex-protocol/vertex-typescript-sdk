import path from 'path';

/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
    // Type check, Lint check and prettify
    '!(dist/**/*)**/*.(ts|tsx|js)': (filenames) => {
        const relativeFiles = filenames.map((f) => path.relative(path.resolve('.'), f));
        return [
            `pnpm typecheck`,
            `pnpm eslint --cache --fix ${relativeFiles.join(' ')}`,
            `pnpm depcruise ${relativeFiles.join(' ')}`,
            `pnpm prettier --write ${relativeFiles.join(' ')}`,
        ];
    },

    // Prettify
    '**/*.(md|json)': (filenames) => {
        const relativeFiles = filenames.map((f) => path.relative(path.resolve('.'), f));
        return [
            `pnpm prettier --write ${relativeFiles.join(' ')}`
        ];
    },
};

export default config;