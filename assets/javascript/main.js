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

