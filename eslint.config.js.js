// @ts-check

import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactNativePlugin from "eslint-plugin-react-native";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  // Configurações globais
  {
    ignores: ["node_modules", ".expo", "dist", "build"],
  },

  // Configuração recomendada do ESLint
  js.configs.recommended,

  // Configurações para TypeScript
  ...tseslint.configs.recommended,

  // Configurações para React
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "react-native": reactNativePlugin,
      "simple-import-sort": simpleImportSortPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...reactNativePlugin.configs.all.globals,
      },
    },
    rules: {
      // Regras do React
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // Desnecessário com Expo/React 17+
      "react/prop-types": "off", // Desnecessário com TypeScript

      // Regras do React Hooks
      ...reactHooksPlugin.configs.recommended.rules,

      // Regras de ordenação de imports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Configuração do Prettier
  // Deve ser a ÚLTIMA para sobrescrever outras regras de formatação.
  prettierPlugin,
);
