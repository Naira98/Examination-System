import { compareHashes } from "../utils/hashing.js";
import { showHidePassword } from "../utils/showHidePassword.js";
import { vaildateEmail, validatePassword } from "../utils/validation.js";

const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.querySelector("#password");
const showPassword = document.querySelector("#togglePassword");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const rememberMe = document.getElementById("rememberMe");

// Show/hide password toggle setup
showHidePassword([
  { button: showPassword, icon: showPassword.children[0], input: password },
]);

// Prefill email if remembered
document.addEventListener("DOMContentLoaded", () =>
{
  const rememberedEmail = localStorage.getItem("rememberedEmail");
  if (rememberedEmail)
  {
    email.value = rememberedEmail;
    rememberMe.checked = true;
  }
});

// Form submission
form.addEventListener("submit", (e) =>
{
  e.preventDefault();

  let isDataValid =
    vaildateEmail(email, emailError) &&
    validatePassword(password, passwordError);

  console.log({ isDataValid });

  if (isDataValid)
  {
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (
      email.value == registeredUser.email &&
      compareHashes(password.value, registeredUser.password)
    )
    {
      // Handle Remember Me checkbox
      if (rememberMe.checked)
      {
        localStorage.setItem("rememberedEmail", email.value);
      } else
      {
        localStorage.removeItem("rememberedEmail");
      }

      // Redirect to exam page
      window.location.replace("/src/pages/exam.html");
      return;
    } else
    {
      passwordError.innerText = "Invalid email or password.";
    }
  }
});

//   message.style.color = "green";
//   message.textContent = "Login successful!";

//   // Optional redirect simulation
//   setTimeout(() => {
//     document.body.innerHTML =
//       "<h2 style='text-align:center;'>Welcome to the Exam Dashboard!</h2>";
//   }, 1000);
