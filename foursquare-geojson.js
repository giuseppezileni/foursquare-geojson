var request = require("request");
var _ = require('underscore');
var querystring = require('querystring');
var async = require("async");
var _config = require('./foursquare-geojson.config.js');
var _geojson = require('./foursquare-geojson.geojson.js');

module.exports.version = '1.0.1';

var location = {
    lat: 0,
    lng: 0,
    section: '',
    limit: 0
};

var venues;
var geojson;

module.exports = {
    
    explore: function (lat, lng, section, limit, callback) {
        location.lat = lat;
        location.lng = lng;
        location.limit = limit;
        location.section = section;
        
        async.series([_explore,
                      _get_geojson], 
                     function (err, result) {
            if (!err) {
                console.log(result);
            } else {
                // some functions about errors   
            }
        });
        
        if (typeof callback === 'function') {
            callback(venues, geojson);   
        }
    }
};

function _explore(callback) {
    
    if (typeof location.section === 'undefined' || location.section == null) {
        location.section = _config.section_default;
	} else {
        var s = _.find(this.sections, function (item) {
            return item === location.section;
        });

        if (typeof s === 'undefined') {
            location.section = _config.section_default;
        }
    };

    if (typeof location.limit === 'undefined' || location.limit == null) {
        location.limit = 3;
    };

    var params = {
        'll': location.lat + ', ' + location.lng,
        'section': location.section,
        'limit': location.limit
    };

    var url = "https://api.foursquare.com/v2/venues/explore?" + 
                querystring.stringify(params) + '&' + 
                querystring.stringify(this.credentials);
        
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          	var results = JSON.parse(body);
            venues = results.response.groups
            callback(null,'explored');
        } else {
          	console.log('error to getting data foursquare');
            venues = null;
            callback(null,'explored');
        };
    });
};

function _get_geojson(callback) {
    
    if (!venues) {
        geojson = _geojson.get(venues);
        callback(null, 'geojson');
    };
    
};