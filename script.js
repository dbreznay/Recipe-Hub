var userInput = "";


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

        let joke = response.content;

    

    });
};

ajaxJoke();

var searchRecipes = function() {

    let APIkey = "2f4280fc895d40be90a0aea15ecda433";
    let queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + APIkey + "&ingredients=" + userInput;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        let recipeTitle = response.title;
        let recipeImg = response.image;
        let recipeId = response.id;
    });
};

searchRecipes();



var ajaxRecipeId = function() {

    let APIkey = "2f4280fc895d40be90a0aea15ecda433";
    let queryUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=" + APIkey

    $ajax ({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
};