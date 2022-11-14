module.exports = {
    arrowParens: "avoid",
    endOfLine: "lf",
    printWidth: 120,
    tabWidth: 4,
    trailingComma: "all",
    overrides: [
        {
            files: ["*.tsx", "*.scss", "*.less", "*.html"],
            options: {
                printWidth: 150,
            },
        },
    ],
};
