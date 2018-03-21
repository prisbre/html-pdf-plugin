const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const puppeteer = require('puppeteer')

class HtmlPdfPlugin {
  // Default options
  constructor(options) {
    this.options = _.extend({
      url:'http://localhost:8080',
      path: path.join(__dirname, 'dist/assets'),
      filename: 'page.pdf',
      viewport: {
        width: 1440,
        height: 900
      },
      headless: { headless: true },
      format: 'A4',
      printBackground: true,
    }, options);
  }

  apply(compiler) {
    compiler.plugin('done', (compilation) => {
      this.cacheable && this.cacheable();
      let outputPath = path.resolve(process.cwd(), this.options.path);
      this.options.path = path.join(outputPath, this.options.filename);

      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
      }
      this.callback(this.options);
    });
  };

  async callback(options) {
    console.log('PDF Generating ...');
    const browser = await puppeteer.launch(options.headless)
    const page = await browser.newPage()
    await page.setViewport(options.viewport)
    await page.goto(options.url)
    await page.pdf(options)
    browser.close()
    console.log('****************************************************');
    console.log('PDF Generated')
  };
};

module.exports = HtmlPdfPlugin;