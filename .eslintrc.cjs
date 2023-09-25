const { resolve } = require('node:path');

const isProduction = process.env.NODE_ENV === 'production';
const extensions = ['.ts', '.tsx'];
const err = 'error';


const PATHS = {
  npm: resolve(`${process.cwd()}/node_modules`),
  src: resolve(`${process.cwd()}/src`),
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true,
      jsx: true,
      modules: true,
    },
  },
  plugins: [
    'import',
  ],
  rules: {
    'arrow-parens': [err, 'as-needed'],
    'comma-dangle': [
      err, {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'comma-spacing': [
      err,
      {
        before: false,
        after: true,
      },
    ],
    eqeqeq: 2,
    'import/prefer-default-export': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': [
      err,
      {
        // devDependencies: false,
        // optionalDependencies: false,
        // peerDependencies: false,
        // bundleDependencies: false,
        // packageDir: './'
      },
    ],
    'import/extensions': [
      err,
      'never',
      {
        'png': 'always',
      },
    ],
    indent: [err, 2, { SwitchCase: 1 }],
    quotes: [2, 'single'],
    'linebreak-style': [
      err,
      isProduction ? 'unix' : 'windows',
    ],
    'jsx-quotes': [2, 'prefer-single'],
    'max-len': [
      err,
      {
        code: 80,
        tabWidth: 2,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-alert': isProduction ? 2 : 0,
    'no-console': isProduction ? 2 : 0,
    'no-debugger': isProduction ? 2 : 0,
    'no-dynamic-require': 0,
    'no-restricted-globals': 0,
    'no-underscore-dangle': [
      err,
      {
        allow: [
          '_root',
        ],
      },
    ],
    'no-unused-vars': [err, { args: 'none' }],
    'no-unused-expressions': [
      err,
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    semi: [err, 'always'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions,
        moduleDirectory: [PATHS.npm, PATHS.src],
      },
    },
  }
};
