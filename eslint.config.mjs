import { configs as tsConfigs } from "@typescript-eslint/eslint-plugin";
import globals from "globals";

export default [
  {
    files: ["*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  ...tsConfigs.recommended,
];
   