module.exports.version = '1.0.0';

var geojson= {
    type : "FeatureCollection",
    features: []
};

module.exports = {

    get: function (venues) {

    	var self = this;
        
        geojson.features = [];
        
    	var j = 0;
    	
    	if (typeof data !== 'undefined') {

    		while (data[j]) {
    			console.log('---------');
    			while (data[j].items[i]) {
		    		var v = data[j].items[i].venue;

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
                                     Number(v.location.lng)]  
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

    	return geojson;
    }
};