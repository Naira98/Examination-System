export function shuffleQuestions(questions) {
  let currentIndex = questions.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [questions[currentIndex], questions[randomIndex]] = [
      questions[randomIndex],
      questions[currentIndex],
    ];
  }
  return questions;
}
