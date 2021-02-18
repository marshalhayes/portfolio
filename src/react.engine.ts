import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import babelRegister from '@babel/register';
import { format } from 'prettier';

export default async function reactExpressEngine(
  path: string,
  options: any,
  cb: (err: NodeJS.ErrnoException, content: string) => void,
) {
  try {
    // Register babel for .tsx files
    babelRegister({
      only: [].concat(options.settings.views),
      cache: false,
      presets: [
        '@babel/preset-react',
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
        '@babel/preset-typescript',
      ],
      extensions: ['.tsx'],
    });

    // Dynamically import the view and render it as HTML markup
    const reactComponent = (await import(path)).default as React.ComponentClass;
    let renderedMarkup =
      '<!DOCTYPE html>' +
      renderToStaticMarkup(createElement(reactComponent, options));

    if (process.env.NODE_ENV !== 'production') {
      renderedMarkup = format(renderedMarkup, {
        parser: 'html',
      });
    }

    cb(null, renderedMarkup);
  } catch (e) {
    cb(e, null);
  }
}
