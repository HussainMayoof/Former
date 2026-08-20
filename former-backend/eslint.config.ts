import globals from 'globals';
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigESLint from 'eslint-config-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
    js.configs.recommended,
    tseslint.configs.recommended,
    eslintConfigESLint,
    eslintConfigPrettier,
    {
        ignores: ['src/generated/**', 'dist/**', 'node_modules/**'],
    },
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        rules: {
            'no-console': 'off',
            'new-cap': 'off',
            'func-style': 'off',
            'unicorn/prefer-string-slice': 'off',
            'no-undefined': 'off',
        },
    },
]);
