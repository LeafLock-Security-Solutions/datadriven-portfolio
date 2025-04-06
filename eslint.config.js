import js from '@eslint/js';
import jest from 'eslint-plugin-jest';
import jsdoc from 'eslint-plugin-jsdoc';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import security from 'eslint-plugin-security';
import tailwindcss from 'eslint-plugin-tailwindcss';
import globals from 'globals';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      jest,
      jsdoc,
      perfectionist,
      prettier,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      security,
      tailwindcss,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...security.configs.recommended.rules,
      ...tailwindcss.configs.recommended.rules,
      ...perfectionist.configs['recommended-alphabetical'].rules,
      ...jest.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
      'comma-dangle': ['error', 'always-multiline'],
      eqeqeq: ['error', 'always'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-indentation': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-types': 'error',
      'jsdoc/require-description': 'error',
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            ArrowFunctionExpression: false,
            ClassDeclaration: true,
            FunctionDeclaration: true,
            FunctionExpression: false,
            MethodDefinition: true,
          },
        },
      ],
      'jsdoc/require-param': 'error',
      'jsdoc/require-returns': 'error',
      'keyword-spacing': ['error', { after: true, before: true }],
      'max-len': ['error', { code: 100, ignoreComments: true, tabWidth: 2 }],
      'no-console': 'error',
      'no-implicit-coercion': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-shadow': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'object-curly-spacing': ['error', 'always'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: '*', prev: 'import' },
        { blankLine: 'any', next: 'import', prev: 'import' },
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
      'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off',
      semi: ['error', 'always'],
      'space-before-function-paren': ['error', 'never'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
