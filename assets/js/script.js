//wait for the "DOM to finish loading before running the game"
//get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");

});


/**
 * The main game loop, called the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply"){
        displayMultiplyQueation(num1,num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }

}

/**
 * Checks the aswer against the first element in
 * the returnes calculateCorrectAnser array
 */
function checkAnswer(){

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculateCorrectAnser = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculateCorrectAnser[0];

    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awww... you answered ${userAnswer}. The correct answer was ${calculateCorrectAnser[0]}`);
        incrementWrongAnswer();
    }

    runGame(calculateCorrectAnser[1]);

}
/**
 * Gets the operands (the numbers) and operator (plus,minus ect)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer(){

    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === '+') {
        return [operand1 + operand2, "addition"];
    } else if (operator === 'x') {
        return [operand1 * operand2, "multiply"];
    } else if (operator === '-') {
        return [operand1 - operand2, "subtract"]; 
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting`;
    }
}

/**
 * Gets the current score from dom and increments it by 1
 */
function incrementScore(){

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;

}


/**
 * Gets the current incorrect answer from dom and increments it by 1
 */
function incrementWrongAnswer(){

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;

}

function displayAdditionQuestion(operand1, operand2){

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2){

    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand2;
    document.getElementById('operator').textContent = "-";

}

function displayMultiplyQueation(operand1, operand2){

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";

}