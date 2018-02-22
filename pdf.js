const fs = require('fs-extra');
const _ = require('lodash');
const path = require('path');
const pdf = require('html-pdf');

/**
 * Converts the specified HTML source file to PDF and saves it to the specified destination path.
 *
 * Uses https://www.npmjs.com/package/html-pdf to perform the conversion with PhantomJS.
 *
 * @param {String} src - The path to the HTML file to convert
 * @param {String} dest - The path to save the generated PDF file to
 * @param {Object} options - Options to pass to html-pdf
 * @param {String} options.width - The width of the screen (defaults to "1024px")
 * @param {String} options.height - The height of the screen (defaults to "768px")
 * @returns {Promise} A promise that will be resolved with the result of calling html-pdf on the source file
 */
module.exports = async function generatePdfFromSlides(src, dest, options) {
  if (!src || !src.match(/\.html$/)) {
    throw new Error('Source file ${src} is not an HTML file');
  }

  // Read HTML from src file
  const html = await readFile(src);

  // Base options (cannot be overriden)
  const pdfOptions = {
    base: `file://${path.resolve(src)}`
  };

  // Options from environment variables
  const envOptions = {
    renderDelay: parseEnvInt(process.env.PDF_RENDER_DELAY),
    width: process.env.PDF_WIDTH,
    height: process.env.PDF_HEIGHT
  };

  // Default options
  const defaultOptions = {
    renderDelay: 10000,
    width: '1024px',
    height: '768px'
  };

  _.defaults(pdfOptions, options, envOptions, defaultOptions);
  console.log(pdfOptions);

  return await convertHtmlToPdf(html, dest, pdfOptions);
};

async function readFile(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch(err) {
    if (err.code === 'ENOENT') {
      throw new Error(`File "${filePath}" does not exist`);
    }

    throw err;
  }
}

function convertHtmlToPdf(htmlFilePath, destPath, pdfOptions) {
  return new Promise((resolve, reject) => {
    pdf
      .create(htmlFilePath, pdfOptions)
      .toFile(destPath, (err, res) => err ? reject(err) : resolve(res));
  });
}

function parseEnvInt(name) {

  const value = process.env[name];
  if (!value) {
    return;
  }

  const number = parseInt(value, 10);
  if (!_.isInteger(number) || number < 0) {
    throw new Error(`"$PDF_RENDER_DELAY" must be an integer greater than or equal to zero`);
  }

  return number;
}
