const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    purgecss({
      content: ['./index.html'],
      defaultExtractor: (content) => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
      safelist: ['menu__link--h2', 'menu__link--h3', 'is-current']
    })
  ]
}