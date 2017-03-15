# Ionic Extras

Useful tools to add to an Ionic application.

**You will need**

* [Bower][bower]
* [Cordova][cordova]
* A running [Ionic][ionic] application (v1, with Angular 1)

**Recommended reading**

* [Ionic](../ionic/)

<!-- START doctoc -->
<!-- END doctoc -->



## Geolocation

The [HTML Geolocation API][html-geolocation] allows the user to provide their geographical location to web applications.
Since an Ionic app is a web app, we can use it.

You could use it directly, but there are also several Angular wrapper libraries ready to use.
In this tutorial, we'll use [angularjs-geolocation][angularjs-geolocation].

Install it with Bower:

```bash
$> bower install --save angularjs-geolocation
```

Add a `<script>` tag to include it in `www/index.html`:

```js
<script src='lib/angularjs-geolocation/dist/angularjs-geolocation.min.js'>
</script>
```

Also add the new Angular module as a dependency of your application in `www/js/app.js`:

```js
angular.module('my-app', [ '...', `'geolocation'` ])
```



### Getting the user's location

Obtaining the user's current geographic coordinates is as simple as injecting the `geolocation` service in any of your controllers or services,
and calling its `getLocation()` function:

```js
angular.module('my-app').controller('MyCtrl', function(`geolocation`, $log) {
  var myCtrl = this;
  `geolocation.getLocation()`.then(function(`data`){
    myCtrl.latitude = `data.coords.latitude`;
    myCtrl.longitude = `data.coords.longitude`;
  }).catch(function(err) {
    $log.error('Could not get location because: ' + err.message);
  });
});
```

It's an **asynchronous** operation which returns a promise, so you call `.then()` to be notified when the location is available.
You can also call `.catch()` to be notified if there's a problem retrieving the location.

<!-- slide-column -->

When developing locally with `ionic serve`, the browser will ask for permission to get the user's location.
Click **Allow**.

<!-- slide-column -->

<img src='images/browser-allow-geolocation.png' class='w100' />



### Geolocation on insecure origins

If you get the following warning:

```txt
*getCurrentPosition() and watchPosition() no longer work on insecure origins.
*To use this feature, you should consider switching your application to a
*secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.
```

It's because your Ionic app is not running on localhost but on your IP address,
and getting the user's location over unencrypted HTTP is **no longer allowed on insecure origins**.
You should run your Ionic app on localhost to solve this issue:

```bash
$> ionic serve --address localhost
```



## Leaflet

There are many JavaScript map libraries, each with their own advantages.
For this tutorial, we'll use [Leaflet][leaflet] as it's one of the most popular,
and it has a pretty good Angular library: [angular-leaflet-directive][angular-leaflet-directive].

You can install both with Bower (it will automatically install Leaflet as well):

```bash
$> bower install --save angular-leaflet-directive
```

There are 3 files you need to include in `www/index.html`;
Leaflet's stylesheet, and the JavaScript files for Leaflet and the Angular directive:

```html
<link href='lib/leaflet/dist/leaflet.css' rel='stylesheet'>
<script src='lib/leaflet/dist/leaflet-src.js'></script>
<script src='lib/angular-leaflet-directive/dist/angular-leaflet-directive.js'>
</script>
```

Also add the `leaflet-directive` module as a dependency of your application in `www/js/app.js`:

```js
angular.module('my-app', [ '...', `'leaflet-directive'` ])
```



### Your map state

We'll assume you have a **map state** defined with Angular UI router,
and that this state has a template and a controller.
It could look something like this:

```js
.state('map', {
  url: '/map',
  controller: 'MapCtrl',
  controllerAs: 'mapCtrl',
  templateUrl: 'templates/map.html'
})
```

If you're using **tabs**, it could look like this instead:

```js
.state('tab.map', {
  url: '/map',
  views: {
    'tab-map': {
      controller: 'MapCtrl',
      controllerAs: 'mapCtrl',
      templateUrl: 'templates/map.html'
    }
  }
})
```



### Adding a map

Let's attach some data to our controller.
The map will need it:

```js
angular.module('my-app').controller('MapCtrl', function() {
  var mapCtrl = this;

* mapCtrl.defaults = {};
* mapCtrl.markers = [];
* mapCtrl.center = {
*   lat: 51.48,
*   lng: 0,
*   zoom: 14
* };
});
```

Use the `<leaflet>` directive from the angular-leaflet-directive library to display a map in the template:

```html
<ion-content scroll='false' data-tap-disabled='true'>
* <leaflet width='100%' height='100%'
*          defaults='mapCtrl.defaults'
*          center='mapCtrl.center'
*          markers='mapCtrl.markers'>
* </leaflet>
</ion-content>
```

#### Leaflet maps and Ionic

Be sure not to forget to add `scroll='false'` and `data-tap-disabled='true'` to your map's enclosing element:

```html
<ion-content `scroll='false'` `data-tap-disabled='true'`>
```

This prevents Ionic's mobile gestures from interfering with controlling the map.

Also do not forget to give your map a width and height:

```html
<leaflet `width='100%'` `height='100%'` ...>
```



### Adding markers to your map

You can add a marker simply by adding it to the `mapCtrl.markers` array we defined earlier.
Angular's two-way binding will do the rest:

<!-- slide-column -->

```js
mapCtrl.markers.push({
  lat: 51.48,
  lng: 0
});
```

