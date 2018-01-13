app.controller("portfolioController",function($scope,homeService){
    homeService.mysqlData().then(function(res){
        $scope.result = res;
    });
});