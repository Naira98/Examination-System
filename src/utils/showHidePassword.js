export function showHidePassword(icons) {
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
}
