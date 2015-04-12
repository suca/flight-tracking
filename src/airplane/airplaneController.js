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
});