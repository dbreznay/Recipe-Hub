let input="";

input= "yogurt"

let recipeInput= document.getElementById('#input')
recipeInput.addEventListener('click',)



fetch('https://api.spoonacular.com/recipes/search?query=' + input + '&apiKey=2f4280fc895d40be90a0aea15ecda433')
  .then(response => response.json())
  .then(data => console.log(data))
