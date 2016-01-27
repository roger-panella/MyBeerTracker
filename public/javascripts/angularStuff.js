// angular.module('beerTracker',[]);



var cellarListCtrl = function ($scope) {
  $scope.responseBody = {
    username: 'roger',
    beers: [{
      brewery: 'Cantillon',
      name: 'Fou',
      style: 'Lambic',
      date: '2015',
      quantity: 4,
      forTrade: false,
      _id: '56a81d03a58a809b2022cc60'
    }, {
      brewery: 'Deschutes',
      name: 'The Abyss',
      style: 'stout',
      date: '2013',
      quantity: 4,
      forTrade: true,
      _id: '56a800b3d8f4365f1f5c3e08'
    }]};
  };

  angular.module('beerTracker',[]).config(function($interpolateProvider){
      $interpolateProvider.startSymbol('//');
      $interpolateProvider.endSymbol('//');
  }).controller('cellarListCtrl',cellarListCtrl);
