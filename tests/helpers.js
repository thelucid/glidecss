const sass = require('sass');

module.exports.render = (options) => {
  return sass.renderSync({
    outputStyle: 'compressed',
    includePaths: ['../'],
    ...options
  });
};