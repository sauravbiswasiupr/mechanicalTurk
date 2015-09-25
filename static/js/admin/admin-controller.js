angular.module("catApp")
  .controller("AdminController", ["$scope", "$http", "$interval", "Notification", function($scope, $http, $interval, Notification) {
  	$scope.checkNotifications = function() {
      $interval(function() {
      	 $scope.successNotify = false;
         $scope.ifVotes = false;
         $http.get("/api/admin")
           .then(function(data, status, headers, config) {
           	   $scope.successNotify = true;
               $scope.message = data.data.message;
               $scope.voteCount = data.data.voteCount;
               $scope.ifVotes = true;

               $scope.cute = $scope.voteCount["cute"];
               $scope.happy = $scope.voteCount["happy"];
               $scope.sad = $scope.voteCount["sad"];
               $scope.ugly = $scope.voteCount["ugly"];

               if ($scope.message !== "waiting") {
                   Notification.success({message: $scope.message});
                   $scope.ifVotes = false;
               }
           }, function(data, status, headers, config) {

           });
      }, 1000);
  	};

  	$scope.successNotify = false;
  	$scope.checkNotifications();

  }]);