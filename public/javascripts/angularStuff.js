// angular.module('beerTracker',[]);
// angular.module('beerTracker',[]);

var yesNo = function() {
  return function(input) {
      return input ? 'Yes' : 'No';
  }
}

var cellarListCtrl = function ($scope, cellarData, $http){
  cellarData
    .success(function(data){
      $scope.data = data;
    })
    .error(function (e){
    });
    $scope.sendDate = function(date, id) {
      var beerToSend;
      console.log($scope.data.beers.length)
      for (var i = 0; i < $scope.data.beers.length;i++){
        if ($scope.data.beers[i]._id == id) {
          beerToSend = {
            beer : $scope.data.beers[i].beer,
            brewery : $scope.data.beers[i].brewery,
            style : $scope.data.beers[i].style,
            date : date,
            quantity : $scope.data.beers[i].quantity,
            forTrade : $scope.data.beers[i].forTrade
          }
        }
      }
          var idDiv = document.getElementById('userId');
          var realUserId = idDiv.innerHTML;
          $http.patch('/api/users/'+realUserId +'/beers/'+id,beerToSend)
            .success(function(data, status){
               console.log('fuck yeah');
            })
            console.log('yesssssss yessssssss whooooooo');
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
