# Glide CSS

A tiny component-first CSS framework for Sass; with a **zero footprint** by default. Build solid design systems with a set of simple tools, and the power to generate utility classes where appropriate.

## Usage

### Themes

At the heart of Glide is the ability to define a free-form `theme`.

##### SCSS

```scss
@import "glidecss/base";

@include theme((
  palette: (
    primary: (
      1: #fff,
      2: #eee,
      3: #888
    ),
    accent: (
      1: #e70,
      2: #f80,
      3: #f91
    )
  ),
  spacing: (
    1: .25rem,
    2: .5rem,
    3: .75rem
  )
));
```

This is a basic theme which can be accessed by using the `theme` function.

##### SCSS

```scss
.button {
  padding: theme(spacing, 3);
  color: theme(palette, primary, 1);
  background: theme(palette, accent, 2);
  
  &:hover {
    background: theme(palette, accent, 3);
  }
}
```

##### CSS

```css
.button {
  padding: .75rem;
  color: #fff;
  background: #f80;
}

.button:hover {
  background: #f91;
}
```

#### Defaults

A default property can be defined within a set of properties, via the `DEFAULT` property key.

##### SCSS

```scss
@include theme((
  radius: (
    DEFAULT: .25rem,
    large: .5rem
  )
));
```

The default is returned when requesting the parent property, so the following are equivilent.

##### SCSS

```scss
border-radius: theme(radius);            // <- .25rem
border-radius: theme(radius, DEFAULT);   // <- .25rem
```

#### Overrides

The `theme` mixin performs a non-destrutive merge — in a similar fashion to the `!default` operator in Sass — so multiple calls will only add what's new.

##### SCSS

```scss
@include theme((
  radius: (
    large: .5rem
  )
));

@include theme((
  radius: (
    small: .125rem,
    large: 1rem
  )
));
```

This is equivilent to the following, as the original `large` property is preserved.

##### SCSS

```scss
@include theme((
  radius: (
    small: .125rem,
    large: .5rem
  )
));
```

As you can see, this means that overrides should be defined *before* futher theme declarations. More on why this is powerful in the dedicated overrides section.

### Components

Global theme properties are powerful when combined with component theme properties.

##### SCSS

```scss
@include theme((
  menu: (
    background: theme(palette, primary, 2)
    padding: theme(spacing, 2),
    item: (
      display: inline-block
    )
  )
));

.menu {
  background: theme(menu, background);
  padding: theme(menu, padding);
}

.menu__item {
  display: theme(menu, item, display);
}
```

##### CSS

```css
.menu {
  background: #eee;
  padding: .5rem
}

.menu__item {
  display: inline-block;
}
```

