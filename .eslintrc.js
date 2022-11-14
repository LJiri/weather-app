module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
    rules: {},
    settings: {
        "import/resolver": {
            typescript: {},
        },
        react: {
            // eslint-plugin-react automatically detects react version
            version: "detect",
        },
    },
    globals: {
        window: true,
        module: true,
    },
};
