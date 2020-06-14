const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Commonly used data types DO Not include:',
    answers: [
      { text: '1.strings', correct: true },
      { text: '2.booleans', correct: false },
      { text: '3.alerts', correct: false },
      { text: '4.numbers', correct: false }
    ]
  },
  {
    question: 'The condition in an if / else statement is enclosed with______?',
    answers: [
      { text: '1.quotes', correct: true },
      { text: '2.curly brackets', correct: false },
      { text: '3.parenthesis', correct: true },
      { text: '4.square brackets', correct: true }
    ]
  },
  {
    question: 'Arrays in JavaScript can be used to store______?',
    answers: [
      { text: '1.numbers and strings', correct: false },
      { text: '2.other arrays', correct: true },
      { text: '3.booleams', correct: false },
      { text: '4.all of the above', correct: false }
    ]
  },
  {
    question: 'String values must be enclosed with in ______ when being assigned to variables.',
    answers: [
      { text: '1.commas', correct: false },
      { text: '2.curly brackets', correct: true },
      { text: '3.quotes', correct: false },
      { text: '4.parenthesis', correct: false }
    ]
  }
]