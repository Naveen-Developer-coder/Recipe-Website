document.getElementById('searchButton').addEventListener('click', searchRecipes);

function searchRecipes() {
  const searchTerm = document.getElementById('searchInput').value.trim();

  if (searchTerm !== '') {
   Promise.all(
      [
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`),
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      ]
    ).then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
        displayRecipes(data[0].meals);
        displayRandomResult(data[1].meals[0]);
     console.log(data);
      })
      .catch(error => {
        console.error('error fetching data', error);
        clearResult();
        displayError();
      })
  } else {
    clearResult();
  }

  function displayRecipes(recipes) {

    const resultsList = document.getElementById('results');
    resultsList.innerHTML = '';

    if (recipes) {
      recipes.forEach(recipe => {
        const li = document.createElement('li');
        li.classList.add('recipe');


        const img = document.createElement('img');
        img.src = recipe.strMealThumb;
        img.alt = recipe.strMeal;

        const title = document.createElement('h3');
        title.textContent = recipe.strMeal;

        const recipeDetailes = document.createElement('p');
        recipeDetailes.textContent = recipe.strInstructions;


        li.appendChild(img);
        li.appendChild(title);
        li.appendChild(recipeDetailes);

        resultsList.appendChild(li)
      });
    } else {
      const li = document.createElement('li');
      li.textContent = "No recipes found";
      resultsList.appendChild(li);
    }
  }


  function displayRandomResult(recipe) {
    const resultsList = document.getElementById('results');

    if (recipe) {
      const li = document.createElement('li');
      li.classList.add('recipe');


      const img = document.createElement('img');
      img.src = recipe.strMealThumb;
      img.alt = recipe.strMeal;

      const title = document.createElement('h3');
      title.textContent = recipe.strMeal;

      const recipeDetailes = document.createElement('p');
      recipeDetailes.textContent = recipe.strInstructions;


      li.appendChild(img);
      li.appendChild(title);
      li.appendChild(recipeDetailes);

      resultsList.appendChild(li);
    } else {
      displayError();
    }
  }
}


function clearResult() {
  document.getElementById('result').innerHTML = '';
}

function displayError(){
  const resultsList = document.getElementById('results');
  resultsList.innerHTML = '<li class="error">An error occured while fetching</li>';
}