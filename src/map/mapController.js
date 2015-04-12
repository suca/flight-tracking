app.controller('mapController', function ($scope, $http) {

    $scope.myCoordinates = [
        {
            latitude: -16.40,
            longitude:-68.999999999999
        },
        {
            latitude: -18.42,
            longitude:-68.999999999999
        },
        {
            latitude: -20.44,
            longitude:-68.999999999999
        },
        {
            latitude: -22.46,
            longitude:-68.999999999999
        },
        {
            latitude: -24.48,
            longitude:-68.999999999999
        },
        {
            latitude: -26.50,
            longitude:-68.999999999999
        },
        {
            latitude: -28.52,
            longitude:-68.999999999999
        },
        {
            latitude: -30.54,
            longitude:-68.999999999999
        },
        {
            latitude: -32.56,
            longitude:-68.999999999999
        },
        {
            latitude: -34.58,
            longitude:-68.999999999999
        },
        {
            latitude: -36.60,
            longitude:-68.999999999999
        },
        {
            latitude: -38.62,
            longitude:-68.999999999999
        }


    ];
    var map;
	var mapInitialConfig = function(){
            //Setting map initial configuration
            map = new ol.Map({
                target:'map',
                renderer:'canvas',
                view: new ol.View({
                    projection: 'EPSG:900913',
                    center:[0,0],
                    zoom:1,
                    minZoom:1
                })
            });
            //Set king of layer
            var newLayer = new ol.layer.Tile({
                source: new ol.source.OSM()
            });
            //Add layer to the map
            map.addLayer(newLayer);
            //Remove zoom options and inf
//          $('.ol-zoom').remove();
//          $('.ol-attribution').children().remove();
            //Set popups configuration
            var element = document.getElementById('popup');
            var popup = new ol.Overlay({
                element: element,
                positioning: 'bottom-center',
                stopEvent: false
            });
            map.addOverlay(popup);
    };

    var openlayer = function(array){
        //myDevice: mD ; otherDevices: oD
        var coordsObj = array;
        var vectorSource = new ol.source.Vector({
            //create empty vector
        });
        vectorSource.clear();

        //create a bunch of icons and add to source vector
        //console.log(JSON.stringify(devicesList,null,4));
        for (var i=0;i<coordsObj.length;i++){
                var iconFeature = new ol.Feature({
                    geometry: new
                        ol.geom.Point(ol.proj.transform([coordsObj[i].longitude, coordsObj[i].latitude], 'EPSG:4326','EPSG:3857')),
                });
                vectorSource.addFeature(iconFeature);
                map.removeLayer($scope.vectorLayer);
        }
        //add the feature vector to the layer vector, and apply a style to whole layer
        $scope.vectorLayer = new ol.layer.Vector({
            name: 'layer1',
            source: vectorSource,
            style: function(feature){
                var icon= 'http://www.eclypsia.com/uploads/media/raceSc2/0001/05/thumb_4401_raceSc2_normal.png';
                //Style Object
                var styleObject = {
                    scale: 0.4,
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    opacity: 1,
                    src: ''
                };
                styleObject.src = icon;
                //create the style
                var iconStyle = new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ (
                        styleObject
                        ))
                });
                return [iconStyle];
            }
        });
        map.addLayer($scope.vectorLayer);
    };

    var moveIcon = function(){
        var n = 200;
        var omegaTheta = 30000; // Rotation period in ms
        var R = 7e6;
        var r = 2e6;
        var p = 2e6;
        map.on('postcompose', function(event) {
            var vectorContext = event.vectorContext;
            var frameState = event.frameState;
            var theta = 2 * Math.PI * frameState.time / omegaTheta;
            var coordinates = [];
            var i;
            for (i = 0; i < $scope.myCoordinates.length; ++i) {
                var t = theta + 2 * Math.PI * i / n;
                var x = (R + r) * Math.cos(t) + p * Math.cos((R + r) * t / r);
                var y = (R + r) * Math.sin(t) + p * Math.sin((R + r) * t / r);
                coordinates.push([x, y]);
            }
            vectorContext.setImageStyle(imageStyle);

            var headPoint = new ol.geom.Point(coordinates[coordinates.length - 1]);
            var headFeature = new ol.Feature(headPoint);
            vectorContext.drawFeature(headFeature, headInnerImageStyle);

            vectorContext.setImageStyle(headOuterImageStyle);
            vectorContext.drawMultiPointGeometry(headPoint, null);

            map.render();
        });
        map.render();
    };

    var init = function(){
      mapInitialConfig();
      openlayer($scope.myCoordinates);
        moveIcon();
    };

    init();

    var imageStyle = new ol.style.Circle({
        radius: 5,
        snapToPixel: false,
        fill: new ol.style.Fill({color: 'yellow'}),
        stroke: new ol.style.Stroke({color: 'red', width: 1})
    });

    var headInnerImageStyle = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 2,
            snapToPixel: false,
            fill: new ol.style.Fill({color: 'blue'})
        })
    });

    var headOuterImageStyle = new ol.style.Circle({
        radius: 5,
        snapToPixel: false,
        fill: new ol.style.Fill({color: 'black'})
    });

//	var image = new ol.style.Circle({
//	  radius: 5,
//	  fill: null,
//	  stroke: new ol.style.Stroke({color: 'red', width: 1})
//	});
//
//	var styles = {
//	  'Point': [new ol.style.Style({
//	    image: image
//	  })],
//	  'Polygon': [new ol.style.Style({
//	    stroke: new ol.style.Stroke({
//	      color: 'blue',
//	      lineDash: [4],
//	      width: 3
//	    }),
//	    fill: new ol.style.Fill({
//	      color: 'rgba(0, 0, 255, 0.1)'
//	    })
//	  })]
//	};
//
//	var styleFunction = function(feature, resolution) {
//	  return styles[feature.getGeometry().getType()];
//	};
//
//	var vectorSource = new ol.source.GeoJSON(
//    /** @type {olx.source.GeoJSONOptions} */ ({
//      object: {
//        'type': 'FeatureCollection',
//        'crs': {
//          'type': 'name',
//          'properties': {
//            'name': 'EPSG:3857'
//          }
//        },
//        'features': [
//          {
//            'type': 'Feature',
//            'geometry': {
//              'type': 'Point',
//              'coordinates': [0, 0]
//            }
//          },
//          {
//            'type': 'Feature',
//            'geometry': {
//              'type': 'Polygon',
//              'coordinates': [[[-5e6, -1e6], [-4e6, 1e6], [-3e6, -1e6]]]
//            }
//          }
//        ]
//      }
//    }));
//
////vectorSource.addFeature(new ol.Feature(new ol.geom.Circle([5e6, 7e6], 1e6)));
//
//	var vectorLayer = new ol.layer.Vector({
//	  source: vectorSource,
//	  style: styleFunction
//	});
//
//	var map = new ol.Map({
//	  layers: [
//	    new ol.layer.Tile({
//	      source: new ol.source.OSM()
//	    }),
//	    vectorLayer
//	  ],
//	  target: 'map',
//	  controls: ol.control.defaults({
//	    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
//	      collapsible: false
//	    })
//	  }),
//	  view: new ol.View({
//	    center: [0, 0],
//	    zoom: 2
//	  })
//	});
//
//	$http({
//        method: 'GET',
//        url:    'http://localhost:3335/api/flight/1',
//        params: '',
//        data:   {},
//        headers: {
//        	"Content-Type": "application/json"
//        }
//     }).
//	success(function(){
//		console.log("Success");
//	})
//	.error(function(){
//		console.log("Failure");
//	});

})