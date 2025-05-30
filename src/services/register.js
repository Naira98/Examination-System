import {
  validateName,
  vaildateEmail,
  validatePassword,
  validatePasswordsMatch,
} from "../utils/validation.js";
import { generateHash } from "../utils/hashing.js";

const form = document.querySelector("form");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

const firstNameError = document.querySelector("#firstNameError");
const lastNameError = document.querySelector("#lastNameError");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const confirmPasswordError = document.querySelector("#confirmPasswordError");

const showPassword = document.querySelector("#togglePassword");
const showConfirmPassword = document.querySelector("#toggleConfirmPassword");

const fields = [
  {
    input: firstName,
    validateFn: () => validateName(firstName, firstNameError),
  },
  {
    input: lastName,
    validateFn: () => validateName(lastName, lastNameError),
  },
  {
    input: email,
    validateFn: () => vaildateEmail(email, emailError),
  },
  {
    input: password,
    validateFn: () => validatePassword(password, passwordError),
  },
  {
    input: confirmPassword,
    validateFn: () =>
      validatePasswordsMatch(password, confirmPassword, confirmPasswordError),
  },
];

for (const { input, validateFn } of fields) {
  input.addEventListener("blur", validateFn);
}

const icons = [
  {
    button: showPassword,
    icon: showPassword.children[0],
    input: password,
  },
  {
    button: showConfirmPassword,
    icon: showConfirmPassword.children[0],
    input: confirmPassword,
  },
];

for (const { button, icon, input } of icons) {
  button.addEventListener("mousedown", (e) => {
    e.preventDefault();
    if (input.getAttribute("type") == "password") {
      input.setAttribute("type", "text");
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      input.setAttribute("type", "password");
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let isDataValid = true;
  for (const { input, validateFn } of fields) {
    isDataValid = isDataValid && validateFn();
  }

  if (isDataValid) {
    const hashedPassword = await generateHash(password.value);

    const user = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: hashedPassword,
    };

    localStorage.setItem("registerUser", user);

    window.location.replace("/src/pages/login.html");
  }
});
