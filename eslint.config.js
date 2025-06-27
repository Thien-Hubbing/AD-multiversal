// @ts-check
import vue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

const config = tseslint.config(
  tseslint.configs.strict,
  ...vue.configs["flat/vue2-recommended"],
  stylistic.configs.recommended,
  {
    rules: {
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/brace-style": ["error", "1tbs"],
    },
  },
  {
    files: ["**/*.ts", "**/*.js", "**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        projectService: true,
        tsconfigBaseDir: import.meta.dirname,
        extraFileExtensions: [".vue"],
      },
    },
  },
);

export default config;
