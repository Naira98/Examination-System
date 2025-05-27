const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Process the form data (e.g., log it, send it to a server)
  //   console.log(data);
  //   var formData = new FormData(document.querySelector('form'))
  //   console.log(formData.getAll())

  //   window.location.href = "/src/pages/login.html";
});

console.log("here");

const passIcon = document.querySelector(".password_icon");
const passIn = document.getElementById("password");
const btn = document.getElementById("togglePassword");
btn?.addEventListener("click", function () {
  // if (passIn?.getAttribute('type') == 'password') {
  //     passIcon.src = "/public/hide.png"

  // } else {
  //     passIn?.setAttribute('type', 'password');
  //     passIcon.src = "/public/view.png"

  const type =
    passIn?.getAttribute("type") === "password" ? "text" : "password";
  passIn?.setAttribute("type", type);
});

// const passwordInput = document.getElementById('password');
// const toggleButton = document.getElementById('togglePassword');

// toggleButton?.addEventListener('click', () => {
//   if (passwordInput?.type === 'password') {
//     passwordInput.type = 'text';
//   } else {
//     passwordInput.type = 'password';
//   }
// });