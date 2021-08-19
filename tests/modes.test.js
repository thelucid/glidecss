const { render } = require('./helpers');

describe('mode mixin', () => {
  it('scopes based on template', () => {
    const data = `
      @import "./base";

      @include theme((
        modes: (
          dark: '.<mode> <selector>'
        )
      ));

      .button, span .special a {
        @include mode(dark) {
          background: white;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.dark .button,.dark span .special a{background:#fff}'
    );
  });
});

describe('modes mixin', () => {
  it('scopes using mode template for lookup map', () => {
    const data = `
      @import "./base";

      @include theme((
        modes: (
          dark: '.<mode> <selector>'
        ),
        button: (
          background: (
            dark: black
          )
        )
      ));

      .button {
        @include modes(button, background) using ($background) {
          background: $background;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.dark .button{background:#000}'
    );
  });

  it('scopes using mode template for lookup map with default', () => {
    const data = `
      @import "./base";

      @include theme((
        modes: (
          dark: '.<mode> <selector>'
        ),
        button: (
          background: (
            DEFAULT: white,
            dark: black
          )
        )
      ));

      .button {
        @include modes(button, background) using ($background) {
          background: $background;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.button{background:#fff}.dark .button{background:#000}'
    );
  });

  it('scopes using mode template for inline map', () => {
    const data = `
      @import "./base";

      @include theme((
        modes: (
          dark: '.<mode> <selector>'
        )
      ));

      .button {
        @include modes((dark: black)) using ($background) {
          background: $background;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.dark .button{background:#000}'
    );
  });

  it('scopes using mode template for inline map with default', () => {
    const data = `
      @import "./base";

      @include theme((
        modes: (
          dark: '.<mode> <selector>'
        )
      ));

      .button {
        @include modes((DEFAULT: white, dark: black)) using ($background) {
          background: $background;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.button{background:#fff}.dark .button{background:#000}'
    );
  });
});