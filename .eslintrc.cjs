/* eslint-disable zhlint/zhlint */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  plugins: ['react', '@typescript-eslint', 'jest', 'prettier', 'import', 'unused-imports', 'zhlint'],
  extends: [
    // airbnb 规范
    // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
    'airbnb-base',
    // 兼容 typescript 的 airbnb 规范
    // https://github.com/iamturns/eslint-config-airbnb-typescript
    'airbnb-typescript/base',

    // typescript 的 eslint 插件
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',

    // 支持 jest
    'plugin:jest/recommended',
    // 使用 prettier 格式化代码
    // https://github.com/prettier/eslint-config-prettier#readme
    'prettier',
    // 整合 typescript-eslint 与 prettier
    // https://github.com/prettier/eslint-plugin-prettier
    'plugin:prettier/recommended',
    // storybook
    'plugin:storybook/recommended',
  ],
  rules: {
    /* ********************************** ES6+ ********************************** */
    'no-console': 0,
    'no-var-requires': 0,
    'no-restricted-syntax': 0,
    'no-continue': 0,
    'no-await-in-loop': 0,
    'no-return-await': 0,
    'no-unused-vars': 0,
    'no-multi-assign': 0,
    'no-param-reassign': [2, { props: false }],
    'import/prefer-default-export': 0,
    'import/no-cycle': 0,
    'import/no-dynamic-require': 0,
    'max-classes-per-file': 0,
    'class-methods-use-this': 0,
    'guard-for-in': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-lonely-if': 0,
    'no-bitwise': ['error', { allow: ['~'] }],
    'no-shadow': 0,
    /* ********************************** Module Import ********************************** */
    'import/no-absolute-path': 0,
    'import/extensions': 0,
    'import/no-named-default': 0,
    'no-restricted-exports': 0,

    // 一部分文件在导入 devDependencies 的依赖时不报错
    'import/no-extraneous-dependencies': [
      1,
      {
        devDependencies: ['**/*.test.{ts,js,tsx}', '**/*.spec.{ts,js,tsx}', './test/**/*.{ts,js,tsx}', '**/*.stories.{ts,js,tsx}'],
      },
    ],
    // 模块导入顺序规则
    'import/order': [
      1,
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        alphabetize: { order: 'asc', caseInsensitive: false },
        'newlines-between': 'always-and-inside-groups',
        warnOnUnassignedImports: true,
      },
    ],
    // 自动删除未使用的导入
    // https://github.com/sweepline/eslint-plugin-unused-imports
    'unused-imports/no-unused-imports': 1,
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    /* ********************************** Typescript ********************************** */
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unnecessary-type-assertion': 0,
    '@typescript-eslint/require-await': 0,
    '@typescript-eslint/no-for-in-array': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-shadow': 'warn',
    /*  ********************************** 其它 ********************************** */
    'zhlint/zhlint': [
      'warn',
      {
        lintComments: true,
        lintStringLiterals: true,
        zhlint: {
          rules: {
            halfWidthPunctuation: '',
            fullWidthPunctuation: '',
            unifiedPunctuation: 'simplified',
            spaceBetweenHalfWidthLetters: false,
            spaceAfterHalfWidthPunctuation: false,
          },
        },
      },
    ],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
    ],
    'jest/expect-expect': [
      'error',
      { assertFunctionNames: ['expect', 'request.*.expect', 'spec.*', '*.step*.spec', '*.cleanup*'] },
    ],
  },
  settings: {
    extensions: ['.ts', '.d.ts', '.cts', '.mts', '.js', '.cjs', '.mjs', '.json'],
  },
};
