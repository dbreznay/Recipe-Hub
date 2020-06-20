var userInput = "";


var searchRecipes = function(recipes) {

    let APIkey = "2f4280fc895d40be90a0aea15ecda433";
    let queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + APIkey + "&ingredients=" + userInput;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
};

searchRecipes()
