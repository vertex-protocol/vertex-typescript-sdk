module.exports = {
  // Type check, Lint check and prettify
  '**/*.(ts|tsx|js)': (filenames) => [
    'yarn lint',
    `yarn prettier --write ${filenames.join(' ')}`,
  ],
  // Prettify
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
};
