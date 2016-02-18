$(document).ready(function() {
  $("#add-beer-button").click(function(){
    if (document.contains(document.getElementById("beer-list"))) {
      document.getElementById("beer-list").remove();
    };
    var search = $("#beer-search-box").val();
    var splitSearch = search.split(' ');
    searchParams = splitSearch.join('+');
    searchUntappd(searchParams);
  });
});

function searchUntappd(searchParams){
  $.ajax({
    url: '/search',
    type: "POST",
    dataType: 'text',
      data: {userSearch:searchParams},
      success: function(data) {
      getTenBeers(data);
    },
      fail: function(error) {
      console.log('AJAX call didnt work, son!');
    }
  })
};
// Beer search results as objects -- testing!

function getTenBeers(stringData) {
  var data = JSON.parse(stringData);
  var beerResults = [];
  for (var i = 0; i < data.response.beers.items.length; i++) {
    var beerObject = {};
    beerObject["brewery"] = data.response.beers.items[i].brewery.brewery_name;
    beerObject["beerName"] = data.response.beers.items[i].beer.beer_name;
    beerObject["imageUrl"] = data.response.beers.items[i].beer.beer_label;
    beerObject["beerStyle"] = data.response.beers.items[i].beer.beer_style;
    beerResults.push(beerObject);
  };
   displayBeers(beerResults);
};

// Beers rendering with objects

function displayBeers(beerResults){
  var searchResultsDiv = document.getElementById('beer-results');
  var beerList = document.createElement("ul");
  beerList.id = "beer-list";
  searchResultsDiv.appendChild(beerList);
  for (var i = 0; i < beerResults.length;i++) {
    var singleBeerDiv = document.createElement("div");
    singleBeerDiv.id = "single-beer-result";
    var labelImage = document.createElement("div");
    labelImage.id = "beer-search-image";
    labelImage.innerHTML = '<img id="label-image" src="'+beerResults[i].imageUrl+'">';
    singleBeerDiv.appendChild(labelImage);
    var singleBeerListElement = document.createElement("li");
    singleBeerListElement.id = "one-beer-result";
    // var encodedBeerName = beerResults[i].beerName.replace(/&/g,'%26');
    // var encodedBeerUrl=encodeURI('/add?brewery='+beerResults[i].brewery + '&beer=' + encodedBeerName + '&style=' +beerResults[i].beerStyle);
    var encodedBeer = beerResults[i].beerName.replace(/&/g,'%26');
    var encodedBeerUrl=encodeURI('/add?brewery='+beerResults[i].brewery + '&beer=' + encodedBeer + '&style=' +beerResults[i].beerStyle);
    // var encodedBeerUrl=encodeURI('/add?brewery='+beerResults[i].brewery + '&beer=' + beerResults[i].beerName + '&style=' +beerResults[i].beerStyle);
    var beerUrl = encodedBeerUrl.replace(/#/g,'%23');

    // var beerUrl = firstBeerUrl.replace(/&/g,'%26');
    console.log(encodeURIComponent(beerResults[i].beerName));
    singleBeerListElement.innerHTML = '<a href=' + beerUrl + '>'+beerResults[i].brewery + ' ' + beerResults[i].beerName+'</a>';
    // singleBeerListElement.innerHTML = '<a href="/add?brewery='+beerResults[i].brewery + '&beer=' + beerResults[i].beerName + '&style=' +beerResults[i].beerStyle+'">'+beerResults[i].brewery+ ' ' + beerResults[i].beerName+'</a>';
    singleBeerDiv.appendChild(singleBeerListElement);
    var allBeersList = document.getElementById("beer-list");
    allBeersList.appendChild(singleBeerDiv);
  }
};








// Working Code with Arrays and not OBjects!!!!

// function getTenBeers(data) {
//   var beerResults = [];
//   for (var i = 0; i < data.response.beers.items.length; i++) {
//     beerResults.push((data.response.beers.items[i].brewery.brewery_name) + ' ' + (data.response.beers.items[i].beer.beer_name));
//     console.log(beerResults);
//   };
//    displayBeers(beerResults);
// };
//
// function displayBeers(beerResults){
//   var searchResultsDiv = document.getElementById('beer-results');
//   var beerList = document.createElement("ul");
//   beerList.id = "beer-list";
//   searchResultsDiv.appendChild(beerList);
//   for (var i = 0; i < beerResults.length;i++) {
//     var singleBeerDiv = document.createElement("div");
//     singleBeerDiv.id = "single-beer-result";
//     var singleBeerListElement = document.createElement("li");
//     singleBeerListElement.innerHTML = '<a href="/add?q=' +beerResults[i] +'">'+beerResults[i]+'</a>';
//     singleBeerListElement.id = beerResults[i];
//     singleBeerDiv.appendChild(singleBeerListElement);
//     var allBeersList = document.getElementById("beer-list");
//     allBeersList.appendChild(singleBeerDiv);
//   }
// };
