// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path")

/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "standard",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "prettier",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.resolve(__dirname, "tsconfig.json"),
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: path.resolve(__dirname, "tsconfig.json"),
      },
    },
  },
  plugins: ["react", "prettier", "import", "@typescript-eslint"],
  rules: {
    "prettier/prettier": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-var": "error",
    "no-param-reassign": "error",
    "prefer-const": "error",
    "import/no-unresolved": [
      "error",
      {
        ignore: [
          "HostedApp",
          // waiting for fix from: https://github.com/import-js/eslint-plugin-import/issues/1810
          // and be able to resolve package.json export paths
          "@commercelayer/react-components/",
        ],
      },
    ],
    "import/no-named-as-default": "off",
    "import/order": [
      "warn",
      {
        "newlines-between": "always",
        groups: ["external", "builtin", "parent", "sibling", "index"],
        pathGroups: [
          {
            pattern: "components/**",
            group: "parent",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["parent"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/prefer-namespace-keyword": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
}
