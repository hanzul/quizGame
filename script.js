const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const answerButton = document.querySelectorAll(".btn-answer");
// mine
const hideText = document.getElementById("textOff");

let shuffledQuestions, currentQuestionIndex;

const timer = 59;

let score = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function attachListenersToAnswerButton() {
  answerButtonsElement.addEventListener("click", verifyAnswer, false);
}

function startGame() {
  startButton.classList.add("hide");
  const textBlock = document.getElementsByClassName("textShow")[0];

  startTimer(timer);

  textBlock.classList.add("textHide");
  textBlock.classList.remove("textShow");

  // shuffledQuestions = questions.sort(() => Math.random() - .5)
  shuffledQuestions = questions;
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");

  // invoking function below to make sure
  // listeners are in place
  attachListenersToAnswerButton();

  setNextQuestion();
}

function startTimer(timer) {
  const intervals = setInterval(function () {
    //console.log(timer);
    document.getElementById("time").textContent = timer;
    if (timer < 1) {
      gameover();
      clearInterval(intervals);
    }
    timer = timer - 1;
  }, 1000);
}

function verifyAnswer(event) {
  const { target } = event;
  if (target.className.includes("correct")) {
    hightlightCorrectFooter();
    score += 10;
    return;
  }

  score -= 10;
  hightlightWrongFooter();
}

function hightlightCorrectFooter() {
  const correctElem = document.getElementsByClassName(
    "hightlight-correct-answer"
  )[0];
  correctElem.classList.add("show");

  const wrongElem = document.getElementsByClassName(
    "hightlight-wrong-answer"
  )[0];
  wrongElem.classList.add("hide");
}

function hightlightWrongFooter() {
  const correctElem = document.getElementsByClassName(
    "hightlight-correct-answer"
  )[0];
  correctElem.classList.remove("show");

  const wrongElem = document.getElementsByClassName(
    "hightlight-wrong-answer"
  )[0];
  wrongElem.classList.add("show");
}

function hideFooter() {
  const correctElem = document.getElementsByClassName(
    "hightlight-correct-answer"
  )[0];
  const wrongElem = document.getElementsByClassName(
    "hightlight-wrong-answer"
  )[0];

  correctElem.classList.add("hide");
  wrongElem.classList.add("hide");
  correctElem.classList.remove("show");
  wrongElem.classList.remove("show");
}

function setNextQuestion() {
  hideFooter();
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  hideFooter()
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function gameover() {
  document.getElementById("end-screen").setAttribute("class", "");
}

const questions = [
  {
    question: "Commonly used data types DO Not include:",
    answers: [
      { text: "1.strings", correct: true },
      { text: "2.booleans", correct: false },
      { text: "3.alerts", correct: false },
      { text: "4.numbers", correct: false },
    ],
  },
  {
    question: "The condition in an if / else statement is enclosed with______?",
    answers: [
      { text: "1.quotes", correct: true },
      { text: "2.curly brackets", correct: false },
      { text: "3.parenthesis", correct: false },
      { text: "4.square brackets", correct: false },
    ],
  },
  {
    question: "Arrays in JavaScript can be used to store______?",
    answers: [
      { text: "1.numbers and strings", correct: true },
      { text: "2.other arrays", correct: false },
      { text: "3.booleams", correct: false },
      { text: "4.all of the above", correct: false },
    ],
  },
  {
    question:
      "String values must be enclosed with in ______ when being assigned to variables.",
    answers: [
      { text: "1.commas", correct: true },
      { text: "2.curly brackets", correct: false },
      { text: "3.quotes", correct: false },
      { text: "4.parenthesis", correct: false },
    ],
  },
];

