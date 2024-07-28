import kek from "@eslint/js";
import tseslint from 'typescript-eslint';

const { configs } = kek;

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  configs.recommended,
  ...tseslint.configs.recommended,
];
