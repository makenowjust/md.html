/**
 * Custom lowlight.js for build size reduction.
 */

import low from 'lowlight/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import crystal from 'highlight.js/lib/languages/crystal';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import shell from 'highlight.js/lib/languages/shell';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

low.registerLanguage('bash', bash);
low.registerLanguage('css', css);
low.registerLanguage('crystal', crystal);
low.registerLanguage('javascript', javascript);
low.registerLanguage('markdown', markdown);
low.registerLanguage('python', python);
low.registerLanguage('ruby', ruby);
low.registerLanguage('shell', shell);
low.registerLanguage('xml', xml);
low.registerLanguage('yaml', yaml);

export const {highlight, highlightAuto, registerLanguage} = low;
