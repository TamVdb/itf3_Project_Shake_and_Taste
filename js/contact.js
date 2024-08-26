/**
 * ? Form
 * Get the form through its name attribute
 **/
const contactForm = document.contactForm;

// Get all the error messages
const errorName = document.querySelector('#name span');
const errorMail = document.querySelector('#mail span');
const errorTel = document.querySelector('#tel span');
const errorMessage = document.querySelector('#message span');
const errorTerms = document.querySelector('.terms span.error');

// Get the form message
const formMessage = document.getElementById('form-message');

// Get each inputs to change the border color when not valid
const nameInput = document.querySelector('#name input');
const mailInput = document.querySelector('#mail input');
const telInput = document.querySelector('#tel input');
const messageInput = document.querySelector('#message textarea');
const termsInput = document.querySelector('.terms .cbx span:first-child');

// Function to hide all the error messages
const hideErrors = () => {
   errorName.classList.add('hidden');
   errorMail.classList.add('hidden');
   errorTel.classList.add('hidden');
   errorMessage.classList.add('hidden');
   errorTerms.classList.add('hidden');
   nameInput.classList.remove('error-border');
   mailInput.classList.remove('error-border');
   telInput.classList.remove('error-border');
   messageInput.classList.remove('error-border');
   termsInput.classList.remove('error-border');
};

const nameReg = /^[\p{L}\p{N}\p{M}\s\-\\'\.]+$/u;
const emailReg = /[\w]+[\w.+\-]*@[\w\-]{1,}[.][a-zA-Z]{1,}/;
const telReg = /(0[1-9]\d{1,2} \d{6,7}|04\d{8})/;

// Function to check if name is valid.
/* Name is valid when is not empty, 
is equal or more than 2 characters and less or equal to 50 characters, 
and does not contain special characters except '-', '.', ''' and space */
const checkName = () => {
   if (!contactForm.name.value) {
      errorName.classList.remove('hidden');
      errorName.textContent = 'The field Full Name is required.';
      nameInput.classList.add('error-border');
      isValid = false;
   } else if (!nameReg.test(contactForm.name.value)) {
      console.log(nameReg.test(contactForm.name.value));
      errorName.classList.remove('hidden');
      errorName.textContent = "The format is not correct! Only use letters, spaces and following characters: - and '.";
      isValid = false;
   } else if (contactForm.name.value.length < 2 || contactForm.name.value.length > 50) {
      errorName.classList.remove('hidden');
      errorName.textContent = 'The field Full Name must be between 2 and 50 characters.';
      isValid = false;
   } else {
      isValid = true;
   }
};

// Function to check if email is valid
const checkMail = () => {
   if (!contactForm.mail.value) {
      errorMail.classList.remove('hidden');
      errorMail.textContent = 'The field Email is required';
      mailInput.classList.add('error-border');
      isValid = false;
   } else if (!emailReg.test(contactForm.mail.value)) {
      errorMail.classList.remove('hidden');
      errorMail.textContent =
         'The format is not correct! Only use letters, spaces and following characters: "@" and "."';
      mailInput.classList.add('error-border');
      isValid = false;
   } else {
      isValid = true;
   }
};

// Function to check if tel is valid
/* Phone is valid when is a valid Belgian phone number format and contains only digits */
const checkTel = () => {
   if (contactForm.tel.value) {
      if (!telReg.test(contactForm.tel.value)) {
         errorTel.classList.remove('hidden');
         errorTel.textContent = 'Only use Belgian phone number format and digits only';
         telInput.classList.add('error-border');
         isValid = false;
      } else {
         isValid = true;
      }
   }
};

// Function to check if message is valid
/* Message is valid when is not empty and less or equal to 500 characters */
const checkMessage = () => {
   if (!contactForm.message.value) {
      errorMessage.classList.remove('hidden');
      errorMessage.textContent = 'The field Message is required';
      messageInput.classList.add('error-border');
      isValid = false;
   } else {
      if (contactForm.message.value.length > 500) {
         errorMessage.classList.remove('hidden');
         errorMessage.textContent = 'The field Message should be less or equal to 500 characters';
         messageInput.classList.add('error-border');
         isValid = false;
      } else {
         isValid = true;
      }
   }
};

// Function to check if checkbox Terms is checked
const checkTerms = () => {
   if (!contactForm.terms.checked) {
      errorTerms.classList.remove('hidden');
      errorTerms.textContent = 'Terms and conditions must be accepted';
      termsInput.classList.add('error-border');
      isValid = false;
   } else {
      isValid = true;
   }
};

contactForm.formBtn.addEventListener('click', (e) => {
   e.preventDefault();

   hideErrors();

   checkName();
   checkMail();
   checkTel();
   checkMessage();
   checkTerms();

   console.log(isValid);

   if (isValid) {
      // We get the form data
      const formDatas = {
         name: contactForm.name.value,
         email: contactForm.mail.value,
         tel: contactForm.tel.value,
         message: contactForm.message.value,
         terms: contactForm.terms.checked,
      };
      console.log(formDatas);

      formMessage.textContent = 'Thank you! Your message has been sent successfully';

      contactForm.reset();
   }
});

hideErrors();