<!-- slide-column -->

<img src='images/leaflet-marker.png' class='w100' />

#### Marker tooltips

If you want a tooltip to open when the marker is clicked, you can simply add a `message` property:

<!-- slide-column -->

```js
mapCtrl.markers.push({
  lat: 51.48,
  lng: 0,
  message: 'Hello World!'
});
```

<!-- slide-column -->

<img src='images/leaflet-marker-tooltip.png' class='w100' />

#### Dynamic marker tooltips

If you want to display dynamic data in the marker,
you must create an Angular scope for the marker with `getMessageScope()`:

<!-- slide-column -->

```js
var record = {
  title: 'Lorem ipsum'
};

*var msg = '<p>Hello World!</p>';
*msg += '<p>{{ record.title }}</p>';

mapCtrl.markers.push({
  lat: 51.48,
  lng: 0,
  message: `msg`,
* getMessageScope: function() {
*   var scope = $scope.$new();
*   scope.record = record;
*   return scope;
* }
});
```

<!-- slide-column -->

<img src='images/leaflet-marker-tooltip-scope.png' class='w100' />

<!-- slide-container -->

Do not forget to inject `$scope` in your controller for this example to work.

#### Complex marker templates

It's hard to maintain a marker template when you have to construct it manually like in the previous example.
If your marker template becomes too complex, save it in a file like `templates/mapTooltip.html`.

Then, when creating your marker, use the `ng-include` directive to load that template:

```js
var record = {
  title: 'Lorem ipsum'
};

mapCtrl.markers.push({
  lat: 51.48,
  lng: 0,
* message: '<div ng-include="\'templates/mapTooltip.html\'" />',
  getMessageScope: function() {
    var scope = $scope.$new();
    scope.record = record;
    return scope;
  }
});
```



### Leaflet events

Leaflet broadcasts several [events][angular-leaflet-directive-events] on the Angular scope.
You can react to them by injecting `$scope` and using its `$on()` function.

For example, the `leafletDirectiveMap.dragend` event is fired after the user drags the map:

```js
$scope.$on('`leafletDirectiveMap.dragend`', function(event, map){
  console.log('Map was dragged');
});
```

The `leafletDirectiveMarker.click` event is fired when the user clicks on a marker:

```js
$scope.$on('`leafletDirectiveMarker.click`', function(event, marker) {
  var coords = marker.model.lng + '/' + marker.model.lat;
  console.log('Marker at ' + coords + ' was clicked');
});
```



## Mapbox

[Mapbox][mapbox] is a mapping platform you can use to design maps.
You can integrate it into Leaflet to have a better looking map than the default one.

Create an account, log in and go to the Mapbox studio:

<p class='center'><img src='images/mapbox-menu.png' class='w90' /></p>



### Mapbox tilesets

Choose a **map tileset** for your app:

<p class='center'><img src='images/mapbox-tilesets.png' class='w80' /></p>



### Mapbox map ID

Copy the **map ID** of your tileset, which you will need it to tell Leaflet to use it:

<p class='center'><img src='images/mapbox-tileset-map-id.png' class='w100' /></p>



### Mapbox access tokens

Go into your **Account** settings and generate a new API access token:

<p class='center'><img src='images/mapbox-access-tokens.png' class='w80' /></p>

#### New mapbox access token

<!-- slide-column -->

You can leave the basic settings untouched and click on **Generate**:

<!-- slide-column 60-->

<img src='images/mapbox-new-access-token.png' class='w100' />

#### Copy the mapbox access token

Once you're done, copy the access token:

<p class='center'><img src='images/mapbox-copy-access-token.png' class='w70' /></p>



### Using a Mapbox tileset with Leaflet

To use your Mapbox tileset with angular-leaflet-directive, you have to construct a **tile layer URL**
containing both your **Mapbox tileset map ID** and your **Mapbox access token**:

```js
var `mapboxMapId` = 'mapbox.satellite';  // Use your favorite tileset here
var `mapboxAccessToken` = 'changeme';    // Use your access token here

// Build the tile layer URL
var mapboxTileLayerUrl = 'http://api.tiles.mapbox.com/v4/' + `mapboxMapId`;
mapboxTileLayerUrl = mapboxTileLayerUrl + '/{z}/{x}/{y}.png';
mapboxTileLayerUrl = mapboxTileLayerUrl + '?access_token=' + `mapboxAccessToken`;
```

You can then add this URL to the Leaflet map's configuration object in the `mapCtrl.defaults` variable in your map controller:

```js
mapCtrl.defaults = {
  tileLayer: mapboxTileLayerUrl
};
```



### Mapbox and Leaflet

Your map should now be using your Mapbox tileset:

<p class='center'><img src='images/mapbox-leaflet.png' class='w50' /></p>



[angular-leaflet-directive]: https://github.com/tombatossals/angular-leaflet-directive
[angular-leaflet-directive-events]: http://tombatossals.github.io/angular-leaflet-directive/#!/examples/events
[angular-leaflet-directive-examples]: http://tombatossals.github.io/angular-leaflet-directive/#!/examples/simple-map
[angularjs-geolocation]: https://github.com/arunisrael/angularjs-geolocation/
[bower]: https://bower.io
[cordova]: https://cordova.apache.org
[ionic]: http://ionicframework.com
[html-geolocation]: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
[leaflet]: http://leafletjs.com
[mapbox]: https://www.mapbox.com/
