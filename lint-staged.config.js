export default {
  '*.{ts,js}': ['eslint --fix', 'prettier --write --list-different --ignore-unknown'],
  '*.{css,scss}': ['stylelint --fix', 'prettier --write --list-different --ignore-unknown'],
  '*.{html,json,md}': ['prettier --write --list-different --ignore-unknown'],
};
