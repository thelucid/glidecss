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

      .longhand {
        @include screens(button, padding) using ($padding) {
          padding: $padding;
        }
      }
      .shorthand {
        @include screens(padding, (button, padding));
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '@media(min-width: 800px){.longhand{padding:.75rem}}' +
      '@media(min-width: 1000px){.longhand{padding:1rem}}' +
      '@media(min-width: 800px){.shorthand{padding:.75rem}}' +
      '@media(min-width: 1000px){.shorthand{padding:1rem}}'
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

      .longhand {
        @include screens(button, padding) using ($padding) {
          padding: $padding;
        }
      }
      .shorthand {
        @include screens(padding, (button, padding));
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.longhand{padding:.5rem}' +
      '@media(min-width: 800px){.longhand{padding:.75rem}}' +
      '.shorthand{padding:.5rem}' +
      '@media(min-width: 800px){.shorthand{padding:.75rem}}'
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

      .longhand {
        @include screens((md: .75rem, lg: 1rem)) using ($padding) {
          padding: $padding;
        }
      }
      .shorthand {
        @include screens(padding, (md: .75rem, lg: 1rem));
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '@media(min-width: 800px){.longhand{padding:.75rem}}' +
      '@media(min-width: 1000px){.longhand{padding:1rem}}' +
      '@media(min-width: 800px){.shorthand{padding:.75rem}}' +
      '@media(min-width: 1000px){.shorthand{padding:1rem}}'
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

      .longhand {
        @include screens((DEFAULT: .5rem, md: .75rem)) using ($padding) {
          padding: $padding;
        }
      }
      .shorthand {
        @include screens(padding, (DEFAULT: .5rem, md: .75rem));
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.longhand{padding:.5rem}' +
      '@media(min-width: 800px){.longhand{padding:.75rem}}' +
      '.shorthand{padding:.5rem}' +
      '@media(min-width: 800px){.shorthand{padding:.75rem}}'
    );
  });
});