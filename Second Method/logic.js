//VARIABLE DECLARATION 
var rockImg = "pictures/rock.png";
var paperImg = "pictures/paper.png";
var scissorsImg = "pictures/scissors.png";

// Create variables for the choices that the user and the computer can make
var userChoice;
var computerChoice;

//Event handlers 
const btnStart = document.getElementById("btn-start").addEventListener('click',function(){playGame();});


// Create a function to generate the computer's choice
function getComputerChoice() {
  var choice = Math.floor(Math.random() * 3);
  if (choice === 0) {
    return "rock";
  } else if (choice === 1) {
    return "paper";
  } else {
    return "scissors";
  }
}

// Create a function to determine the winner of the game
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "tie";
  } else if (userChoice === "rock") {
    if (computerChoice === "scissors") {
      return "user";
    } else {
      return "computer";
    }
  } else if (userChoice === "paper") {
    if (computerChoice === "rock") {
      return "user";
    } else {
      return "computer";
    }
  } else if (userChoice === "scissors") {
    if (computerChoice === "paper") {
      return "user";
    } else {
      return "computer";
    }
  }
}

// Create a function to display the winner of the game
function displayWinner(winner) {
  if (winner === "tie") {
    console.log("It's a tie!");
  } else if (winner === "user") {
    console.log("You win!");
  } else {
    console.log("The computer wins!");
  }
}

// Create a function to play the game
function playGame() {
  // Get the user's choice
  userChoice = prompt("Do you choose rock, paper, or scissors?");

  // Get the computer's choice
  computerChoice = getComputerChoice();

  // Determine the winner
  var winner = determineWinner(userChoice, computerChoice);

  // Display the winner
  displayWinner(winner);
}

// Play the game
playGame();

