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

//This hides the joke and recipe section until button is clicked
$("#display-joke").hide();
$("#recipe-output").hide();

//Click event function that makes the button work
$("#submit").on("click", function runRecipe(event) {
  event.preventDefault();
  userInput = $("#ingredient-search").val();
  if (validateSearch() === true) {
   
    //Once button is clicked the joke and recipe sections are shown
    $("#display-joke").show();
    $("#recipe-output").show();   
    // $("#input-box").hide();

//AJAX call to the Rapid Joke API
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
       //This appends the jokes to the page 
        $("#joke-display").append("<h4>" + response.content + "</h4>");
       
    });

   
};
//Joke function is called so that it is ran
ajaxJoke();

//Spoonacular API AJAX call that pulls the title, id, and image
var searchRecipes = function() {
    // var APIkey = "0d007a394f44487aa86b3cf24b6d61b1";
    // var APIkey = "66b398a7d9a14713aa514e72a4359574"
    var APIkey = "73f2fbc6d1fd4174bcea04f80c36aec4";
    
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

            //This is appending the image and titles to the page
            $(".recipeTitle").append("<h4>" + recipeTitles[i] + "</h4>");
            $(".recipeTitle").append("<img src=" + recipeImgs[i] + ">");
        }
        //Here we call the RecipeId function so that the ID's can be used in the next function
        ajaxRecipeID();
    });

};
//SearchRecipes function is called here so that all information is rendered
searchRecipes();

//AJAX call to spoonacular to grab the ID's from above function to use ID to grab sourceURl for recipe link
var ajaxRecipeID= function() {
   //For loop to loop through the above IDs 
    for(i=0; i < recipeIds.length; i++) {
        // var APIkey = "7f9700f622fe4443983e0143aa4f4b67";
        // var APIkey = "5b0bd6d01bbf4e1e8cce66eebc63b460";
        var APIkey = "918af980aa794f50aa2c97d72be80d4e";
        var secondQueryUrl = "https://api.spoonacular.com/recipes/" + recipeIds[i] + "/information?apiKey=" + APIkey;
        $.ajax({
            url: secondQueryUrl,
            method: "GET"
        }).then(function (secondaryResponse) {
            var sourceUrl = secondaryResponse.sourceUrl;
            sourceUrls.push(sourceUrl);
            //This is where the links are appended to the page
            $(".sourceUrl").append("<a href="+ sourceUrl +  ">" + "Recipe Link" + "," + "</a>");
            
        });
    }
        console.log(secondQueryUrl);
        console.log(sourceUrls);
    };
}});
