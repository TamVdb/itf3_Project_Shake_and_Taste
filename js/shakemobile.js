var myShakeEvent = new Shake({
   threshold: 15, // optional shake strength threshold
   timeout: 1000, // optional, determines the frequency of event generation
});

myShakeEvent.start();

window.addEventListener('shake', shakeEventDidOccur, false);

//function to call when shake occurs
function shakeEventDidOccur() {
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
      });
   });

   alert('shake!');
}

window.removeEventListener('shake', shakeEventDidOccur, false);

myShakeEvent.stop();
