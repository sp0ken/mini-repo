module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'prettier/vue'],

  // required to lint *.vue files
  plugins: ['vue'],

  // add your custom rules here
  rules: {
    'vue/no-v-html': 'off',
    'no-console': 'off',
    'no-irregular-whitespace': 'off'
  },

  globals: {
    $nuxt: true
  }
}
