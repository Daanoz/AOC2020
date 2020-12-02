module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
        '@typescript-eslint/no-empty-function': ['off'],
        semi: ['error', 'never'],
        quotes: ['error', 'single']
    }
}