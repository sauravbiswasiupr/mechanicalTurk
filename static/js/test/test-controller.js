angular.module("catApp")
  .controller("TestController", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
  	//$scope.testMessage = "Waiting for server to reply";
    //$scope.imageThere = false;
    $scope.userName = $routeParams.name;
  	$scope.callTestEndpoint = function() {
  	  $http.get("/api/test")
  	  .then(function(data, status, headers, config) {
  	  	$scope.testMessage = data.data.message;
        $scope.imageArray = data.data.imageArray;
        $scope.newImage = $scope.imageArray.pop();
        $scope.imageThere = true;
       
        console.log("$scope.imageArray: ", data);
  	  }, function(data, status, headers, config) {
  	  	$scope.testMessage = "Error occurred while calling test endpoint";
  	  });
  	};

    $scope.refreshImage = function() {
      $http({
        url: "/api/push",
        method: "POST",
        data: { "notification": $scope.userName +" says: " + $scope.catshit, 
          "userName": $scope.userName,
          "url": $scope.newImage
        },
        headers: { 'Content-Type': 'application/json' }
      }).success(function(data) {
          $scope.newImage = $scope.imageArray.pop()
          $scope.catshit = ""
      });
    };

    $scope.callTestEndpoint();
  }]);