// @ts-check
import eslintJs from '@eslint/js';
import angularEslint, { processInlineTemplates } from 'angular-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { ignores: ['dist', '**/*.test.ts', '**/*.test.js', '**/*.test.tsx'] },
  {
    files: ['**/*.ts'],
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angularEslint.configs.tsRecommended,
    ],
    plugins: {
      prettier: prettierPlugin,
    },
    processor: processInlineTemplates,
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_[^_].*$|^_$',
          varsIgnorePattern: '^_[^_].*$|^_$',
          caughtErrorsIgnorePattern: '^_[^_].*$|^_$',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      angularEslint.configs.templateRecommended,
      angularEslint.configs.templateAccessibility,
    ],
    rules: {},
  },
  prettier,
]);
