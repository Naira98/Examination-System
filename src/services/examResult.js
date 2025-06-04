// Get answers from localStorage
const answers = JSON.parse(localStorage.getItem("answers") || "[]");

// Calculate statistics
const totalQuestions = answers.length;
const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
const incorrectAnswers = totalQuestions - correctAnswers;
const score = Math.round((correctAnswers / totalQuestions) * 100);

if (score == 0) {
  document.getElementById(
    "stars"
  ).innerHTML = `<i class="fas fa-face-sad-tear"></i>
          <p class="text-red-500">Better luck next time!</p>`;
} else if (score > 0 && score <= 20) {
  document.getElementById("stars").innerHTML = `
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
          `;
} else if (score > 20 && score <= 40) {
  document.getElementById("stars").innerHTML = `
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
          `;
} else if (score > 40 && score <= 60) {
  document.getElementById("stars").innerHTML = `
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
          `;
} else if (score > 60 && score <= 80) {
  document.getElementById("stars").innerHTML = `
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
          `;
} else if (score > 80) {
  document.getElementById("stars").innerHTML = `
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          `;
}

// Update score and stats
document.getElementById("score").textContent = `${score}%`;
document.getElementById(
  "stats"
).textContent = `${correctAnswers} Correct · ${incorrectAnswers} Incorrect · ${totalQuestions} Total`;

// Generate question analysis
const analysisContainer = document.getElementById("questionAnalysis");
answers.forEach((answer, index) => {
  const status = answer.isCorrect ? "Correct" : "Incorrect";
  const statusColor = answer.isCorrect ? "green" : "red";

  const questionDiv = document.createElement("div");
  questionDiv.className = `border border-${statusColor}-200 rounded-lg p-4 mb-4 bg-${statusColor}-50`;
  questionDiv.innerHTML = `
                    <p class="font-medium text-gray-700 mb-2">
                        <span class="text-${statusColor}-500 font-bold">${status}</span> – Question ${
    index + 1
  }:
                    </p>
                    <p class="text-gray-800 mb-2">${answer.question}</p>
                    <div class="mb-1">
                        <span class="inline-block px-3 py-1 rounded bg-${
                          answer.isCorrect ? "green" : "red"
                        }-200 text-${
    answer.isCorrect ? "green" : "red"
  }-700 text-sm">
                            Your answer: <strong>${
                              answer.selectedAnswer || "Not answered"
                            }</strong>
                        </span>
                    </div>
                    ${
                      !answer.isCorrect
                        ? `
                    <div>
                        <span class="inline-block px-3 py-1 rounded bg-green-200 text-green-700 text-sm">
                            Correct answer: <strong>${answer.correctAnswer}</strong>
                        </span>
                    </div>`
                        : ""
                    }
                `;
  analysisContainer.appendChild(questionDiv);
});
