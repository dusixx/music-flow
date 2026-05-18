export default {
  '*.{ts,js}': ['npm run lint:fix', 'npm run format:fix'],
  '*.{css,scss}': ['npm run stylelint:fix', 'npm run format:fix'],
  '*.{html,json,md}': ['npm run format:fix'],
};
