angular.module('beerTracker',[]);

angular.module('beerTracker').config(function($interpolateProvider){
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});

var myController = function($scope){
  $scope.myInput = "what up!";
};

angular.module('beerTracker').controller('myController', myController);

var cellarCtrl = function ($scope) {
  $scope.
});

angular.module('beerTracker').controller('cellarCtrl',cellarCtrl);
