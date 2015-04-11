app.controller('mainController', function($rootScope, $scope, $location) {

    var optionClicked = function (event) {
    	$(".nav.navbar-nav").find("li").removeClass("active");
    	$(this).parent().addClass("active");
    	$(".navbar-toggle").trigger('click');
    };
    $("#flightOpt").click(optionClicked);
    $("#aircraftOpt").click(optionClicked);
    $("#reportOpt").click(optionClicked);
    $("#homeOpt").click(function(){
    	$(".nav.navbar-nav").find("li").removeClass("active");
    	$(".navbar-toggle").trigger('click');
    });
    
	
	var image = new ol.style.Circle({
	  radius: 5,
	  fill: null,
	  stroke: new ol.style.Stroke({color: 'black', width: 1})
	});

	var styles = {
	  'Point': [new ol.style.Style({
	    image: image
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
          }
        ]
      }
    }));

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
	    attributionOptions: ({
	      collapsible: false
	    })
	  }),
	  view: new ol.View({
	    center: [0, 0],
	    zoom: 2
	  })
	});

});