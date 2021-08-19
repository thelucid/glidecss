const { render } = require('./helpers');

describe('fetch function', () => {
  it('returns value', () => {
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

  it('returns null for missing value', () => {
    const data = `
      @import "./base";

      a { color: fetch(palette, foo); }
    `;

    expect(render({ data }).css.toString()).toEqual('');
  });
});