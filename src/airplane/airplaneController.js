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
    
      $http({
        method: 'GET',
        url:    'http://localhost:3000/api/flights',
        params: '',
        data:   {},
        headers: {
          "Content-Type": "application/json"
        }
      }).
    success(function(response){
      

      var indexRoute= response.indexOf("({");
      var jsonValid = response.substring(indexRoute+1,response.length-1);
      $scope.flightData = JSON.parse(jsonValid);
      console.log($scope.flightData);
      $scope.dataFlight = [];
        
      
      if ($scope.flightData) {
        var auxFlights = $scope.flightData.planes[1];
        $scope.flights = [];
        $.each(auxFlights, function(index, value) {
          $scope.flights.push({
            id: index,
            data: value
          });
        });
      } 
      
    })
    .error(function(){
      console.log("Failure");
      $scope.flights = [];
    });

    $scope.onSelectFlight = function (item) {
      if (!item) {
        return false;
      }

      $scope.flightId = item.id;
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
        $scope.flightData = JSON.parse(jsonValid);
        console.log($scope.flightData);
        $scope.dataFlight = [];
        if ($scope.flightData) {
          if ($scope.flightData.aircraft) {
            $.each($scope.flightData.aircraft, function(index, value){
              $scope.dataFlight.push({
                label: index,
                value: value
              });
            })
          } else {
            alert("There is no data about the airplane...");
          }
          
          if ($scope.flightData.photos.length > 0) {
            $scope.photoPlaine={photo:''};
            $scope.photoPlaine.photo=$scope.flightData.photos != null ?'http:'+ $scope.flightData.photos[0].fullPath: null;
          } 
        }
      
      })
      .error(function(){
        console.log("Failure");
      });
    };

});
