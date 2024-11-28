const tseslint = require('typescript-eslint');
const eslint = require('@eslint/js');
const prettierPluginRecommended = require('eslint-plugin-prettier/recommended');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const globals = require('globals');

module.exports = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  prettierPluginRecommended,
  {
    languageOptions: {
      // Ensures we can use global vars like `__dirname`.
      globals: { ...globals.node },
    },
    rules: {
      // Allows us to use `require` in `js` files.
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'local',
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': [
        'error',
        { considerDefaultExhaustiveForUnions: true },
      ],
      'no-case-declarations': 'off',
      'no-constant-condition': 'off',
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: [
      '**/.nx/',
      'packages/contracts/src/typechain-types',
      '**/node_modules/',
      '**/dist',
    ],
  },
);
