import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // Extensões essenciais
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),

  // Regras globais
  {
    rules: {
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // Regras específicas para arquivos TS/TSX
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      'react/jsx-key': 'error',
      'no-console': ['warn', { allow: ['log', 'warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': ['warn'],
      'no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
]

export default eslintConfig
