
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
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        
        $("#joke-display").append(response.content);
       
    });

   
};

ajaxJoke();

var searchRecipes = function() {

    var APIkey = "e9152c22cf0f43a3a5c697ea8bf6d752";
    
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
            $(".recipeImage").append(recipeImgs[i]);
        }
        ajaxRecipeID();
    })

};

searchRecipes();

var ajaxRecipeID= function() {
   
    for(i=0; i < recipeIds.length; i++) {
        var APIkey = "e9152c22cf0f43a3a5c697ea8bf6d752";
        
        var secondQueryUrl = "https://api.spoonacular.com/recipes/" + recipeIds[i] + "/information?apiKey=" + APIkey;
        $.ajax({
            url: secondQueryUrl,
            method: "GET"
        }).then(function (secondaryResponse) {
            for(i=0; i < secondaryResponse.length; i++){
               sourceUrls.push(secondaryResponse[i].sourceUrl);
               $(".sourceUrl").append(sourceUrls[i]);
            } 
        });
    }
        console.log(secondQueryUrl);
        console.log(sourceUrls);
    }
}});
