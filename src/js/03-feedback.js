import throttle from "lodash.throttle";

const LOCAL_KEY = 'feedback-form-state';

form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', onFormSubmit);

let dataForm = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};
const { email, message } = form.elements;
reloadPage();

function onInputData(e) {
  dataForm = { email: email.value, message: message.value };
  localStorage.setItem(LOCAL_KEY, JSON.stringify(dataForm));
}

function reloadPage() {
  if (dataForm) {
    email.value = dataForm.email || '';
    message.value = dataForm.message || '';
  }
}

function onFormSubmit(e) {
    e.preventDefault();
    
    const { email, message } = e.currentTarget.elements;
    if (email.value === '' || message.value === '') {
        alert('Please fill in all the fields!');
        return;
    }
    const data = {
        email: email.value,
        message: message.value,
    }
    console.log(data)

    localStorage.removeItem(LOCAL_KEY);
    e.currentTarget.reset();
    dataForm = {};
}