const { render } = require('./helpers');

describe('theme mixin', () => {
  it('defines a theme', () => {
    const data = `
      @import "./base";

      @include theme((
        palette: (
          accent: #f80
        )
      ));

      a { color: fetch(palette, accent); }
    `;

    expect(render({ data }).css.toString()).toEqual('a{color:#f80}');
  });

  it('performs non destructive merge', () => {
    const data = `
      @import "./base";

      @include theme((
        palette: (
          accent: #f80
        )
      ));

      @include theme((
        palette: (
          primary: #333,
          accent: #ff0
        )
      ));

      a {
        color: fetch(palette, primary);
        background: fetch(palette, accent)
      }
    `;

    expect(render({ data }).css.toString()).toEqual('a{color:#333;background:#f80}');
  });
});

describe('theme function', () => {
  it('returns a theme property', () => {
    const data = `
      @import "./base";

      @include theme((
        palette: (
          accent: (
            DEFAULT: #f80,
            hard: #e70
          )
        )
      ));

      a { color: theme(palette, accent, hard); }
    `;

    expect(render({ data }).css.toString()).toEqual('a{color:#e70}');
  });

  it('returns a default theme property', () => {
    const data = `
      @import "./base";

      @include theme((
        palette: (
          accent: (
            DEFAULT: #f80,
            hard: #e70
          )
        )
      ));

      a { color: theme(palette, accent); }
    `;

    expect(render({ data }).css.toString()).toEqual('a{color:#f80}');
  });
});