module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    env: {
        browser: true,
        node: true,
    },
    overrides: [
        {
            files: ['webpack.config.js'],
            rules: {
                '@typescript-eslint/no-require-imports': 'off'
            },
        },
    ],
};
