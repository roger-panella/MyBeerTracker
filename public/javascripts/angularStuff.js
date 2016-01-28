// angular.module('beerTracker',[]);
// angular.module('beerTracker',[]);

var yesNo = function() {
  return function(input) {
      return input ? 'Yes' : 'No';
  }
}


// var cellarListCtrl = function ($scope) {
//   $scope.data = {
//     // username: 'roger',
//     beers: [{
//       brewery: 'Cantillon',
//       name: 'Fou',
//       style: 'Lambic',
//       date: '2015',
//       quantity: 4,
//       forTrade: false,
//       _id: '56a81d03a58a809b2022cc60'
//     }, {
//       brewery: 'Deschutes',
//       name: 'The Abyss',
//       style: 'stout',
//       date: '2013',
//       quantity: 4,
//       forTrade: true,
//       _id: '56a800b3d8f4365f1f5c3e08'
//     }]};
//   };
// var cellarListCtrl = function($scope, cellarData) {
//   $scope.data = cellarData;
//   console.log('-----data-----');
//   console.log({users: cellarData});
//   console.log(cellarData);
// };

var cellarListCtrl = function ($scope, cellarData){
  cellarData
    .success(function(data){
      $scope.data = data;
      console.log(data);
    })
    .error(function (e){
      console.log(e);
    });
  };


var cellarData = function($http) {
  var userId = document.getElementById('userId').innerHTML;
  console.log(userId);
  return $http.get('/api/users/' + userId);
}

// var cellarData = function() {
//   return {
//     _id: '32883247238947328904',
//     username: 'Sasha',
//     beers: [{
//     brewery: 'Ballast Point',
//     name: 'Sculpin',
//     style: 'IPA',
//     date: '2016',
//     quantity: 12,
//     forTrade: true,
//     _id: '48238367369368396306802'
//   },{
//     brewery: 'Ballast Point',
//     name: 'Peppermint Beer',
//     style: 'IPA',
//     date: '2016',
//     quantity: 12,
//     forTrade: true,
//     _id: '48238367369368396306802'
//   }]
// };
// };



angular.module('beerTracker',[]).config(function($interpolateProvider){
      $interpolateProvider.startSymbol('//');
      $interpolateProvider.endSymbol('//');
  })
     .controller('cellarListCtrl',cellarListCtrl)
     .filter('yesNo',yesNo)
     .service('cellarData', cellarData);
