// eslint.config.js

import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import { browser } from "globals";
import { configs } from "@eslint/js";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  {
    languageOptions: {
      globals: browser,
    },
  },
  configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.recommended,
];
