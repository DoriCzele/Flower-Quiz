let questionData = {};
let questionIndex = 0;
let score = 0;

/**
 * Request and display trivia data.
 * @param {string} questionDifficulty The user's selected difficulty level.
 */
async function getQuestions(questionDifficulty) {
	questionData = await requestData(questionDifficulty);
	parseQuestionDetails();
	for (let element of document.querySelectorAll(".answer-button")) element.style.visibility = "visible";
}

/**
 * Make a fetch request for quiz trivia data.
 * @param {string} questionDifficulty The user's selected difficulty level.
 * @returns {object} Quiz trivia data.
 */
async function requestData(questionDifficulty) {
	const url = `https://opentdb.com/api.php?amount=10&category=17&difficulty=${questionDifficulty}&type=multiple`;
	return await fetch(url)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch((error) => {
			console.log(error);
			return null;
		});
}

/**
 * Format and display API data in question and answers.
 */
function parseQuestionDetails() {
	const questionDetail = questionData.results[questionIndex];
	let question = he.decode(questionDetail.question);

	document.getElementById("question-text").innerText = question;

	const answerChoices = Array.from(questionDetail.incorrect_answers);
	answerChoices.push(questionDetail.correct_answer);

	const choiceElements = document.getElementsByClassName("answer-button");
	for (let choiceElement of choiceElements) {
		// Select random answer from answer choices
		const randomAnswer =
			answerChoices[Math.floor(Math.random() * answerChoices.length)];
		choiceElement.innerText = he.decode(randomAnswer);

		const randomAnswerIndex = answerChoices.indexOf(randomAnswer);
		// Remove previously selected answer choice from array
		answerChoices.splice(randomAnswerIndex, 1);
	}
}

/**
 * Display question number that the user is currently on.
 */
function updateQuestionCounterDOM() {
	document.getElementById("question-counter").innerText = `Question ${questionIndex + 1}/10`;
}


/**
 * Check user's submitted answer, track score and prompt for next question/end quiz. 
 */
function submitAnswer(element) {
	if (
		element.innerText == he.decode(questionData.results[questionIndex].correct_answer)
	) {
		score += 1;
	}
	questionIndex += 1;
	if (questionIndex < questionData.results.length) {
		parseQuestionDetails();
		updateQuestionCounterDOM()
	} else {
		showScore();
	}
}

/**
 * Display user's final score.
 */
function showScore() {
	document.getElementById(
		"score-display"
	).innerText = `Your score is ${score}!`;
	alert(`Your score is ${score}`)
}