Here our component properties make use of global theme properties, keeping our styling DRY (Don't Repeat Yourself).

### Screens

Glide is mobile first by default, so you can specify styles that trigger for, and above, a given `screen` size. See configuration section for how to set screen sizes.

#### Manual

Use `screen` to manually define styles for a named screen.

##### SCSS

```scss
.menu {
  padding: theme(spacing, 2);
  
  @include screen(lg) {
    padding: theme(spacing, 3);
  }
}
```

##### CSS

```css
.menu {
  padding: .5rem;
}

@media (min-width: 1024px) {
  .menu {
    padding: .75rem;
  }
}
```

#### Lookup

We can make a component responsive by defining properties that trigger for various `screens`.

##### SCSS

```scss
@include theme((
  menu: (
    background: theme(palette, primary, 2),
    padding: (
      DEFAULT: theme(spacing, 2),
      lg: theme(spacing, 3)
    ),
    item: (
      display: (
        DEFAULT: block,
        md: inline-block
      )
    )
  )
));

.menu {
  background: theme(menu, palette, background);
  
  @include screens(menu, padding) using ($padding) {
    padding: $padding;
  }
}

.menu__item {
  @include screens(menu, item, display) using ($display) {
    display: $display;
  }
}
```

Responsive properties are named after their screen name. The `DEFAULT` will be defined first, as the fallback for all screens.

##### CSS

```css
.menu {
  background: #eee;
  padding: .5rem;
}

@media (min-width: 1024px) {
  .menu {
    padding: .75rem;
  }
}

.menu__item {
  display: block;
}

@media (min-width: 768px) {
  .menu__item {
    display: inline-block;
  }
}
```

#### Inline

You can supply a map to `screens`, although property lookup is recommended.

##### SCSS

```scss
.menu {
  @include screens((
    DEFAULT: theme(spacing, 2),
    lg: theme(spacing, 3)
  )) using ($padding) {
    padding: $padding;
  }
}
```

##### CSS

```css
.menu {
  padding: .5rem;
}

@media (min-width: 1024px) {
  .menu {
    padding: .75rem;
  }
}
```

#### Configure

To configure the screen sizes available, just add a `screens` property to the theme.

##### SCSS

```scss
@include theme((
  screens: (
    custom: 800px
  )
));

.button {
  @include screen(custom) {
    padding: theme(spacing, 3);
  }
}
```

##### CSS

```css
@media (min-width: 800px) {
  .button {
    padding: .75rem;
  }
}
```

### Modes

You can specify styles that should be used for a given `mode`, for example `dark` mode. By default, a mode is triggered via a parent class named after the mode; usually on the html element.

#### Manual

Use `mode` to manually define styles for the named mode.

##### SCSS

```scss
.menu {
  background: theme(palette, primary, 2);
  
  @include mode(dark) {
    background: theme(palette, primary, 3)
  }
}
```

##### CSS

```css
.menu {
  background: #eee;
}

.dark .menu {
  background: #888;
}
```

#### Lookup

To easily set properties across modes, we can make use of `modes` to look them up.

##### SCSS

```scss
@include theme((
  menu: (
    background: (
      DEFAULT: theme(palette, primary, 2),
      dark: theme(palette, primary, 3)
    )
  )
));

.menu {
  @include modes(menu, background) using ($background) {
    background: $background;
  }
}
```

##### CSS

```css
.menu {
  background: #eee;
}

.dark .menu {
  background: #888;
}
```

#### Inline

You can supply a map to `modes`, although property lookup is recommended.

##### SCSS

```scss
.menu {
  @include modes((
    DEFAULT: theme(palette, primary, 2),
    dark: theme(palette, primary, 3)
  )) using ($background) {
    background: $background;
  }
}
```

##### CSS

```css
.menu {
  background: #eee;
}

.dark .menu {
  background: #888;
}
```

#### Configure

To configure the modes available, just add a `modes` property to the theme in the following format. Each `<token>` will be replaced with the relevant value.

##### SCSS

```scss
@include theme((
  modes: (
    dimmed: '.<mode> <selector>'
  ),
  palette: (
    primary: (
      1: (
        DEFAULT: #fff,
        dimmed: #444
      )
    )
  )
));

body {
  @include modes(palette, primary, 1) using ($background) {
    background: $background;
  }
}
```

##### CSS

```css
body {
  background: #fff;
}

.dimmed body {
  background: #444;
}
```

### Utilities

Glide encourages components where possible, however you can generate utilities where it makes sense. We can use `variants` and `modifiers` to generate utility classes.

#### Variants

Variants allow us to generate utility classes with a prefix. By default, we can generate variants for `screen`, `mode`, and any pseudo selector such as `hover`.

##### SCSS

```scss
.box {
  @include variants(screen, hover) {
    padding: theme(spacing, 4);
  }
}
```

##### CSS

```css
.box {
  padding: 1rem;
}

@media (min-width: 640px) {
  .sm\:box {
    padding: 1rem;
  }
}

@media (min-width: 768px) {
  .md\:box {
    padding: 1rem;
  }
}

/* ... */

.hover\:box:hover {
  padding: 1rem;
}
```

#### Modifiers

Modifiers allow us to generate utility classes with suffixes, based on a theme property or Sass map.

##### SCSS

```scss
.box {
  @include modifiers(spacing) using ($spacing) {
    padding: $spacing;
  }
}
```

##### CSS

```css
.box-1 {
  padding: .25rem;
}

.box-2 {
  padding: .5rem;
}

.box-3 {
  padding: .75rem;
}

/* etc. */
```

You can also specify an inline map, although property lookup is recommended.

##### SCSS

```scss
.box {
  @include modifiers((1: .25rem, 2: .5rem)) using ($spacing) {
    padding: $spacing;
  }
}
```

##### CSS

```css
.box-1 {
  padding: .25rem;
}

.box-2 {
  padding: .5rem;
}
```

#### Combined

We can combine `variants` and `modifiers` to create responsive, and/or mode specific utility classes.

##### SCSS

```scss
.box {
  @include variants(screen, mode) {
    @include modifiers(spacing) using ($spacing) {
      padding: $spacing;
    }
  }
}
```

##### CSS

```css
.box-1 {
  padding: .25rem;
}

.box-2 {
  padding: .5rem;
}

/* ... */

@media (min-width: 640px) {
  .sm\:box-1 {
    padding: .25rem;
  }
  
  .md\:box-2 {
    padding: .5rem;
  }
  
  /* ... */
}

.dark\:box-1 {
  padding: .25rem;
}

.dark\:box-2 {
  padding: .5rem;
}

/* ... */
```

Use this power wisely. If you end up with many utility classes — not recommended — then it's advised that you add purgecss to your project.

#### Configure

To configure the variants available, just add a `variants` property to the `theme` in the following format. Each `<token>` will be replaced with the relevant value.

##### SCSS

```scss
@include theme((
  variants: (
    first: '<class>:<variant>-child',
    last: '<class>:<variant>-child'
  )
));

.highlight {
  @include variants(first, last) {
    background: theme(palette, accent, 2);
  }
}
```

##### CSS

```css
.highlight {
  background: #f80;
}

.first\:highlight:first-child {
  background: #f80;
}

.last\:highlight:last-child {
  background: #f80;
}
```

### Reset

Glide comes with a simple opt-in reset, just import the `reset` stylesheet.

##### SCSS

```scss
@import "glidecss/reset";
```

### Defaults

Glide provides a set of opt-in defaults. You can include them all, or cherry pick the ones you'd like. To include them all, just import the main defaults file.

##### SCSS

```scss
@include "glidecss/defaults";
```

#### Screens

The default screens are shown below.

| Screen | Min width |
| ------ | --------- |
| sm     | 640px     |
| md     | 768px     |
| lg     | 1024px    |
| xl     | 1280px    |
| xxl    | 1536px    |

##### SCSS

```scss
@include "glidecss/defaults/screens";

body {
  @include screen(md) {
    padding: 1rem;
  }
}
```

##### CSS

```css
@media (min-width: 768px) {
  body {
    padding: 1rem;
  }
}
```

#### Modes

The default modes are show below.

| Mode | Value                |
| ---- | -------------------- |
| dark | '.<mode> <selector>' |

##### SCSS

```scss
@include "glidecss/defaults/modes";

body {
  @include mode(dark) {
     background: black; 
  }
}
```

##### CSS

```css
.dark body {
  background: black;
}
```

#### Variants

The default variants are show below.

| Mode    | Value               |
| ------- | ------------------- |
| DEFAULT | '<class>:<variant>' |
| screen  | (type: screen)      |
| mode    | (type: mode )       |

##### SCSS

```scss
@include "glidecss/defaults/variants";

.box {
  @include variants(screen) {
    padding: 1rem
  }
}
```

##### CSS

```css
.box {
  padding: 1rem;
}

@media (min-width: 640px) {
  .sm\:box {
    padding: 1rem;
  }
}

/* ... */
```

#### Palette

The default palette has a single `primary` color with the following shades, accessed with `theme(palette, primary, <shade>, <mode>)`. Tweak as need and add futher palette colors, such as `accent`.

| Shade | Default mode        | Dark mode            |
| ----- | ------------------- | -------------------- |
| 1     | tint(#222426, 0%)   | shade(#222426, 100%) |
| 2     | tint(#222426, 50%)  | shade(#222426, 50%)  |
| 3     | tint(#222426, 70%)  | shade(#222426, 30%)  |
| 4     | tint(#222426, 90%)  | shade(#222426, 10%)  |
| 5     | tint(#222426, 100%) | tint(#222426, 0%)    |
| 6     | tint(#222426, 90%)  | tint(#222426, 10%)   |
| 7     | tint(#222426, 70%)  | tint(#222426, 30%)   |
| 8     | tint(#222426, 50%)  | tint(#222426, 50%)   |
| 9     | tint(#222426, 0%)   | tint(#222426, 100%)  |

Note the use of supplied `tint` and `shade` functions. 

##### SCSS

```scss
@include "glidecss/defaults/palette";

body {
  @include modes(palette, 9) using ($color) {
    color: $color
  }
  
  @include modes(palette, 5) using ($background) {
    background: $background
  }
}
```

##### CSS

```css
body {
  color: #222426;
  background: #fff;
}

.dark body {
  color: #fff;
  background: #222426;
}
```

Here `9` works well as a foreground color, and `5`  as a background color. This allows you to switch modes, with predictable results.

#### Spacing

The default spacing values are accessed with `theme(spacing, <name>)`.

| Name | Size   | Pixels |
| ---- | ------ | ------ |
| 1    | .25rem | 4px    |
| 2    | .5rem  | 8px    |
| 3    | 1rem   | 16px   |
| 4    | 1.5rem | 24px   |
| 5    | 2rem   | 32px   |
| 6    | 2.5rem | 40px   |
| 7    | 3rem   | 48px   |
| 8    | 4rem   | 64px   |
| 9    | 5rem   | 80px   |
| 10   | 6rem   | 96px   |
| 11   | 7rem   | 112px  |
| 12   | 8rem   | 128px  |

##### SCSS

```scss
@include "glidecss/defaults/spacing";

.button {
  padding: theme(spacing, 3);
}
```

##### CSS

```css
.button {
  padding: 1rem;
}
```

#### Font family

The default font families are accessed with `theme(font, family, <name>)`.

| Name  | Value                                                        |
| ----- | ------------------------------------------------------------ |
| sans  | ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol","Noto Color Emoji" |
| serif | ui-serif, Georgia, Cambria, "Times New Roman", Times, serif  |
| mono  | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace |

##### SCSS

```scss
@include "glidecss/defaults/font/family";

.heading {
  font-family: theme(font, family, serif);
}
```

##### CSS

```css
.heading {
  fonr-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}
```

#### Font size

The default font sizes are accessed with `theme(font, size, <name>)`.

| Name | Size (default) | Pixels (default) | Size (lg) | Pixels (lg) |
| ---- | -------------- | ---------------- | --------- | ----------- |
| 1    | 0.75rem        | 12px             |           |             |
| 2    | 0.875rem       | 14px             |           |             |
| 3    | 1rem           | 16px             |           |             |
| 4    | 1.125rem       | 18px             | 1.25rem   | 20px        |
| 5    | 1.375rem       | 22px             | 1.5rem    | 24px        |
| 6    | 1.625rem       | 26px             | 2rem      | 32px        |
| 7    | 2rem           | 32px             | 2.5rem    | 40px        |
| 8    | 2.5rem         | 40px             | 3rem      | 48px        |

##### SCSS

```scss
@include "glidecss/defaults/font/size";

.heading {
  @include screens(font, size, 7) using ($font-size) {
    font-size: $font-size;
  }
}
```

##### CSS

```css
.heading {
  font-size: 2rem;
}

@media (min-width: 1024px) {
  .heading {
    font-size: 2.5rem;
  }
}
```

#### Font leading

The default font line heights are accessed with `theme(font, leading, <name>)`.

| Name    | Leading |
| ------- | ------- |
| DEFAULT | 1.5     |
| tight   | 1.25    |
| loose   | 1.75    |

##### SCSS

```scss
@include "glidecss/defaults/font/leading";

.heading {
  line-height: theme(font, leading, tight);
}
```

##### CSS

```css
.heading {
  line-height: 1.75;
}
```

#### Font weight

The default font weights are accessed with `theme(font, weight, <name>)`.

| Name   | Weight |
| ------ | ------ |
| light  | 300    |
| normal | 400    |
| medium | 500    |
| bold   | 700    |

##### SCSS

```scss
@include "glidecss/defaults/font/weight";

.heading {
  font-weight: theme(font, weight, bold);
}
```

##### CSS

```css
.heading {
  font-weight: 700;
}
```

### Overrides

Note that if you want to override any defaults, the overrides should be declared *before* including the defaults file. This is due to `theme` performing a non-destrutive merge; in a similar fashion to the `!default` operator in Sass.

##### SCSS

```scss
@include theme((
  spacing: (
    0: .125rem,
    1: .5rem
  )
));

@include "glidecss/defaults";
```

This will add an additional `0` spacing property, and define a larger than normal `1` property. When the defaults are included, they will leave both of these initial values alone, and only add the remaining properties.

The non-destrutive merge is a super powerful tool when overriding component properties, allowing for a base set of reusable components that can be customised on a project basis.

##### SCSS

```scss
@include theme((
  card: (
    color: palette(primary, 1),
    background: palette(accent)
  )
));

@include "card";
```

## Installation

### Yarn

```shell
yarn add glidecss --dev
```

### NPM

```shell
npm install -D glidecss
```

### Import

##### SCSS

```scss
@import "glidecss/base";
@import "glidecss/reset";     // <- optional
@import "glidecss/defaults";  // <- optional
```

## Development

### Tests

The test suite will automatically be run by GitHub Actions on a push or pull request.

[![Quality](https://github.com/thelucid/glidecss/actions/workflows/quality.yml/badge.svg)](https://github.com/thelucid/glidecss/actions/workflows/quality.yml)

To manually run the Jest test suite:

```shell
yarn test
```

### Releases

Releases are automatically handled by GitHub Actions. Just set the semantic version number in `package.json`, tag, push and the rest will happen automatically.

### Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/thelucid/glidecss. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/thelucid/glidecss/blob/main/CODE_OF_CONDUCT.md).

### License

The library is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

### Code of Conduct

Everyone interacting in the Glide CSS project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/thelucid/glidecss/blob/main/CODE_OF_CONDUCT.md).
