const isLoggedIn = localStorage.getItem("isLoggedIn") == "true";

const registeredUser = JSON.parse(
  localStorage.getItem("registeredUser") ?? "null"
);

const loggedIn = isLoggedIn && registeredUser.firstName;

if (loggedIn) {
  document.location.replace("./homePage.html");
}
