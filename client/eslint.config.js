// eslint.config.js

import { configs as tsConfigs } from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { browser } from "globals";
import { configs as jsConfigs } from "@eslint/js";

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
  ...tsConfigs.recommended,
  pluginReact.configs.recommended,
];
