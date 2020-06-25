var userInput = "";
var recipeIds = [];
var sourceUrls = [];
var recipeImgs = [];
var recipeTitles = [];
var url; 

//form validation function
function validateSearch() {
  if (userInput === "") {
    return false;
  } else {
    return true;
  }
}


$("#display-joke").hide();
$("#recipe-output").hide();


$("#submit").on("click", function runRecipe(event) {
  event.preventDefault();
  userInput = $("#ingredient-search").val();
  if (validateSearch() === true) {
    
    $("#display-joke").show();
    $("#recipe-output").show();   
    // $("#input-box").hide();


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
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        
        $("#joke-display").append(response.content);
       
    });

   
};

ajaxJoke();

var searchRecipes = function() {
    // var APIkey = "0d007a394f44487aa86b3cf24b6d61b1";
    // var APIkey = "73f2fbc6d1fd4174bcea04f80c36aec4";
    // var APIkey = "918af980aa794f50aa2c97d72be80d4e";
    var APIkey = "dc32c6a8586a4a5584bb205fec980b90";
    var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + APIkey + "&ingredients=" + userInput;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        for(i=0; i < response.length; i++) {
            recipeIds.push(response[i].id);
            recipeTitles.push(response[i].title);
            recipeImgs.push(response[i].image);
            $(".recipeTitle").append(recipeTitles[i]);
            $(".recipeImage").append("<img src=" + recipeImgs[i] + ">");
        }
        ajaxRecipeID();
    });

};

searchRecipes();

var ajaxRecipeID= function() {
   
    for(i=0; i < recipeIds.length; i++) {
        // var APIkey = "0d007a394f44487aa86b3cf24b6d61b1";
        // var APIkey = "73f2fbc6d1fd4174bcea04f80c36aec4";
        // var APIkey = "918af980aa794f50aa2c97d72be80d4e";
        var APIkey = "dc32c6a8586a4a5584bb205fec980b90";
        var secondQueryUrl = "https://api.spoonacular.com/recipes/" + recipeIds[i] + "/information?apiKey=" + APIkey;
        $.ajax({
            url: secondQueryUrl,
            method: "GET"
        }).then(function (secondaryResponse) {
            var sourceUrl = secondaryResponse.sourceUrl;
            sourceUrls.push(sourceUrl);
            $(".sourceUrl").append("<a href="+ sourceUrl +  ">" + "Recipe Link" + "</a>");
            
        });
    }
        console.log(secondQueryUrl);
        console.log(sourceUrls);
    };
}});
