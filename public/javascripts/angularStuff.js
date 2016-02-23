var yesNo = function() {
  return function(input) {
      return input ? 'Yes' : 'No';
  }
}

// var cellarListCtrl = function ($scope, cellarData, $http){
var cellarListCtrl = function ($scope, cellarData, $http){
  cellarData
    .success(function(data){
      $scope.data = data;
      console.log(data.beers[0].brewery);
      $scope.sortType = 'brewery'
      $scope.sortReverse = false;
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
      // $scope.deleteBeer = function(userid, beerid, $index) {
      //
      //   var userId = document.getElementById('userId').innerHTML;
      //   $http.delete('/api/users/' + userId +'/beers/' + beerid);
      //   $scope.data.beers.splice($index, 1);
      // };

      $scope.deleteBeer = function(userid, beerid, beer, $index) {
      alertify.confirm("Are you sure you want to delete " + beer + " from your cellar?", onOk);
          function onOk(){
          var userId = document.getElementById('userId').innerHTML;
          $http.delete('/api/users/' + userId +'/beers/' + beerid);
          $scope.data.beers.splice($index, 1);
      };
    };
  // };

      $scope.sendBeerObject = function(beerBrewery, beerName, beerStyle, beerDate, beerQuantity, beerForTrade, beerId) {
        beerObject = {
          brewery: beerBrewery,
          beer: beerName,
          style: beerStyle,
          date: beerDate,
          quantity: beerQuantity,
          forTrade: beerForTrade
        };
        var idDiv = document.getElementById('userId');
        var realUserId = idDiv.innerHTML;
        $http.patch('/api/users/'+realUserId+'/beers/'+beerId,beerObject)
          .success(function(data, status){
            console.log('the beer was sent!');
          })
      }
    };

var cellarData = function($http) {
  var userId = document.getElementById('userId').innerHTML;
  return $http.get('/api/users/' + userId);
}

angular.module('beerTracker',[]).config(function($interpolateProvider){
      $interpolateProvider.startSymbol('//');
      $interpolateProvider.endSymbol('//');
  })
     .controller('cellarListCtrl',cellarListCtrl)
     .filter('yesNo',yesNo)
     .service('cellarData', cellarData)
     .service('dataService', function(){
       this.helloConsole = function(){
         console.log('This is the hello console service');
       }
     });
