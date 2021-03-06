// DOM Elements
const topNav = document.querySelector('#myTopnav');
const menuIcon = document.querySelector('#myTopnav .icon');
const modal = document.querySelector('.bground');
const modalOpen = document.querySelectorAll('.modal-btn');
const modalIconClose = document.querySelector('.close');
const modalBtnClose = document.querySelector('.btn-close');
const form = document.querySelector('form');
//const formData = document.querySelectorAll('.formData');
//const inputs = document.querySelectorAll('input');
const inputFirstname = document.querySelector('#first');
const inputLastname = document.querySelector('#last');
const inputEmail = document.querySelector('#email');
const inputBirthdate = document.querySelector('#birthdate');
      inputBirthdate.max = new Date().toISOString().split('T')[0];
      inputBirthdate.min = '1870-01-01';
const inputQuantity = document.querySelector('#quantity');
const inputsLocation = document.querySelectorAll('input[name="location"]');
const inputCheckbox1 = document.querySelector('#checkbox1');
const inputCheckbox2 = document.querySelector('#checkbox2');
const modalMessage = document.querySelector('.modal-message');



restoreForm()

menuIcon.addEventListener('click', editNav);

modalOpen.forEach((btn) => btn.addEventListener('click', openModal));

[modalIconClose, modalBtnClose].forEach((btn) => btn.addEventListener('click', closeModal));

form.addEventListener('submit', validateForm);



// Toggle responsive class to topnav
function editNav(event) {
  event.preventDefault();
  if (topNav.className === 'topnav') {
    topNav.className += ' responsive';
  } else {
    topNav.className = 'topnav';
  }
}

// display form
function openModal() {
  modal.style.display = 'block';
}

// hide form
function closeModal() {
  modal.style.display = 'none';
}

// switch confirmation message to reset form
function restoreForm() {
  modalMessage.style.display = 'none';
  modalBtnClose.style.display = 'none';
  form.style.display = 'block';
  form.reset();
}

// switch valid form to confirmation message
function showSuccessMsg() {
  form.style.display = 'none';
  modalMessage.style.display = 'flex';
  modalBtnClose.style.display = 'block';
}

////// --VALIDATION FUNCTIONS-- //////

// Firstname & Lastname : not empty & 2 characters min
function validateText(input) {
  if (input.value.toString().trim().length < 2) {
    input.parentElement.setAttribute('data-error-visible', 'true');
    return false;
  } else {
    input.parentElement.removeAttribute('data-error-visible');
    return true;
  }
}

// Email : corresponds to regex
function validateEmail(input) {
  // Regular Expression from Guide Dev Mozilla
  // https://developer.mozilla.org/fr/docs/Web/Guide/HTML/Formulaires/Validation_donnees_formulaire
  /*  string [from azAz09 and symbols] 1 or more times 
      @ [from azAz09 and '-'] 1 or more times
      optional group : '.'[from azAz09 and '-'] 0 or more times
  */
  const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!emailRegExp.test(input.value.trim())) {
    input.parentElement.setAttribute('data-error-visible', 'true');
    return false;
  } else {
    input.parentElement.removeAttribute('data-error-visible');
    return true;
  }
}

// Birthdate : not empty/only possible date, date between min & max, corresponds to regex
function validateDate(input) {
  // regex format xxxx-xx-xx (d = digits 0-9) 
  const dateRegExp = /^\d{4}-\d{2}-\d{2}$/;

  if (!input.value || input.value < input.min || input.value > input.max || !dateRegExp.test(input.value)) {
    input.parentElement.setAttribute('data-error-visible', 'true');
    return false;
  } else {
    input.parentElement.removeAttribute('data-error-visible');
    return true;
  }
}

// valid int number between 0 and 99
function validateNumber(input) {
  if (isNaN(input.value) || !input.value || input.value % 1 !== 0) {
    input.parentElement.setAttribute('data-error-visible', 'true');
    return false;
  } else if (!isNaN(input.value) && input.value > 99 || input.value < 0) {
    input.parentElement.setAttribute('data-error-visible', 'true');
    return false;
  } else {
    // input.value.replace(/^0+/, '');
    // console.log(input.value.replace(/^0+/, ''));
    input.parentElement.removeAttribute('data-error-visible');
    return true;
  }
}

// at least one radio button checked
function validateRadio(input) {
  let countCheck = 0;
  input.forEach(i => {
    if (i.checked) {
      countCheck++;
    }
  })

  if (countCheck === 0) {
    input[0].parentElement.setAttribute('data-error-visible', 'true');
    return false;
  } else {
    input[0].parentElement.removeAttribute('data-error-visible');
    return true;
  }
}

// checkbox 'general conditions' checked
function validateCheckbox(input) {
  if (!input.checked) {
    input.parentElement.setAttribute('data-error-visible', 'true');
    return false;
  } else {
    input.parentElement.removeAttribute('data-error-visible');
    return true;
  }
}
////// --END VALIDATION FUNCTIONS-- //////

// submit form
function validateForm(event) {
  let isFormOk = [];
  event.preventDefault(); // disable redirect + keep form datas if invalid

  isFormOk.push(validateText(inputFirstname));
  isFormOk.push(validateText(inputLastname));
  isFormOk.push(validateEmail(inputEmail));
  isFormOk.push(validateDate(inputBirthdate));
  isFormOk.push(validateNumber(inputQuantity));
  isFormOk.push(validateRadio(inputsLocation));
  isFormOk.push(validateCheckbox(inputCheckbox1));

  // if form doesn't return any 'false'
  if (!isFormOk.includes(false)) {
    // get every valid keys/values
    let datas = new FormData(form);
    for (let entry of datas.entries()) {
      console.log(entry[0], ':', entry[1]);
    }

    showSuccessMsg();
    [modalIconClose, modalBtnClose].forEach((btn) => btn.addEventListener('click', restoreForm));
  }
}