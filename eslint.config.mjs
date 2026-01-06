import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat for old-style shareable configs
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommended: true, // enables recommended rules
});

export default [
  // Next.js + TypeScript
  ...compat.extends(["next/core-web-vitals", "next/typescript"]),

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: require("eslint-plugin-react")
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    }
  }
];
