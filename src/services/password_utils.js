const algorithm = "SHA-256";

async function generateHash(data) {
  const encodedData = new TextEncoder().encode(data);
  const hashBuffer = await crypto.subtle.digest(algorithm, encodedData);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

async function compareHashes(data, hashToCompare) {
  const generatedHash = await generateHash(data, algorithm);
  return generatedHash === hashToCompare;
}


function showHidePassword(icons) {
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
