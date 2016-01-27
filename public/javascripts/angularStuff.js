var beerTracker = angular.module('beerTracker',[]);

beerTracker.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});

function hello () {
  console.log('this page is working!');
};
hello();
