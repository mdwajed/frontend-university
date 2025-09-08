import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
export default tseslint.config([
  // Ignore dist folder globally
  globalIgnores(["dist", "build", "coverage"]),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    extends: [
      js.configs.recommended,

      // ✅ enable TypeScript rules
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,

      // ✅ React rules
      react.configs.recommended,
      react.configs["jsx-runtime"],

      // ✅ React DOM rules
      reactDom.configs.recommended,

      // ✅ React Hooks rules
      reactHooks.configs["recommended-latest"],

      // ✅ React Refresh rules for Vite
      reactRefresh.configs.vite,

      // ✅ Prettier (disable conflicting rules)
      prettier,
    ],

    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: new URL(".", import.meta.url).pathname,
      },
      ecmaVersion: "latest",
      globals: globals.browser,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Next.js/Vite don’t need React import
      "react/prop-types": "off",
    },
  },
]);
