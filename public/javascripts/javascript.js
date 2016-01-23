$(document).ready(function() {
  $("#add-beer-button").click(function(){
    var search = $("#beer-search-box").val();
    var splitSearch = search.split(' ');
    searchParams = splitSearch.join('+');
    searchUntappd(searchParams);
  });
});

function searchUntappd(searchParams){
  $.ajax({
    url: 'https://api.untappd.com/v4/search/beer?client_id=01A58C550C16736146E4019C0B36C5A8478B128D&client_secret=89BF8DFD841F00A494EB2EFDCE95D477918A0880&q=' + searchParams +'&limit=10',
    type: "GET",
    dataType: 'json',
      success: function(data) {
      getTenBeers(data);
    },
      fail: function(error) {
      console.log('AJAX call didn\t work, son');
    }
  })
};

function getTenBeers(data) {
  var beerResults = [];
  for (var i = 0; i < data.response.beers.items.length; i++) {
    beerResults.push((data.response.beers.items[i].brewery.brewery_name) + ' ' + (data.response.beers.items[i].beer.beer_name));
    console.log(beerResults);
  };
   displayBeers(beerResults);
};

function displayBeers(beerResults){
  var searchResultsDiv = document.getElementById('beer-results');
  var beerList = document.createElement("ul");
  beerList.id = "beer-list";
  searchResultsDiv.appendChild(beerList);
  for (var i = 0; i < beerResults.length;i++) {
    var singleBeerDiv = document.createElement("div");
    singleBeerDiv.id = "single-beer-result";
    var singleBeerListElement = document.createElement("li");
    singleBeerListElement.innerHTML = '<a href="/add?q=' +beerResults[i] +'">'+beerResults[i]+'</a>';
    singleBeerListElement.id = beerResults[i];
    singleBeerDiv.appendChild(singleBeerListElement);
    var allBeersList = document.getElementById("beer-list");
    allBeersList.appendChild(singleBeerDiv);
  }
};





// function displayBeers(beerResults){
//   var searchResultsDiv = document.getElementById('beer-results');
//   var beerList = document.createElement("ul");
//   beerList.id = "beer-list";
//   searchResultsDiv.appendChild(beerList);
//   for (var i = 0; i < beerResults.length;i++) {
//     var singleBeerListElement = document.createElement("li");
//     singleBeerListElement.innerHTML = '<a href="/add?q=' +beerResults[i] +'">'+beerResults[i]+'</a>';
//     singleBeerListElement.id = beerResults[i];
//     var allBeersList = document.getElementById("beer-list");
//     allBeersList.appendChild(singleBeerListElement);
//   }
// };
