---
title: 'Prism with Next.js'
description: 'Example using Prism / Markdown with Next.js including switching syntax highlighting themes.'
---

# Using Prism with Next.js

[**Prism**](https://prismjs.com/) is a popular syntax highlighter commonly used with Markdown.
This example shows how to use Prism with [**Next.js**](https://nextjs.org/). Use the theme dropdown
in the header to switch syntax highlighting themes.

Next.js uses `getStaticPaths`/`getStaticProps` to generate [static pages](https://nextjs.org/docs/basic-features/data-fetching). These functions are _not_ bundled client-side, so you can **write server-side code directly**. For example, you can read Markdown files from the filesystem (`fs`) – including parsing front matter with [gray-matter](https://github.com/jonschlinkert/gray-matter). For example, let's assume you have a Markdown file located at `docs/my-post.js`.

We can retrieve that file's contents using `getDocBySlug('my-post')`.

```js
// lib/docs.js

import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export function getDocBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const docsDirectory = join(process.cwd(), 'docs');
  const fullPath = join(docsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug: realSlug, meta: data, content };
}
```

Then, we can **transform** the raw Markdown into HTML using [remark](https://github.com/remarkjs/remark) plugins.

```js
// lib/markdown.js

import remark from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

export default async function markdownToHtml(markdown) {
  const result = await remark().use(html).use(prism).process(markdown);
  return result.toString();
}
```

Passing the `content` returned by `getDocBySlug('my-post')` into `markdownToHtml(content)`
would convert a Markdown file like this:

````markdown
---
title: 'My First Post'
description: 'My very first blog post'
---

# My First Post

I **love** using [Next.js](https://nextjs.org/)

```js
const doc = getDocBySlug(params.slug);
```
````

into this HTML, which includes the proper elements and class names.

```html
<h1>My First Post</h1>
<p>I <strong>love</strong> using <a href="https://nextjs.org/">Next.js</a></p>
<div class="remark-highlight">
  <pre class="language-js">
    <code>
      <span class="token keyword">const</span> doc <span class="token operator">=</span> <span class="token function">getDocBySlug</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span><span class="token property-access">slug</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    </code>
  </pre>
</div>
```

## Deploy Your Own

View the [**source code**](https://github.com/leerob/nextjs-prism-markdown) and deploy your own. You can add new Markdown files to `docs/` and see them live instantly!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?c=1&s=https://github.com/leerob/nextjs-prism-markdown)
