# Contributing

<!-- START doctoc -->
<!-- END doctoc -->



## First-time setup

```bash
git clone git@github.com:MediaComem/comem-webdev.git
cd comem-webdev
npm install
```



## Run slides server

```bash
npm start
```

This will serve the compiled slides (with live-reload) at [http://localhost:3000](http://localhost:3000).



## Configuration

* Set the `$BROWSER` environment variable to change which browser the slides are opened in (defaults to your system's browser).
* Set the `$PORT` environment variable to change the port on which the slides server is run (defaults to 3000).
* Set the `$LIVERELOAD_PORT` environment variable to change the port on which the live-reload server is run (defaults to 35729).

You may also put these settings in a `local.config.js` file in the project's directory:

```js
exports.browser = 'Google Chrome';
exports.port = 3000;
exports.liveReloadPort = 35729;
```
