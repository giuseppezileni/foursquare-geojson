# foursquare-geojson
NodeJS module to read and convert API Foursquare do GEOJSON data.

## Installation

<pre>npm install foursquare-geojson</pre>

## Methods

<pre>explore(lat, lng, section, limit, callback)</pre>
Explore famous site in a place according to geographical coordinates , and by sector. Return [GeoJSON](http://geojson.org) for your map with [Foursquare](https://developer.foursquare.com/docs/venues/explore) response json data, only groups array, that representing groups of recommendations.

* lat: Latitude of the user's location.  
* lng: Longitude of the user's location. 
* section: One of food, drinks, coffee, shops, arts, outdoors, sights, trending or specials, nextVenues (venues frequently visited after a given venue), or topPicks (default value, a mix of recommendations generated without a query from the user). Choosing one of these limits results to venues with the specified category or property.
* limit: Number of results to return, up to 50, defaults 10, raccomended 3.

## Example

<pre>
var foursquare = require("foursquare-geojson");

function load(callback) {
    foursquare.explore(41.0946, 16.8706, 'arts', 3, function (results, geojson) { 
        // .............    
    });
};

</pre>

## Developers & Support
Giuseppe Zileni ([Twitter](https://twitter.com/gzileni)/[Mail](mailto:me@gzileni.name)/[Site](http://www.gzileni.name))

