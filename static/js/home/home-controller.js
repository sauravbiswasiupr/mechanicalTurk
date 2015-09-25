angular.module('catApp')
  .controller('HomeController', ['$scope', "$modal", function ($scope, $modal) {
  	$scope.catMessage = "Welcome to the world of cute cats";

  	$scope.adminLogin = function() {
      return $modal.open({
        template: 
          '  <div class="modal-body">' +
          '    <h3 class="text-center">Admin Login</h3>'+
          '    <form style="margin: 30px">' +
          '      <div class="form-group">' +
          '       <input type="email" class="form-control" name="email" placeholder="email" ng-model="admin.adminEmail">' +
          '      </div>' +
          '     <div class="form-group">' +
          '       <input type="password" class="form-control" name="password" placeholder="password" ng-model="admin.adminPassword">' +
          '      </div>' +
          '     <div class="form-group">' +
          '       <button class="btn btn-success" type="submit" ng-click="submit()">Login</button>' +
          '      </div>' +
          '    </form>' +
          '  </div>',
        controller: function($scope, $modalInstance, $location, $http) {
          $scope.admin = {};
          $scope.submit = function() {
          	console.log("$scope.email: ", $scope.admin.adminEmail);
          	console.log("$scope.password: ", $scope.admin.adminPassword);
          	$http.post("/api/adminLogin", {
          	  email: $scope.admin.adminEmail,
          	  password: $scope.admin.adminPassword
          	}).then(function(data, status, headers, config) {
               if (data.data.message === "success") {
               	  console.log("data.data: ", data.data);
               	  $location.path("/admin");
               }
               $modalInstance.close();
          	}, function(data, status, headers, config) {
                 console.log("Error");
          	});
          };
        }
      }).result;
    };

    $scope.userLogin = function() {
       return $modal.open({
        template: 
          '  <div class="modal-body">' +
          '    <h3 class="text-center">User Login</h3>'+
          '    <form style="margin: 30px">' +
          '      <div class="form-group">' +
          '       <input type="email" class="form-control" name="email" placeholder="email" ng-model="user.userEmail">' +
          '      </div>' +
          '     <div class="form-group">' +
          '       <input type="password" class="form-control" name="password" placeholder="password" ng-model="user.userPassword">' +
          '      </div>' +
          '     <div class="form-group">' +
          '       <button class="btn btn-success" type="submit" ng-click="submit()">Login</button>' +
          '      </div>' +
          '    </form>' +
          '  </div>',
        
        controller: function($scope, $modalInstance, $location, $http) {
          $scope.user = {};

          $scope.submit = function() {
          	console.log("$scope.user.email: ", $scope.user.userEmail);
          	console.log("$scope.user.password: ", $scope.user.userPassword);
          	$http.post("/api/login", {
          	  email: $scope.user.userEmail,
          	  password: $scope.user.userPassword
          	}).then(function(data, status, headers, config) {
              if (data.data.message === "success") {
              	var param1 = data.data.name;
              	$location.path("/test/" + param1);
              }

              $modalInstance.close();
          	}, function(data, status, headers, config) {

          	});
          }
        }
      }).result;
    };

    $scope.userSignup = function() {
      return $modal.open({
        template: 
          '  <div class="modal-body">' +
          '    <h3 class="text-center">Register</h3>'+
          '    <form style="margin: 30px">' +
          '      <div class="form-group">' +
          '       <input type="email" class="form-control" name="email" placeholder="email" ng-model="user.userEmail">' +
          '      </div>' +
          '     <div class="form-group">' +
          '       <input type="password" class="form-control" name="password" placeholder="password" ng-model="user.userPassword">' +
          '      </div>' +
          '     <div class="form-group">' +
          '       <button class="btn btn-success" type="submit" ng-click="submit()">Register</button>' +
          '      </div>' +
          '    </form>' +
          '  </div>',
        controller: function($scope, $modalInstance, $location, $http) {
          $scope.user = {};

          $scope.submit = function() {
          	console.log("$scope.email: ", $scope.user.userEmail);
          	console.log("$scope.password: ", $scope.user.userPassword);
          	$http.post("/api/signup", {
          	  email: $scope.user.userEmail,
          	  password: $scope.user.userPassword
          	}).then(function(data, status, headers, config) {
               if (data.data.message === "success") {
               	  console.log("data.data: ", data.data);
               	  $location.path("/test/" + data.data.name);
               }

               $modalInstance.close();
          	}, function(data, status, headers, config) {
                 console.log("Error", data.data);
          	});
          };
        }
      }).result;
    };
  }]);
