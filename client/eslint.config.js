import { browser } from "globals";
import { configs } from "@eslint/js";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: browser } },
  configs.recommended,
  ...configs.recommended,
  configs.flat.recommended,
];
