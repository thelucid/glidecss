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

      .longhand, .one span .two a {
        @include modifiers(button, padding) using ($padding) {
          padding: $padding;
        }
      }
      .shorthand, .one span .two a {
        @include modifiers(padding, (button, padding));
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.longhand-small,.one span .two-small a{padding:.5rem}' +
      '.longhand-large,.one span .two-large a{padding:1rem}' +
      '.shorthand-small,.one span .two-small a{padding:.5rem}' +
      '.shorthand-large,.one span .two-large a{padding:1rem}'
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

      .longhand, .one span .two a {
        @include modifiers(button, padding) using ($padding) {
          padding: $padding;
        }
      }
      .shorthand, .one span .two a {
        @include modifiers(padding, (button, padding));
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.longhand,.one span .two a{padding:.5rem}' +
      '.longhand-large,.one span .two-large a{padding:1rem}' +
      '.shorthand,.one span .two a{padding:.5rem}' +
      '.shorthand-large,.one span .two-large a{padding:1rem}'
    );
  });

  it('suffixes last class names from inline map', () => {
    const data = `
      @import "./base";

      .longhand, .one span .two a {
        @include modifiers((small: .5rem, large: 1rem)) using ($padding) {
          padding: $padding;
        }
      }
      .shorthand, .one span .two a {
        @include modifiers(padding, (small: .5rem, large: 1rem));
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.longhand-small,.one span .two-small a{padding:.5rem}' +
      '.longhand-large,.one span .two-large a{padding:1rem}' +
      '.shorthand-small,.one span .two-small a{padding:.5rem}' +
      '.shorthand-large,.one span .two-large a{padding:1rem}'
    );
  });

  it('suffixes last class names from inline map with default', () => {
    const data = `
      @import "./base";

      .longhand, .one span .two a {
        @include modifiers((DEFAULT: .5rem, large: 1rem)) using ($padding) {
          padding: $padding;
        }
      }
      .shorthand, .one span .two a {
        @include modifiers(padding, (DEFAULT: .5rem, large: 1rem));
      }
    `;

    expect(render({ data }).css.toString()).toEqual(
      '.longhand,.one span .two a{padding:.5rem}' +
      '.longhand-large,.one span .two-large a{padding:1rem}' +
      '.shorthand,.one span .two a{padding:.5rem}' +
      '.shorthand-large,.one span .two-large a{padding:1rem}'
    );
  });
});
