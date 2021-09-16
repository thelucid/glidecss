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

      .longhand {
        @include modes(button, background) using ($background) {
          background: $background;
        }
      }
      .shorthand {
        @include modes(background, (button, background));
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.dark .longhand{background:#000}' +
      '.dark .shorthand{background:#000}'
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

      .longhand {
        @include modes(button, background) using ($background) {
          background: $background;
        }
      }
      .shorthand {
        @include modes(background, (button, background));
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.longhand{background:#fff}.dark .longhand{background:#000}' +
      '.shorthand{background:#fff}.dark .shorthand{background:#000}'
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

      .longhand {
        @include modes((dark: black)) using ($background) {
          background: $background;
        }
      }
      .shorthand {
        @include modes(background, (dark: black));
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.dark .longhand{background:#000}' +
      '.dark .shorthand{background:#000}'
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

      .longhand {
        @include modes((DEFAULT: white, dark: black)) using ($background) {
          background: $background;
        }
      }
      .shorthand {
        @include modes(background, (DEFAULT: white, dark: black));
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.longhand{background:#fff}.dark .longhand{background:#000}' +
      '.shorthand{background:#fff}.dark .shorthand{background:#000}'
    );
  });
});