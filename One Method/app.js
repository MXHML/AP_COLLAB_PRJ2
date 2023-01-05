let gameIsRunning = false;
let user_choice = '';
let winnerText = document.getElementById("winner");
UserScore=0;
ComputerScore=0;
rounds=0;
roundsLog = [];

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

function GameStart(){
  rounds++
  let computer_choice = getComputerChoice();
  console.log(`COMPUTER CHOICE: ${computer_choice}`)
  temp = document.getElementById(`C${computer_choice.toLowerCase()}-selection`)
  temp.style.filter="invert(1)"

  console.log(`YOUR CHOICE: ${user_choice}`)
  let winner = getWinner(computer_choice, user_choice);

  if(winner==RESULT_DRAW){
    winnerText.innerText="Draw!"
    console.log("DRAW!")}
  else if(winner==RESULT_PLAYER_WINS){
    UserScore++
    console.log("YOU WIN!")
    winnerText.innerText="You Win!"}
  else{
    console.log("YOU LOSE!")
    ComputerScore++
  winnerText.innerText="Computer Wins!"}
    sleep(1500).then(()=>{
      ScoreUpdate()
    })
}

function ScoreUpdate(){
  document.getElementById("computer-score").innerText=ComputerScore
  document.getElementById("user-score").innerText=UserScore
  document.getElementById("round").innerText=rounds;
  let temp=document.querySelectorAll("img")
  console.log(temp)
  for(let i=0;i<temp.length;i++){
    temp[i].style.filter="invert(0)"
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

