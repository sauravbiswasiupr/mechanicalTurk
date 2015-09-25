var app = angular.module("catApp", ['ngResource', 'ngRoute', 'ui.bootstrap', 'ui.date', 'ui-notification']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'static/views/home/home.html', 
        controller: 'HomeController'})
      .when('/test/:name', {
      	templateUrl: 'static/views/test/test.html',
      	controller:  'TestController'
      })
      .when('/admin', {
        templateUrl: 'static/views/admin/admin.html',
        controller: 'AdminController'
      });
      //.otherwise({redirectTo: '/'});
  }]);

