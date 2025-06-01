import { compareHashes } from "../utils/hashing.js";
import { showHidePassword } from "../utils/showHidePassword.js";
import { vaildateEmail, validatePassword } from "../utils/validation.js";

// DOM Elements
const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const showPassword = document.getElementById("togglePassword");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const rememberMe = document.getElementById("rememberMe");

// 👁️ Toggle password visibility
showHidePassword([
  { button: showPassword, icon: showPassword.children[0], input: password },
]);

// 💾 Prefill email if "Remember Me" was previously checked
document.addEventListener("DOMContentLoaded", () =>
{
  const rememberedEmail = localStorage.getItem("rememberedEmail");
  if (rememberedEmail)
  {
    email.value = rememberedEmail;
    rememberMe.checked = true;
  }
});

// ✅ Handle form submission
form.addEventListener("submit", (e) =>
{
  e.preventDefault();

  // Reset previous error messages
  emailError.textContent = "";
  passwordError.textContent = "";

  // Validate input
  const isDataValid =
    vaildateEmail(email, emailError) &&
    validatePassword(password, passwordError);

  if (!isDataValid) return;

  // 🔍 Retrieve user from localStorage
  const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

  if (!registeredUser)
  {
    passwordError.textContent = "No user registered. Please register first.";
    return;
  }

  const isEmailMatch = email.value === registeredUser.email;
  const isPasswordMatch = compareHashes(password.value, registeredUser.password);

  if (isEmailMatch && isPasswordMatch)
  {
    // 💾 Save remembered email if checkbox checked
    if (rememberMe.checked)
    {
      localStorage.setItem("rememberedEmail", email.value);
    } else
    {
      localStorage.removeItem("rememberedEmail");
    }

    // ✅ Redirect to exam page
    window.location.replace("/src/pages/exam.html");
  } else
  {
    passwordError.textContent = "Invalid email or password.";
  }
});


// import { compareHashes } from "../utils/hashing.js";
// import { showHidePassword } from "../utils/showHidePassword.js";
// import { vaildateEmail, validatePassword } from "../utils/validation.js";

// const form = document.querySelector("form");
// const email = document.getElementById("email");
// const password = document.querySelector("#password");
// const showPassword = document.querySelector("#togglePassword");
// const emailError = document.querySelector("#emailError");
// const passwordError = document.querySelector("#passwordError");
// const rememberMe = document.getElementById("rememberMe");

// // Show/hide password toggle setup
// showHidePassword([
//   { button: showPassword, icon: showPassword.children[0], input: password },
// ]);

// // Prefill email if remembered
// document.addEventListener("DOMContentLoaded", () =>
// {
//   const rememberedEmail = localStorage.getItem("rememberedEmail");
//   if (rememberedEmail)
//   {
//     email.value = rememberedEmail;
//     rememberMe.checked = true;
//   }
// });

// // Form submission
// form.addEventListener("submit", (e) =>
// {
//   e.preventDefault();

//   let isDataValid =
//     vaildateEmail(email, emailError) &&
//     validatePassword(password, passwordError);

//   console.log({ isDataValid });

//   if (isDataValid)
//   {
//     const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

//     if (
//       email.value == registeredUser.email &&
//       compareHashes(password.value, registeredUser.password)
//     )
//     {
//       // Handle Remember Me checkbox
//       if (rememberMe.checked)
//       {
//         localStorage.setItem("rememberedEmail", email.value);
//       } else
//       {
//         localStorage.removeItem("rememberedEmail");
//       }

//       // Redirect to exam page
//       window.location.replace("/src/pages/exam.html");
//       return;
//     } else
//     {
//       passwordError.innerText = "Invalid email or password.";
//     }
//   }
// });

//   message.style.color = "green";
//   message.textContent = "Login successful!";

//   // Optional redirect simulation
//   setTimeout(() => {
//     document.body.innerHTML =
//       "<h2 style='text-align:center;'>Welcome to the Exam Dashboard!</h2>";
//   }, 1000);
