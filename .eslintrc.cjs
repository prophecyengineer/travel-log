// {
//   "extends": "next/core-web-vitals"
// }

module.exports = {
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  extends: [
    'next/core-web-vitals',
    'airbnb-base',
    'airbnb-typescript',

  ],
  rules: {
    'no-underscore-dangle': 0,
  },
};