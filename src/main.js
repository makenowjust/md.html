import matter from 'gray-matter';

// Unified and families:
import unified from 'unified';
import markdown from 'remark-parse';
import breaks from 'remark-breaks';
import math from 'remark-math';
import externalLinks from 'remark-external-links';
import emoji from 'remark-emoji';
import remark2rehype from 'remark-rehype';
import slug from 'rehype-slug';
import link from 'rehype-autolink-headings';
import highlight from 'rehype-highlight';
import katex from 'rehype-katex';
import html from 'rehype-stringify';

// Icons:
import linkIcon from './icons/link';

// Styles:
import 'github-markdown-css';
import 'octicons/index.scss';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';
import './main.css';

const compiler = unified()
  .use(markdown)
  .use(breaks)
  .use(math)
  .use(externalLinks)
  .use(emoji)
  .use(remark2rehype)
  .use(slug)
  .use(link, {properties: {className: 'anchor', ariaHidden: true}, content: linkIcon})
  .use(highlight, {ignoreMissing: true, subset: false})
  .use(katex)
  .use(html);

document.addEventListener('DOMContentLoaded', async () => {
  const noscript = document.querySelector('noscript');
  if (!noscript) {
    console.error('<noscript> is missing!');
    return;
  }

  // Strip leading spaces and HTML comments for supporting both of modeline and frontmatter.
  const text = noscript.textContent.replace(/^\s*((?:<!--.*?-->)\s*)*/, '');
  // Remove `<noscript>` tag from the document.
  noscript.remove();
  // Split `<noscript>` text content with frontmatter and Markdown body.
  const {data, content} = matter(text);
  // Convert Markdown into HTML.
  const result = await compiler.process(content);

  // Show banner.
  console.log(
    '%c 📝 %cmd.html%cMarkdown inside HTML\nhttps://github.com/MakeNowJust/md.html/',
    'padding: 0.5em; background: green;',
    'padding: 0.5em; color: white; background: black;',
    'padding: 0.5em;',
  );

  // Insert converted Markdown into the document.
  const container = document.createElement('div');
  container.classList.add('markdown-body');
  container.innerHTML = result.contents;
  document.body.appendChild(container);

  if (data.footer === undefined || data.footer === true) {
    const footer = document.createElement('footer');
    footer.classList.add('md-html-footer');
    footer.innerHTML = `Powered by <a target="_blank" rel="nofollow noopener noreferrer" href="https://github.com/MakeNowJust/md.html/">📝 md.html</a>`;
    container.appendChild(footer);
  }

  // Set `document.title` when frontmatter has `title` property.
  if (data.title !== undefined) {
    document.title = data.title;
  }
});
