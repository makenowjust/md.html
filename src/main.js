import matter from 'gray-matter';

// Unified and families:
import unified from 'unified';
import markdown from 'remark-parse';
import breaks from 'remark-breaks';
import math from 'remark-math';
import externalLinks from 'remark-external-links';
import emoji from 'remark-emoji';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import slug from 'rehype-slug';
import link from 'rehype-autolink-headings';
import highlight from 'rehype-highlight';
import katex from 'rehype-katex';
import html from 'rehype-stringify';

// Icons:
import linkIcon from './icons/link';

// Styles:
import './main.css';

// Build Markdown-to-HTML compiler.
const compiler = unified()
  .data('settings', {footnotes: true})
  .use(markdown)
  .use(breaks)
  .use(math)
  .use(externalLinks)
  .use(emoji)
  .use(remark2rehype, {allowDangerousHTML: true})
  .use(raw)
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
    `%c 📝 %cmd.html %cv${MD_HTML_VERSION}%cMarkdown inside HTML https://github.com/MakeNowJust/md.html/`,
    'padding: 0.5em; background: green',
    'padding: 0.5em; padding-right: 0; color: white; background: black',
    'padding: 0.5em; padding-left: 0; color: silver; background: black',
    'padding: 0.5em',
  );

  // Insert `<meta name="viewport">` for mobile devies into the document head.
  const viewport = document.createElement('meta');
  viewport.name = 'viewport';
  viewport.content = 'width=device-width,initial-scale=1';
  document.head.appendChild(viewport);

  // Create wrapper element of converted Markdown.
  const container = document.createElement('div');
  container.classList.add('markdown-body');
  container.innerHTML = result.contents;

  // Create footer when frontmatter does not provide `footer` property or `footer` is `true`.
  if (data.footer === undefined || data.footer === true) {
    const footer = document.createElement('footer');
    footer.classList.add('md-html-footer');
    footer.innerHTML = `Powered by <a target="_blank" rel="nofollow noopener noreferrer" href="https://github.com/MakeNowJust/md.html/">📝 md.html</a> <sup>v${MD_HTML_VERSION}</sup>`;
    container.appendChild(footer);
  }

  // Insert wrapper element into the document.
  document.body.appendChild(container);

  // Set `document.title` when frontmatter has `title` property.
  if (data.title !== undefined) {
    document.title = data.title;
  }
});
