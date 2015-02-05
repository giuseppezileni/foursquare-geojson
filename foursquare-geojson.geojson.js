var _ = require('underscore');
module.exports.version = '1.0.2';

var geojson= {
    type : "FeatureCollection",
    features: []
};

module.exports = {

    get: function (venues, callback) {

    	var self = this;
        
        geojson.features = [];
        
    	var j = 0;

    	console.log('reading venues data n.' + _.size(venues));

    	if (_.size(venues) > 0) {

    		while (venues[j]) {
    			console.log('---------');
    			var i = 0;
    			while (venues[j].items[i]) {
		    		var v = venues[j].items[i].venue;
		    		console.log('venues: ' + JSON.stringify(v));
		    		var title = v.name + '<br/>';

		    		if (typeof v.location.formattedAddress != 'undefined') {
		    			title += v.location.formattedAddress.join('<br/>');
		    		};

		    		title += '<br/>' + v.location.distance + ' mt';

		    		var feature = {
		              "type": "Feature",
		              "properties": {
		                "point": "venue",
		                "id": v.id,
		                "name": v.name,
		                "distance": v.location.distance,
		                "rating": v.rating,
		                "title": title,
		                "icon": 'foursquare',
		                "location": [Number(v.location.lat),
                                     Number(v.location.lng)],
                        "item": venues[j].items[i]
		              },
		              "geometry": {
		                "type": "Point",
		                "coordinates": [Number(v.location.lng),
                                        Number(v.location.lat)]
		              }
		            };

		            geojson.features.push(feature);

		    		i++;
		    	};
		    	j++;
		    };
	    };

    	if (typeof callback === 'function') {
    		callback(geojson);
    	}
    }
};