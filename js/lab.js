const GLASS = document.getElementById('glass');
const INGREDIENTS = document.querySelectorAll('.ingredients li');
const SHAKE_BUTTON = document.getElementById('shake-button');
const EMPTY_BUTTON = document.getElementById('empty-button');
const FULL_DIV = document.getElementById('full');

let ingredientsHeight = 0;

INGREDIENTS.forEach((ingredient) => {
   // When clicking on an ingredient
   ingredient.addEventListener('click', () => {
      // Check if the glass is full
      if (isGlassFull()) {
         // console.log(isGlassFull());
         FULL_DIV.textContent = 'The glass is full 🍹';
         return;
      }

      // Get the ingredient name to search the class
      const INGREDIENT_NAME = ingredient.id;

      let ingredientInGlass = GLASS.querySelector(`.${INGREDIENT_NAME}`);

      if (ingredientInGlass) {
         // Increase height of existing ingredient
         ingredientInGlass.style.height = `${ingredientInGlass.offsetHeight + 30}px`; // retun the height of the element as an integer
      } else {
         // Create a new div for the ingredient
         const ingredientToAdd = document.createElement('div');
         ingredientToAdd.classList.add(INGREDIENT_NAME);
         ingredientToAdd.style.height = '30px';

         // Add click event to remove ingredient from glass
         ingredientToAdd.addEventListener('click', () => {
            ingredientToAdd.remove();
            ingredientsHeight -= parseInt(ingredientToAdd.style.height);

            if (ingredientsHeight === 0) {
               FULL_DIV.innerHTML = '';
            }
         });

         GLASS.appendChild(ingredientToAdd);
      }

      // Update total ingredients height
      ingredientsHeight += 30;
      // console.log(ingredientsHeight);
   });
});

// Function to check if the glass is full
/* Return true when the total ingredients height +30 (the height of the last ingredient without actually adding it)
is greater than the glass height - 35 (the inside height of the glass without the 35px border bottom) */
function isGlassFull() {
   return ingredientsHeight + 30 > GLASS.offsetHeight - 35;
}

// Event listener for empty button
EMPTY_BUTTON.addEventListener('click', () => {
   // Empty glass
   GLASS.innerHTML = '';
   FULL_DIV.innerHTML = '';

   // Reset ingredients height
   ingredientsHeight = 0;
});

// Event listener for shake button
SHAKE_BUTTON.addEventListener('click', () => {
   GLASS.classList.add('shake');
   setTimeout(() => GLASS.classList.remove('shake'), 500);

   // Empty glass
   GLASS.innerHTML = '';
   const shakeDrink = document.createElement('div');
   shakeDrink.classList.add('shakeDrink');
   shakeDrink.style.height = `${ingredientsHeight}px`;

   GLASS.appendChild(shakeDrink);
});
