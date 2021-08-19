const { render } = require('./helpers');

describe('tint function', () => {
  it('leaves as is when zero', () => {
    const data = `
      @import "./base";

      a { color: tint(#f80, 0%); }
    `;

    expect(render({ data }).css.toString()).toEqual('a{color:#f80}');
  });

  it('tints a color toward white', () => {
    const data = `
      @import "./base";

      a { color: tint(#f80, 20%); }
    `;

    expect(render({ data }).css.toString()).toEqual('a{color:#ffa033}');
  });

  it('tints to white at full', () => {
    const data = `
      @import "./base";

      a { color: tint(#f80, 100%); }
    `;

    expect(render({ data }).css.toString()).toEqual('a{color:#fff}');
  });
});