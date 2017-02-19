# Contributing

<!-- START doctoc -->
<!-- END doctoc -->



## First-time setup

```bash
git clone git@github.com:MediaComem/comem-webdev.git
cd comem-webdev
npm install
```



## Usage

### Run slides server

```bash
npm start
```

This will serve the compiled slides (with live-reload) at [http://localhost:3000](http://localhost:3000).

### Generate slides and deploy to GitHub pages

```bash
npm run deploy
```

Note that this runs a script which requires a **Unix shell** (use Git Bash or equivalent on Windows).

### Generate slides as PDF

```bash
npm run pdf
```

This will convert the slides to PDF and save them in the `pdf` directory.

**Warning:** slides are converted to PDF with [PhantomJS][phantomjs] through the [html-pdf][html-pdf] npm package.
Apparently, webfonts (custom fonts loaded through CSS) are somewhat buggy in PhantomJS.
Before running this script, you should install the custom fonts on your system (they are in `assets/fonts`).



## Documentation

You should be familiar with:

* [Remark][remark]
* Remark's [Markdown syntax][remark-syntax]
* [md2remark][md2remark] (converter of regular Markdown to Remark Markdown)



## Configuration

The following environment variables can be used for customization:

* `$BROWSER` - The browser with which to open the slides when running the slides server (defaults to your system's browser)
* `$BUILD_DIR` - The directory in which the generated HTML slides are saved (defaults to `build`)
* `$LIVERELOAD_PORT` - The port on which the live-reload server is run (defaults to 35729)
* `$PDF_BUILD_DIR` - The directory in which the generated PDF slides are saved (defaults to `pdf`)
* `$PORT` - The port on which the slides server is run (defaults to 3000)

You can also put these settings in a `local.config.js` file in the project's directory:

```js
exports.browser = 'Google Chrome';
exports.port = 3000;
exports.liveReloadPort = 35729;
```



[html-pdf]: https://www.npmjs.com/package/html-pdf
[md2remark]: https://github.com/AlphaHydrae/md2remark#md2remark
[phantomjs]: http://phantomjs.org
[remark]: https://remarkjs.com
[remark-syntax]: https://github.com/gnab/remark/wiki/Markdown
