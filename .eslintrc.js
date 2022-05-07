module.exports = {
    "root": true,
    "extends": [
      "eslint:recommended"
    ],
    "overrides": [
      {
        "files": [
          "**/*.ts",
          "**/*.tsx"
        ],
        "parser": "@typescript-eslint/parser",
        "extends": [
          "plugin:@typescript-eslint/recommended"
        ],
        "rules": {
          "@typescript-eslint/no-non-null-assertion": "off",
          "@typescript-eslint/no-use-before-define": "off",
          "@typescript-eslint/no-warning-comments": "off",
          "@typescript-eslint/no-empty-function": "off",
          "@typescript-eslint/no-var-requires": "off",
          "@typescript-eslint/explicit-function-return-type": "off",
          "@typescript-eslint/explicit-module-boundary-types": "off",
          "@typescript-eslint/ban-types": "off",
          "@typescript-eslint/camelcase": "off",
          "no-dupe-class-members": "off",
          "require-atomic-updates": "off",
        },
        "parserOptions": {
          "ecmaVersion": 2022,
          "sourceType": "module"
        }
      }
    ],
    "rules": {
      "semi": ["error", "never"],
    }
  }