const nameRegex = /^[a-zA-Z]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateName(name, errorMessage) {
  errorMessage.innerText = "";
  name.classList.remove("inputError");

  if (!nameRegex.test(name.value)) {
    errorMessage.innerText = "Letters only (A-Z or a-z).";
    name.classList.add("inputError");
    return false;
  }
  return true;
}

function vaildateEmail(email, errorMessage) {
  errorMessage.innerText = "";
  email.classList.remove("inputError");

  if (!emailRegex.test(email.value)) {
    errorMessage.innerText = "Email is not valid.";
    email.classList.add("inputError");
    return false;
  }
  return true;
}

function validatePassword(password, errorMessage) {
  errorMessage.innerText = "";
  password.classList.remove("inputError");

  if (password.value.length < 8) {
    errorMessage.innerText = "Password must have at least 8 characters.";
    password.classList.add("inputError");
    return false;
  }
  return true;
}

function validatePasswordsMatch(firstPassword, secondPassword, errorMessage) {
  errorMessage.innerText = "";
  secondPassword.classList.remove("inputError");

  if (firstPassword.value !== secondPassword.value) {
    errorMessage.innerText = "Passwords must match.";
    secondPassword.classList.add("inputError");

    return false;
  }
  return true;
}
