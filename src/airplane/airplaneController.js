//Reports
app.controller('airplaneController', function ($scope, $http) {

	var viewer = new JSC3D.Viewer(document.getElementById('cv'));
    var randImg = Math.floor((Math.random() * 10) + 1);
    viewer.setParameter('SceneUrl',         'models/Boeing737/Boeing737.obj');
    viewer.setParameter('InitRotationX', 50);
    viewer.setParameter('InitRotationY', 50);
    viewer.setParameter('InitRotationZ', 50);
    viewer.setParameter('ModelColor',       '#CAA618');
    viewer.setParameter('BackgroundColor1', '#E5D7BA');
    viewer.setParameter('BackgroundColor2', '#383840');
    viewer.setParameter('BackgroundImageUrl', 'resources/background/sky' + randImg + '.jpg');
    viewer.setParameter('RenderMode','texturesmooth');
    viewer.init();
    viewer.update();
$scope.flightId="WN2734";
  $http({
    method: 'GET',
    url:    'http://localhost:3000/api/flight/'+$scope.flightId,
    params: '',
    data:   {},
    headers: {
      "Content-Type": "application/json"
    }
  }).
    success(function(response){
      var indexRoute= response.indexOf("({");
      var jsonValid = response.substring(indexRoute+1,response.length-1);
      $scope.flightData= JSON.parse(jsonValid);
      console.log("Success");
      //console.log($scope.flightData);
      $scope.photoPlaine={photo:''};
      $scope.photoPlaine.photo=$scope.flightData.photos != null ?'http:'+ $scope.flightData.photos[0].fullPath: null;
      console.log($scope.photoPlaine);
    })
    .error(function(){
      console.log("Failure");
    });

});
