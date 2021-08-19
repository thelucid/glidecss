const { render } = require('./helpers');

describe('shade function', () => {
  it('leaves as is when zero', () => {
    const data = `
      @import "./base";

      a { color: shade(#f80, 0%); }
    `;

    expect(render({ data }).css.toString()).toEqual('a{color:#f80}');
  });

  it('tints a color toward black', () => {
    const data = `
      @import "./base";

      a { color: shade(#f80, 20%); }
    `;

    expect(render({ data }).css.toString()).toEqual('a{color:#cc6d00}');
  });

  it('tints to black at full', () => {
    const data = `
      @import "./base";

      a { color: shade(#f80, 100%); }
    `;

    expect(render({ data }).css.toString()).toEqual('a{color:#000}');
  });
});