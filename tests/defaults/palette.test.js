const { render } = require('../helpers');

const imports = `
  @import "./base";
  @import "./defaults/modes";
  @import "./defaults/palette";
`;

describe('primary color', () => {
  it('defines tone 0', () => {
    const data = `${imports} a {
      @include modes(palette, primary, 0) using ($color) { color: $color; }
    }`;

    expect(render({ data }).css.toString()).toEqual('a{color:#22272f}.dark a{color:#030405}');
  });

  it('defines tone 1', () => {
    const data = `${imports} a {
      @include modes(palette, primary, 1) using ($color) { color: $color; }
    }`;

    expect(render({ data }).css.toString()).toEqual('a{color:#6f7378}.dark a{color:#0a0c0e}');
  });

  it('defines tone 2', () => {
    const data = `${imports} a {
      @include modes(palette, primary, 2) using ($color) { color: $color; }
    }`;

    expect(render({ data }).css.toString()).toEqual('a{color:#b2b3b6}.dark a{color:#14171c}');
  });

  it('defines tone 3', () => {
    const data = `${imports} a {
      @include modes(palette, primary, 3) using ($color) { color: $color; }
    }`;

    expect(render({ data }).css.toString()).toEqual('a{color:#dedfe0}.dark a{color:#1b1f26}');
  });

  it('defines tone 4', () => {
    const data = `${imports} a {
      @include modes(palette, primary, 4) using ($color) { color: $color; }
    }`;

    expect(render({ data }).css.toString()).toEqual('a{color:#f4f4f5}.dark a{color:#1f232a}');
  });

  it('defines tone 5', () => {
    const data = `${imports} a {
      @include modes(palette, primary, 5) using ($color) { color: $color; }
    }`;

    expect(render({ data }).css.toString()).toEqual('a{color:#fff}.dark a{color:#22272f}');
  });

  it('defines tone 6', () => {
    const data = `${imports} a {
      @include modes(palette, primary, 6) using ($color) { color: $color; }
    }`;

    expect(render({ data }).css.toString()).toEqual('a{color:#f4f4f5}.dark a{color:#383d44}');
  });

  it('defines tone 7', () => {
    const data = `${imports} a {
      @include modes(palette, primary, 7) using ($color) { color: $color; }
    }`;

    expect(render({ data }).css.toString()).toEqual('a{color:#dedfe0}.dark a{color:#4e5259}');
  });

  it('defines tone 8', () => {
    const data = `${imports} a {
      @include modes(palette, primary, 8) using ($color) { color: $color; }
    }`;

    expect(render({ data }).css.toString()).toEqual('a{color:#b2b3b6}.dark a{color:#7a7d82}');
  });

  it('defines tone 9', () => {
    const data = `${imports} a {
      @include modes(palette, primary, 9) using ($color) { color: $color; }
    }`;

    expect(render({ data }).css.toString()).toEqual('a{color:#6f7378}.dark a{color:#bdbec1}');
  });

  it('defines tone 10', () => {
    const data = `${imports} a {
      @include modes(palette, primary, 10) using ($color) { color: $color; }
    }`;

    expect(render({ data }).css.toString()).toEqual('a{color:#22272f}.dark a{color:#e9e9ea}');
  });
});
