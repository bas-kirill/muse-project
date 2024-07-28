import globals from "globals";

const { browser } = globals.browser;
import { configs } from "@eslint/js";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: browser } },
  configs.recommended,
  // ...configs.recommended,
  // configs.flat.recommended
];
