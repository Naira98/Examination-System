const logout = document.querySelector("#logoutBtn");

logout.addEventListener("click", () => {
  console.log('logout')
  localStorage.clear();
  window.location.replace("register.html")
});
