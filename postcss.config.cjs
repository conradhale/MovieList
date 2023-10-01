module.exports = {
    plugins: {
        'postcss-preset-env': { stage: 3 },
        '@fullhuman/postcss-purgecss': {
            content: ['./Views/**/*.cshtml', './src/*.ts'],
            variables: true,
            keyframes: true,
            safelist: {
                standard: ['html', 'body'],
                deep: [/^col/, /^modal/]
            },
            defaultExtractor: (content) =>
                content.match(/[\w-/:]+(?<!:)/g) || []
        }
    }
}
