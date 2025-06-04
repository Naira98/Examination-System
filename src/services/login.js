const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.querySelector("#password");
const showPassword = document.querySelector("#togglePassword");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const rememberMe = document.getElementById("rememberMe");

showHidePassword([
  { button: showPassword, icon: showPassword.children[0], input: password },
]);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let isDataValid =
    vaildateEmail(email, emailError) &&
    validatePassword(password, passwordError);

  if (isDataValid) {
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (
      email.value == registeredUser.email &&
      (await compareHashes(password.value, registeredUser.password))
    ) {
      if (rememberMe.checked) {
        localStorage.setItem("rememberMe", true);
      } else {
        localStorage.removeItem("rememberMe");
      }
      localStorage.setItem("isLoggedIn", true);

      window.location.replace("homePage.html");
    } else {
      passwordError.innerText = "Invalid email or password.";
    }
  }
});
