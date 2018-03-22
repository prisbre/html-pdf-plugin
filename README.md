HTML PDF Plugin
==========================

<!-- [START badges] -->
[![npm](https://img.shields.io/npm/v/html-pdf-plugin.svg)](https://npmjs.com/package/html-pdf-plugin) [![node](https://img.shields.io/node/v/html-pdf-plugin.svg)](https://nodejs.org) [![deps](https://david-dm.org/prisbre/html-pdf-plugin.svg)](https://david-dm.org/prisbre/html-pdf-plugin) 
<!-- [END badges] -->

Plugin that creates PDF file from HTML after webpack compilation has completed.

## Install

`npm install html-pdf-plugin --save-dev`

This plugin depends on [GoogleChrome/Puppeteer](https://github.com/GoogleChrome/Puppeteer). When you install, it downloads a recent version of Chromium (~170Mb Mac, ~282Mb Linux, ~280Mb Win) that is guaranteed to work with the API. To skip the download, see [Environment variables](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#environment-variables).

## Usage

In your webpack.config.js file:

```
const HtmlPdfPlugin = require('html-pdf-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlPdfPlugin(options)
  ]
}
```

## Options

- `options` <[Object]> Options object which might have the following properties:
  - `url` <[string]> URL to navigate page to. The url should include scheme, e.g. `https://`. If `url` is a relative path of HTML entry file, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). Defaults to `http://localhost:8080`.
  - `path` <[string]> The file path to save the PDF to. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). If no path is provided, the PDF won't be saved to the disk.
  - `filename` <[number]> PDF file name with extension. Defaults to `page.pdf`.
  - `scale` <[number]> Scale of the webpage rendering. Defaults to `1`.
  - `displayHeaderFooter` <[boolean]> Display header and footer. Defaults to `false`.
  - `headerTemplate` <[string]> HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them:
    - `date` formatted print date
    - `title` document title
    - `url` document location
    - `pageNumber` current page number
    - `totalPages` total pages in the document
  - `footerTemplate` <[string]> HTML template for the print footer. Should use the same format as the `headerTemplate`.
  - `printBackground` <[boolean]> Print background graphics. Defaults to `true`.
  - `landscape` <[boolean]> Paper orientation. Defaults to `false`.
  - `pageRanges` <[string]> Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
  - `format` <[string]> Paper format. If set, takes priority over `width` or `height` options. Defaults to 'A4'.
  - `width` <[string]> Paper width, accepts values labeled with units.
  - `height` <[string]> Paper height, accepts values labeled with units.
  - `margin` <[Object]> Paper margins, defaults to none.
    - `top` <[string]> Top margin, accepts values labeled with units.
    - `right` <[string]> Right margin, accepts values labeled with units.
    - `bottom` <[string]> Bottom margin, accepts values labeled with units.
    - `left` <[string]> Left margin, accepts values labeled with units.
  - `viewport` <[Object]>
    - `width` <[number]> page width in pixels.
    - `height` <[number]> page height in pixels.
    - `deviceScaleFactor` <[number]> Specify device scale factor (can be thought of as dpr). Defaults to `1`.
    - `isMobile` <[boolean]> Whether the `meta viewport` tag is taken into account. Defaults to `false`.
    - `hasTouch`<[boolean]> Specifies if viewport supports touch events. Defaults to `false`
    - `isLandscape` <[boolean]> Specifies if viewport is in landscape mode. Defaults to `false`.
  - `emulateMedia` <[string]> CSS media-specific styles. Set `print` with printer-friendly version, or `screen` with screen version. Defaults to `print`.

> **NOTE** in certain cases, setting viewport will reload the page in order to set the `isMobile` or `hasTouch` properties.

In the case of multiple pages in a single browser, each page can have its own viewport size.

The `width`, `height`, and `margin` options accept values labeled with units. Unlabeled values are treated as pixels.

All possible units are:
- `px` - pixel
- `in` - inch
- `cm` - centimeter
- `mm` - millimeter

The `format` options are:
- `Letter`: 8.5in x 11in
- `Legal`: 8.5in x 14in
- `Tabloid`: 11in x 17in
- `Ledger`: 17in x 11in
- `A0`: 33.1in x 46.8in
- `A1`: 23.4in x 33.1in
- `A2`: 16.5in x 23.4in
- `A3`: 11.7in x 16.5in
- `A4`: 8.27in x 11.7in
- `A5`: 5.83in x 8.27in
- `A6`: 4.13in x 5.83in

A few examples:
- `{width: 100}` - prints with width set to 100 pixels
- `{width: '100px'}` - prints with width set to 100 pixels
- `{width: '10cm'}` - prints with width set to 10 centimeters.

```
options = {
  url: path.join(dist, 'index.html'),
  path: path.join(dist, 'assets'),
  filename: 'page.pdf',
  viewport: {
    width: 1440,
    height: 900
  },
  format: 'A4',
  printBackground: true,
}
```

##	License

Licensed under [The MIT License](LICENSE).

