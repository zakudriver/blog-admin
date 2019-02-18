const tsImportPluginFactory = require('ts-import-plugin');

const { resolve } = require('./../utils');
const { extractCss } = require('../config');

module.exports = [
  {
    test: /\.(ts(x?)|js(x?))$/,
    use: [
      {
        loader: 'awesome-typescript-loader',
        options: {
          transpileOnly: true,
          useCache: true,
          cacheDirectory: resolve('.cache-loader'),
          useBabel: true,
          babelOptions: {
            babelrc: false,
            plugins: [
              'transform-class-properties',
              'syntax-dynamic-import',
              [
                'babel-plugin-styled-components',
                {
                  pure: true,
                  minify: extractCss
                }
              ]
              // [
              //   'prismjs',
              //   {
              //     languages: ['javascript', 'css', 'markup', 'go', 'typescript', 'docker', 'clike', 'json', 'rust'],
              //     plugins: ['line-numbers', 'show-language'],
              //     theme: 'default',
              //     css: true
              //   }
              // ]
            ]
          },
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: true
              })
            ]
          })
        }
      }
    ],
    exclude: /node_modules/
  }
];
