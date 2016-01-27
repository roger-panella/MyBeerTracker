var beerTracker = angular.module('beerTracker',[]);

// angular.module('beerTracker',[]).config(function($interpolateProvider){
//     $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
// });
beerTracker.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});

function hello () {
  console.log('this page is working!');
};
hello();
