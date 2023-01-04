let gameIsRunning = false;
let user_choice = '';

const setPlayerChoice = (selection) => {
  console.log(`PLAYER CHOICE: ${selection}`)
  user_choice=selection;
  if(selection=="" || selection==null){
    console.warn("No selection! Setting default selection...")
    playerChoice=DEFAULT_USER_CHOICE;
  }
  let temp=document.querySelectorAll("img")
  console.log(temp)
  for(let i=0;i<temp.length;i++){
    if(temp[i].id==selection){
      temp[i].style.filter="invert(1)"}
      else{
        temp[i].style.filter="invert(0)"
      }
  }
};

const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
}

function getWinner(cChoice, pChoice){
if (cChoice === pChoice) {
  return RESULT_DRAW;
} else if (
  (cChoice === ROCK && pChoice === PAPER) ||
  (cChoice === PAPER && pChoice === SCISSORS) ||
  (cChoice === SCISSORS && pChoice === ROCK)
) {
  return RESULT_PLAYER_WINS;
} else {
  return RESULT_COMPUTER_WINS;
}
}

function GameOn(){
  rock_selection.style.filter="invert(0)"
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log('Game is starting...');
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();
  const winner = getWinner(computerChoice, playerChoice);
  let message = `You picked ${playerChoice}, computer picked ${computerChoice}, therefore you `;
  if (winner === RESULT_DRAW) {
    message = message + 'had a draw.';
  } else if (winner === RESULT_PLAYER_WINS) {
    message = message + 'won.';
  } else {
    message = message + 'lost.';
  }
  alert(message);
  gameIsRunning = false;
};

