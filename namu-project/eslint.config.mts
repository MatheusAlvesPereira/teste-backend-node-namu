import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { tseslint },
    extends: ['ts/recommended', 'prettier'],
    languageOptions: { globals: globals.node },
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  tseslint.configs.recommended,
  eslintConfigPrettier,
]);
