import Prism, { Grammar } from 'prismjs';
import loadLanguages from 'prismjs/components/';
import Mustache from 'mustache';

loadLanguages(['scss', 'css', 'shell']);

const fs = require('fs');
const path = require('path');

const readmePlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      const md = require('markdown-it')({
        linkify: true,
        typographer: true,
        html: true,
        highlight: function (text, lang) {
          return Prism.highlight(text, Prism.languages[lang], lang);
        }
      });

      const links = [];

      md.renderer.rules.heading_open = function(tokens, index) {
        const tag = tokens[index].tag;
        if (!tag.match(/^h[2-3]$/)) return `<${tag}>`;

        const label = tokens[index + 1]
          .children
          .filter(token => token.type === 'text')
          .map(token => token.content)
          .join('');

        const handle = label.toLowerCase().replace(/\s/g, '-');

        links.push({ label, handle, tag });

        return `<${tag} id="${handle}">`;
      };

      const readmePath = path.join(__dirname, '..', 'README.md');
      const content = fs.readFileSync(readmePath, 'utf8');

      return Mustache.render(html, {
        README: md.render(content),
        links
      });
    }
  }
}

export default {
  base: '', // <- relative paths
  plugins: [readmePlugin()]
};
