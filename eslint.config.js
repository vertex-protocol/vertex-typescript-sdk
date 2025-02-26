const tseslint = require('typescript-eslint');
const eslint = require('@eslint/js');
const prettierPluginRecommended = require('eslint-plugin-prettier/recommended');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const jestPlugin = require('eslint-plugin-jest');
const globals = require('globals');

module.exports = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  prettierPluginRecommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      jest: jestPlugin,
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
    files: ['eslint.config.js'],
    languageOptions: {
      // Ensures we can use global vars like `__dirname`.
      globals: { ...globals.node },
    },
    rules: {
      // Allows us to use `require`.
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    ignores: [
      '**/.nx/',
      '**/node_modules/',
      '**/dist',
    ],
  },
);
