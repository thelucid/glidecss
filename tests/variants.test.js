const { render } = require('./helpers');

describe('variant mixin', () => {
  it('prefixes last class name', () => {
    const data = `
      @import "./base";

      .button, .one span .two a {
        @include variant(lg) {
          padding: 1rem;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.lg\\:button,.one span .lg\\:two a{padding:1rem}'
    );
  });

  it('accepts formatting template', () => {
    const data = `
      @import "./base";

      .button, .one span .two a {
        @include variant(active, $template: '<class>:<variant>') {
          padding: 1rem;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.active\\:button:active,.one span .active\\:two:active a{padding:1rem}'
    );
  });
});

describe('variants mixin', () => {
  it('uses registered variant templates', () => {
    const data = `
      @import "./base";

      @include theme((
        variants: (
          first: '<class>:first-child',
          last: '<class>:last-child',
          other: '<class>:not-used'
        )
      ));

      .highlight, .one span .two a {
        @include variants(first, last) {
          background: yellow;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.highlight,.one span .two a{background:#ff0}' +
      '.first\\:highlight:first-child,' +
        '.one span .first\\:two:first-child a{background:#ff0}' +
      '.last\\:highlight:last-child,' +
        '.one span .last\\:two:last-child a{background:#ff0}'
    );
  });

  it('uses registered default template for unknowns', () => {
    const data = `
      @import "./base";

      @include theme((
        variants: (
          DEFAULT: '<class>:<variant>',
          first: '<class>:first-child'
        )
      ));

      .highlight, .one span .two a {
        @include variants(first, hover) {
          background: yellow;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.highlight,.one span .two a{background:#ff0}' +
      '.first\\:highlight:first-child,' +
        '.one span .first\\:two:first-child a{background:#ff0}' +
      '.hover\\:highlight:hover,' +
        '.one span .hover\\:two:hover a{background:#ff0}'
    );
  });
});
