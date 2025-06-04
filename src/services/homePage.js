const actionButtons = document.getElementById("actionButtons");
const logoutBtn = document.getElementById("logout");
const answers = localStorage.getItem("answers");
const registeredUser = localStorage.getItem("registeredUser");

if (registeredUser && answers) {
  // User has completed an exam, show both buttons
  actionButtons.innerHTML = `
                    <a href="../pages/exam.html"
                        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#bcdea5] hover:bg-[#a5c78e] transition">
                        <i class="fa-solid fa-pen-to-square mr-2"></i>
                        Start Exam
                    </a>
                    <a href="../pages/examResult.html"
                        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#6a7282] bg-[#f8faf7] hover:bg-[#e8eae7] transition">
                        <i class="fa-solid fa-chart-line mr-2"></i>
                        View Results
                    </a>
                `;
}
