const babelParser = require('@babel/eslint-parser');
const ftFlow = require('eslint-plugin-ft-flow');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/**', 'reports/**', 'lib/**'],
  },
  {
    files: ['__tests__/**/*.js'],
    languageOptions: {
      globals: globals.jest,
    },
  },
  {
    files: ['src/**/*.js', '__tests__/**/*.js', 'scripts/**/*.js'],
    plugins: {
      'ft-flow': ftFlow,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: true,
      },
    },
    rules: {
      ...ftFlow.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      'no-unused-vars': 1,
    },
  },
];
