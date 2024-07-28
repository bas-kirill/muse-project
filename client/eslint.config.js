// eslint.config.js

import { tsConfigs } from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { browser } from "globals";
import { jsConfigs } from "@eslint/js";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  {
    languageOptions: {
      globals: browser,
    },
  },
  jsConfigs.recommended,
  ...tsConfigs.configs.recommended,
  pluginReact.configs.recommended,
];
