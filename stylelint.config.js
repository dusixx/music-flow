/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
    'stylelint-config-prettier-scss',
  ],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9-]*$',
      {
        message: 'Class names should use kebab-case or camelCase',
      },
    ],
    'max-nesting-depth': 4,
    'no-descending-specificity': null,
    'scss/comment-no-empty': null,
    'no-empty-source': null,
  },
  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/.angular/**', 'src/assets/**'],
};
