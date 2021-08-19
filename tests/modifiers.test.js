const { render } = require('./helpers');

describe('modifier mixin', () => {
  it('suffixes last class name', () => {
    const data = `
      @import "./base";

      .button, .one span .two a {
        @include modifier(large) {
          padding: 1rem;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.button-large,.one span .two-large a{padding:1rem}'
    );
  });

  it('accepts formatting template', () => {
    const data = `
      @import "./base";

      .button, .one span .two a {
        @include modifier(large, $template: '<class>--<modifier>') {
          padding: 1rem;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.button--large,.one span .two--large a{padding:1rem}'
    );
  });
});

describe('modifiers mixin', () => {
  it('suffixes last class names from lookup map', () => {
    const data = `
      @import "./base";

      @include theme((
        button: (
          padding: (
            small: .5rem,
            large: 1rem
          )
        )
      ));

      .button, .one span .two a {
        @include modifiers(button, padding) using ($padding) {
          padding: $padding;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.button-small,.one span .two-small a{padding:.5rem}' +
      '.button-large,.one span .two-large a{padding:1rem}'
    );
  });

  it('suffixes last class names from lookup map with default', () => {
    const data = `
      @import "./base";

      @include theme((
        button: (
          padding: (
            DEFAULT: .5rem,
            large: 1rem
          )
        )
      ));

      .button, .one span .two a {
        @include modifiers(button, padding) using ($padding) {
          padding: $padding;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.button,.one span .two a{padding:.5rem}' +
      '.button-large,.one span .two-large a{padding:1rem}'
    );
  });

  it('suffixes last class names from inline map', () => {
    const data = `
      @import "./base";

      .button, .one span .two a {
        @include modifiers((small: .5rem, large: 1rem)) using ($padding) {
          padding: $padding;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.button-small,.one span .two-small a{padding:.5rem}' +
      '.button-large,.one span .two-large a{padding:1rem}'
    );
  });

  it('suffixes last class names from inline map with default', () => {
    const data = `
      @import "./base";

      .button, .one span .two a {
        @include modifiers((DEFAULT: .5rem, large: 1rem)) using ($padding) {
          padding: $padding;
        }
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.button,.one span .two a{padding:.5rem}' +
      '.button-large,.one span .two-large a{padding:1rem}'
    );
  });
});
