module.exports = {
  root: false,
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'taro/vue3',
    '@vant',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2015,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', require('path').resolve(__dirname, './')],
          ['@', require('path').resolve(__dirname, './src')],
          [
            'components',
            require('path').resolve(__dirname, '../packages/components/src'),
          ],
          [
            'xmipra',
            require('path').resolve(__dirname, '../packages/xmipra/src'),
          ],
        ],
        extensions: ['.vue', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-namespace': [
      'error',
      {
        allowDeclarations: true,
      },
    ],
  },
}
