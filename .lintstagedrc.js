import path from 'path';

/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
    // Type check, Lint check and prettify
    '!(dist/**/*)**/*.(ts|tsx|js)': (filenames) => {
        const relativeFiles = filenames.map((f) => path.relative(path.resolve('.'), f));
        return [
            `yarn typecheck`,
            `yarn eslint --cache --fix ${relativeFiles.join(' ')}`,
            `yarn depcruise ${relativeFiles.join(' ')}`,
            `yarn prettier --write ${relativeFiles.join(' ')}`,
        ];
    },

    // Prettify
    '**/*.(json)': (filenames) => {
        const relativeFiles = filenames.map((f) => path.relative(path.resolve('.'), f));
        return [
            `yarn prettier --write ${relativeFiles.join(' ')}`
        ];
    },
};

export default config;