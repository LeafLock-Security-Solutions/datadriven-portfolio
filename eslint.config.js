import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import jsdoc from 'eslint-plugin-jsdoc';
import perfectionist from 'eslint-plugin-perfectionist';
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
        __APP_VERSION__: 'readonly',
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      jest,
      jsdoc,
      perfectionist,
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
      ...prettierConfig.rules,
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          selector: 'variableLike',
        },
        {
          format: ['camelCase', 'PascalCase'],
          selector: 'function',
        },
        {
          format: ['PascalCase'],
          selector: 'class',
        },
        {
          custom: {
            match: false,
            regex: '^I[A-Z]',
          },
          format: ['PascalCase'],
          selector: 'interface',
        },
        {
          format: ['PascalCase'],
          selector: 'typeAlias',
        },
        {
          format: ['PascalCase'],
          selector: 'enum',
        },
        {
          format: ['UPPER_CASE', 'PascalCase'],
          selector: 'enumMember',
        },
        {
          format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
          modifiers: ['const'],
          selector: 'variable',
        },
      ],
      eqeqeq: ['error', 'always'],
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
      'no-console': 'error',
      'no-implicit-coercion': 'error',
      'no-shadow': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: '*', prev: 'import' },
        { blankLine: 'any', next: 'import', prev: 'import' },
      ],
      'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
