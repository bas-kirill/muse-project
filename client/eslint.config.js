import globals from "globals";
import kek from "@eslint/js";
import tseslint from 'typescript-eslint';

const { browser } = globals.browser;
const { configs } = kek;

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: browser } },
  configs.recommended,
  ...tseslint.configs.recommended,
  // ...configs.recommended,
  // configs.flat.recommended
];
