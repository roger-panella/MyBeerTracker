// angular.module('beerTracker',[]);
// angular.module('beerTracker',[]);

var yesNo = function() {
  return function(input) {
      return input ? 'Yes' : 'No';
  }
}

var cellarListCtrl = function ($scope, cellarData){
  cellarData
    .success(function(data){
      $scope.data = data;
      console.log(data);
    })
    .error(function (e){
      console.log(e);
    });
    $scope.helloWorld = function (){
      console.log('yo');
    }
  };


var cellarData = function($http) {
  var userId = document.getElementById('userId').innerHTML;
  console.log(userId);
  return $http.get('/api/users/' + userId);
}

angular.module('beerTracker',[]).config(function($interpolateProvider){
      $interpolateProvider.startSymbol('//');
      $interpolateProvider.endSymbol('//');
  })
     .controller('cellarListCtrl',cellarListCtrl)
     .filter('yesNo',yesNo)
     .service('cellarData', cellarData);
