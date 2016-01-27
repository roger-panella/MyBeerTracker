var beerTracker = angular.module('beerTracker',[]);

angular.module('beerTracker', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});
