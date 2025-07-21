// functions/eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig({
  files: ['**/*.js'],
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'script', // CommonJS（require対応）
    globals: globals.node,
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
});