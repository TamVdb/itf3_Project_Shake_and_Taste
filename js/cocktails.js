const INPUT_SEARCH = document.getElementById('searchByName');
const BTN_SEARCH = document.getElementById('btn-search');
const BTN_WITH_ALCOHOL = document.getElementById('withAlcohol');
const BTN_WITHOUT_ALCOHOL = document.getElementById('withoutAlcohol');

const DIV_COCKTAILS = document.getElementById('drinksCards');

const MODAL = document.getElementById('modal');
const CLOSE_BTN = document.getElementById('close');
const OVERLAY = document.getElementById('background');
const MAIN = document.getElementsByTagName('main')[0];
const MODAL_TITLE = document.getElementById('modalTitle');
const MODAL_IMAGE = document.getElementById('modalImg');
const MODAL_TAGS_DIV = document.getElementById('modalTags');
const MODAL_INGREDIENTS = document.getElementById('modalIngredients');
const MODAL_INSTRUCTIONS = document.querySelector('#modalInstructions p');

const DIV_MESSAGE = document.getElementById('message');

let urlSearch = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
let urlCatAl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';
let urlCatNoAl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';

// Function which will show the data on the page
const showDrinks = async (drinks) => {
   DIV_COCKTAILS.innerHTML = '';

   // For each cocktail
   for (const drink of drinks) {
      // Create the div
      const DIV_COCKTAIL = document.createElement('div');
      DIV_COCKTAIL.classList.add('cocktail');

      // DIV Image
      const DIV_COCKTAIL_IMG = document.createElement('div');
      DIV_COCKTAIL_IMG.classList.add('cocktail-image');

      // Image
      const IMG = document.createElement('img');
      IMG.src = drink.strDrinkThumb;
      IMG.alt = `${drink.strDrink} cocktail`;

      // Name
      const DIV_COCKTAIL_NAME = document.createElement('div');
      DIV_COCKTAIL_NAME.classList.add('cocktail-name');
      const DIV_COCKTAIL_NAME_H3 = document.createElement('H3');
      DIV_COCKTAIL_NAME_H3.textContent = drink.strDrink;

      DIV_COCKTAIL.append(DIV_COCKTAIL_IMG, DIV_COCKTAIL_NAME);
      DIV_COCKTAIL_IMG.appendChild(IMG);
      DIV_COCKTAIL_NAME.appendChild(DIV_COCKTAIL_NAME_H3);
      DIV_COCKTAILS.append(DIV_COCKTAIL);

      DIV_COCKTAIL.addEventListener('click', async () => {
         try {
            DIV_MESSAGE.textContent = '';
            const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`);
            // console.log(res.data.drinks[0]);
            showModal(res.data.drinks[0]);
         } catch (err) {
            DIV_MESSAGE.textContent = 'Une erreur est survenue lors de la récupération des détails du cocktail';
         }
      });
   }
};

//Function which will show searched cocktails with an event listener on search button
BTN_SEARCH.addEventListener('click', async () => {
   DIV_MESSAGE.textContent = '';
   const searchedCocktail = INPUT_SEARCH.value.toLowerCase();
   if (searchedCocktail === '') {
      DIV_MESSAGE.textContent = 'Please enter a cocktail name';
   } else {
      try {
         DIV_MESSAGE.textContent = '';
         const res = await axios.get(`${urlSearch}${searchedCocktail}`);
         if (res.data.drinks === null) {
            DIV_MESSAGE.textContent = 'Sorry, no matching cocktail found';
            DIV_COCKTAILS.innerHTML = '';
         } else {
            showDrinks(res.data.drinks);
         }
      } catch (err) {
         DIV_MESSAGE.textContent = 'An error has occurred';
      }
   }
});

BTN_WITH_ALCOHOL.addEventListener('click', async () => {
   try {
      DIV_MESSAGE.textContent = '';
      const res = await axios.get(urlCatAl);
      showDrinks(res.data.drinks);
   } catch (err) {
      DIV_MESSAGE.textContent = 'An error has occurred';
   }
});

BTN_WITHOUT_ALCOHOL.addEventListener('click', async () => {
   try {
      DIV_MESSAGE.textContent = '';
      const res = await axios.get(urlCatNoAl);
      showDrinks(res.data.drinks);
   } catch (err) {
      DIV_MESSAGE.textContent = 'An error has occurred';
   }
});

/**
 * Function which will create the modal and fill it with data
 */
const showModal = (drink) => {
   // Show a modal width infos about the drink clicked
   MODAL.classList.remove('hidden');
   // Show a background overlay under open modal
   OVERLAY.classList.remove('hidden');
   // Add blur to main
   MAIN.classList.add('blur');

   console.log(drink);

   MODAL_TITLE.textContent = drink.strDrink;
   MODAL_IMAGE.src = drink.strDrinkThumb;
   MODAL_IMAGE.alt = `${drink.strDrink} cocktail`;

   // Clear existing tags
   MODAL_TAGS_DIV.innerHTML = '';

   if (drink.strTags !== null) {
      console.log(drink.strTags);
      const tags = drink.strTags.split(',');
      for (const tag of tags) {
         const MODAL_TAG = document.createElement('div');
         MODAL_TAG.classList.add('tag');
         MODAL_TAG.textContent = tag;
         MODAL_TAGS_DIV.append(MODAL_TAG);
      }
   }

   // Clear existing ingredients
   MODAL_INGREDIENTS.innerHTML = '';

   for (let i = 1; i <= 15; i++) {
      if (drink[`strIngredient${i}`]) {
         const MODAL_INGREDIENT = document.createElement('div');
         MODAL_INGREDIENT.classList.add('ingredient');

         const MODAL_INGREDIENT_NAME = document.createElement('div');
         MODAL_INGREDIENT_NAME.classList.add('ing-name');

         if (drink[`strMeasure${i}`] !== null) {
            MODAL_INGREDIENT_NAME.textContent = `${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`;
         } else {
            MODAL_INGREDIENT_NAME.textContent = `${drink[`strIngredient${i}`]}`;
         }

         // Image
         const MODAL_INGREDIENT_IMAGE = document.createElement('img');
         let url = `https://www.thecocktaildb.com/images/ingredients/${drink[`strIngredient${i}`]}-Small.png`;
         MODAL_INGREDIENT_IMAGE.src = url;
         MODAL_INGREDIENT_IMAGE.alt = drink[`strIngredient${i}`];

         MODAL_INGREDIENT.append(MODAL_INGREDIENT_IMAGE, MODAL_INGREDIENT_NAME);
         MODAL_INGREDIENTS.append(MODAL_INGREDIENT);
      }
   }

   MODAL_INSTRUCTIONS.textContent = drink.strInstructions;
};

CLOSE_BTN.addEventListener('click', () => {
   // Close and hide modal
   MODAL.classList.add('hidden');
   // Hide overlay
   OVERLAY.classList.add('hidden');
   // Remove blur effect on main
   MAIN.classList.remove('blur');
});
