import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended" // Ensure Prettier runs inside ESLint
  ),
  {
    rules: {
      "indent": ["error", 2], // Enforce 2-space indentation
      "@typescript-eslint/no-explicit-any": "warn", // Warn instead of error for `any`
      "no-console": "warn", // Prevent excessive console logs
      "semi": ["error", "always"], // Require semicolons
      "prettier/prettier": "error", // Ensure Prettier formatting is enforced
    },
  },
];

export default eslintConfig;