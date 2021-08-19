const { render } = require('./helpers');

describe('screen mixin', () => {
  it('defines a min-width media query', () => {
    const data = `
      @import "./base";

      @include theme((
        screens: (
          md: 800px,
          lg: 1000px
        )
      ));

      .button {
        @include screen(lg) {
          padding: 1rem;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '@media(min-width: 1000px){.button{padding:1rem}}'
    );
  });
});

describe('screens mixin', () => {
  it('defines min-width media queries for lookup map', () => {
    const data = `
      @import "./base";

      @include theme((
        screens: (
          md: 800px,
          lg: 1000px
        ),
        button: (
          padding: (
            md: .75rem,
            lg: 1rem
          )
        )
      ));

      .button {
        @include screens(button, padding) using ($padding) {
          padding: $padding;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '@media(min-width: 800px){.button{padding:.75rem}}' +
      '@media(min-width: 1000px){.button{padding:1rem}}'
    );
  });

  it('defines min-width media queries for lookup map with default', () => {
    const data = `
      @import "./base";

      @include theme((
        screens: (
          md: 800px,
          lg: 1000px
        ),
        button: (
          padding: (
            DEFAULT: .5rem,
            md: .75rem
          )
        )
      ));

      .button {
        @include screens(button, padding) using ($padding) {
          padding: $padding;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.button{padding:.5rem}' +
      '@media(min-width: 800px){.button{padding:.75rem}}'
    );
  });

  it('defines min-width media queries for inline map', () => {
    const data = `
      @import "./base";

      @include theme((
        screens: (
          md: 800px,
          lg: 1000px
        )
      ));

      .button {
        @include screens((md: .75rem, lg: 1rem)) using ($padding) {
          padding: $padding;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '@media(min-width: 800px){.button{padding:.75rem}}' +
      '@media(min-width: 1000px){.button{padding:1rem}}'
    );
  });

  it('defines min-width media queries for inline map with default', () => {
    const data = `
      @import "./base";

      @include theme((
        screens: (
          md: 800px,
          lg: 1000px
        )
      ));

      .button {
        @include screens((DEFAULT: .5rem, md: .75rem)) using ($padding) {
          padding: $padding;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.button{padding:.5rem}' +
      '@media(min-width: 800px){.button{padding:.75rem}}'
    );
  });
});