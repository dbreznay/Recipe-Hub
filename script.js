//form validation function
var userInput = "";


function validateSearch() {
  if (userInput === "") {
    return false;
  } else {
    return true;
  }
}


$("#joke-display").hide();
$("#recipe-section").hide();



$("#submit").on("click", function runRecipe(event) {
  event.preventDefault();
  userInput = $("#ingredient-search").val();
  if (validateSearch() === true) {
    
    $("#joke-display").show();
    $("#recipe-section").show();   
    $("search-box").hide();


var ajaxJoke = function() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://joke3.p.rapidapi.com/v1/joke",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "joke3.p.rapidapi.com",
            "x-rapidapi-key": "eb678bae5dmsh447c5c8972466f2p12564djsn27078449d11c"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);

        var joke = response.content;
        joke.push(response);
        document.getElementById("joke-display").innerHTML = joke;
        

    

    });
};

ajaxJoke();

var searchRecipes = function() {

    var APIkey = "2f4280fc895d40be90a0aea15ecda433";
    var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + APIkey + "&ingredients=" + userInput;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var recipeTitle = response.title;
        var recipeImg = response.image;
        var recipeId = response.id;
    });
};

searchRecipes();



var ajaxRecipeId = function() {

    var APIkey = "2f4280fc895d40be90a0aea15ecda433";
    var queryUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=" + APIkey;

    $ajax ({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var recipeLink = response.sourceUrl;
    });
};
}});
