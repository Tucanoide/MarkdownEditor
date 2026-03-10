import { remark } from 'remark';
import { remarkAlert } from 'remark-github-blockquote-alert';
import html from 'remark-html';

const file = await remark()
  .use(remarkAlert)
  .use(html)
  .process(`> [!NOTE]
> This is a note
  `);

console.log(String(file));
