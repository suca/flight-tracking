app.controller('mapController', function ($scope, $http) {

	
	var image = new ol.style.Circle({
	  radius: 5,
	  fill: null,
	  stroke: new ol.style.Stroke({color: 'red', width: 1})
	});

	var styles = {
	  'Point': [new ol.style.Style({
	    image: image
	  })],
	  'Polygon': [new ol.style.Style({
	    stroke: new ol.style.Stroke({
	      color: 'blue',
	      lineDash: [4],
	      width: 3
	    }),
	    fill: new ol.style.Fill({
	      color: 'rgba(0, 0, 255, 0.1)'
	    })
	  })]
	};

	var styleFunction = function(feature, resolution) {
	  return styles[feature.getGeometry().getType()];
	};

	var vectorSource = new ol.source.GeoJSON(
    /** @type {olx.source.GeoJSONOptions} */ ({
      object: {
        'type': 'FeatureCollection',
        'crs': {
          'type': 'name',
          'properties': {
            'name': 'EPSG:3857'
          }
        },
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [0, 0]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[[-5e6, -1e6], [-4e6, 1e6], [-3e6, -1e6]]]
            }
          }
        ]
      }
    }));

//vectorSource.addFeature(new ol.Feature(new ol.geom.Circle([5e6, 7e6], 1e6)));

	var vectorLayer = new ol.layer.Vector({
	  source: vectorSource,
	  style: styleFunction
	});

	var map = new ol.Map({
	  layers: [
	    new ol.layer.Tile({
	      source: new ol.source.OSM()
	    }),
	    vectorLayer
	  ],
	  target: 'map',
	  controls: ol.control.defaults({
	    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
	      collapsible: false
	    })
	  }),
	  view: new ol.View({
	    center: [0, 0],
	    zoom: 2
	  })
	});

	$http({
        method: 'GET',
        url:    'http://localhost:3000/api/flight/1',
        params: '',
        data:   {},
        headers: {
        	"Content-Type": "application/json"
        }
     }).
	success(function(){
		console.log("Success");
	})
	.error(function(){
		console.log("Failure");
	});
	
})