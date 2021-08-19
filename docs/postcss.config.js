const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    // purgecss({
    //   content: ['./docs/index.html'],
    //   defaultExtractor: (content) => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
    //   safelist: ['menu__link--h2', 'menu__link--h3', 'is-current']
    // })
  ]
}