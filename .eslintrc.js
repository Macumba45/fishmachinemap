module.exports = {
    globals: {
        window: true,
        document: true,
    },
    env: {
        browser: false,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'next',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    ignorePatterns: ['.eslintrc.js'],
    plugins: ['react', '@typescript-eslint'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@next/next/no-img-element': 'off',
        'jsx-a11y/alt-text': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',

        indent: 'off',
    },
}
