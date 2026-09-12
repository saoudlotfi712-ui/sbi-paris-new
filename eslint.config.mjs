import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/purity": "warn",
      "react/no-unescaped-entities": "warn",
      "@next/next/no-html-link-for-pages": "warn",
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    "app-before-hreflang/**",
    "**/*.before-*.tsx",
    "**/*.clean-before-*.tsx",
    "**/*.bak",

    "apply-batch1-messages.cjs",
    "apply-batch1-pages.cjs",
    "fix-home-translations.cjs",
    "fix-i18n.cjs",
  ]),
]);

export default eslintConfig;