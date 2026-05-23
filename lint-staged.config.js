export default {
  '*.{ts,js,html}': ['eslint --fix', 'prettier --write --list-different --ignore-unknown'],
  '*.{css,scss}': ['stylelint --fix', 'prettier --write --list-different --ignore-unknown'],
  '*.{json,md}': ['prettier --write --list-different --ignore-unknown'],
};
