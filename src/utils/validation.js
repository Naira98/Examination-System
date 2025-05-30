const nameRegex = /^[a-zA-Z]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateName(name, errorMessage) {
  errorMessage.innerText = "";

  if (!nameRegex.test(name.value)) {
    errorMessage.innerText = "Letters only (A-Z or a-z).";
    return false;
  }
  return true;
}

export function vaildateEmail(email, errorMessage) {
  errorMessage.innerText = "";

  if (!emailRegex.test(email.value)) {
    errorMessage.innerText = "Email is not valid.";
    return false;
  }
  return true;
}

export function validatePassword(password, errorMessage) {
  errorMessage.innerText = "";

  if (password.value.length < 8) {
    errorMessage.innerText = "Password must have at least 8 characters.";
    return false;
  }
  return true;
}

export function validatePasswordsMatch(
  firstPassword,
  secondPassword,
  errorMessage
) {
  errorMessage.innerText = "";

  if (firstPassword.value !== secondPassword.value) {
    errorMessage.innerText =
      "Passwords must match.";
    return false;
  }
  return true;
}
