import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';

export default function Layout({ children, meta: pageMeta }) {
  const [theme, setTheme] = useState('okaidia');
  const meta = {
    title: 'Prism with Next.js',
    description:
      'Example using Prism / Markdown with Next.js including switching syntax highlighting themes.',
    cardImage:
      'https://og-image.now.sh/**Prism**%20with%20Next.js.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg',
    ...pageMeta
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content={meta.description} name="description" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.cardImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vercel" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.cardImage} />
        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css"
          as="script"
        />
        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-coy.css"
          as="script"
        />
        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
          as="script"
        />
        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-funky.css"
          as="script"
        />
        <link
          href={`https://unpkg.com/prismjs@0.0.1/themes/prism-${theme}.css`}
          rel="stylesheet"
        />
      </Head>
      <nav>
        <a href="#skip" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <div className="flex justify-between items-center p-8 mx-2">
          <Link href="/">
            <a className="no-underline font-semibold invisible sm:visible">
              <h1>{meta.title}</h1>
            </a>
          </Link>
          <ul className="flex justify-between items-center space-x-4">
            <li>
              <div className="inline-block relative w-32">
                <select
                  onChange={(e) => setTheme(e.target.value)}
                  value={theme}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="okaidia">Okaidia</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="coy">Coy</option>
                  <option value="funky">Funky</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/leerob/nextjs-prism-markdown"
                className="no-underline font-semibold text-gray-700"
              >
                Source
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div id="skip">
        <article
          className="prose lg:prose-xl px-8 m-auto my-4 sm:my-16"
          dangerouslySetInnerHTML={{ __html: children }}
        />
      </div>
    </>
  );
}
