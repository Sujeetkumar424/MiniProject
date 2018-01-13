app.controller("aboutController",function($scope,$localStorage,$location){
  $scope.logout = function () {
      delete $localStorage.token;
      $location.path("/login");
  };
});