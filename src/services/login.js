document.addEventListener("DOMContentLoaded", () =>
{
    const form = document.getElementById("loginForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", (e) =>
    {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        // Simulated saved user (from registration)
        const isRegistered = localStorage.getItem("registered") === "true";
        const savedEmail = localStorage.getItem("email");
        const savedPassword = localStorage.getItem("password");

        if (!isRegistered)
        {
            message.innerHTML = `You are not registered. <br>
               <a href="../../index.html">Go to Registration Page</a>`;

            return;
        }

        if (email !== savedEmail || password !== savedPassword)
        {
            message.textContent = "Invalid email or password.";
            return;
        }

        message.style.color = "green";
        message.textContent = "Login successful!";

        // Optional redirect simulation
        setTimeout(() =>
        {
            document.body.innerHTML = "<h2 style='text-align:center;'>Welcome to the Exam Dashboard!</h2>";
        }, 1000);
    });
});
