let gameIsRunning = false;
let user_choice = ''; //The user's choice
let winnerText = document.getElementById("winner"); //"Winner" textbox
UserScore = 0; //Set the user score to 0
ComputerScore = 0; //Set the computer score to 0
rounds = 0; //Set the round number to 0
roundsLog = []; //Create a new array for the rounds log

const setPlayerChoice = (selection) => { //Set the user's choice
  console.log(`PLAYER CHOICE: ${selection}`) //Logging to console for debug
  user_choice = selection; //Set the user's choice to the selection
  if (selection == "" || selection == null) { //If the user's choice is null or empty, set it to the default
    console.warn("No selection! Setting default selection...") //Logging to console for debug
    playerChoice = DEFAULT_USER_CHOICE; //Set the user's choice to the default
  }
  let temp = document.querySelectorAll("img") //Invert the image for the selected move, but make sure other options cannot
  console.log(temp) //Be highlighted
  for (let i = 0; i < temp.length; i++) { //Loop through all images
    if (temp[i].id == selection) { //If the image's ID is the same as the selection
      temp[i].style.filter = "invert(1)"  //Invert the image
    } else {
      temp[i].style.filter = "invert(0)" //Otherwise, make sure the image is not inverted
    }
  }
};

const getComputerChoice = () => {
  const randomValue = Math.random(); //Generate a random number between 0 and 1
  if (randomValue < 0.34) { //If the number is less than 0.34, return rock
    return ROCK; //Return rock
  } else if (randomValue < 0.67) { //If the number is less than 0.67, return paper
    return PAPER;
  } else {
    return SCISSORS; //Otherwise, return scissors
  }
}

function getWinner(cChoice, pChoice) {
  if (cChoice === pChoice) { //If the computer's choice is the same as the player's choice
    return RESULT_DRAW; 
  } else if (
    (cChoice === ROCK && pChoice === PAPER) || //If the computer's choice is rock and the player's choice is paper
    (cChoice === PAPER && pChoice === SCISSORS) || //If the computer's choice is paper and the player's choice is scissors
    (cChoice === SCISSORS && pChoice === ROCK) //If the computer's choice is scissors and the player's choice is rock
  ) {
    return RESULT_PLAYER_WINS; //The player wins
  } else {
    return RESULT_COMPUTER_WINS; //Otherwise, the computer wins
  }
}

function GameStart() {
  rounds++ //Increase rounds
  let computer_choice = getComputerChoice(); //Get the computers move
  console.log(`COMPUTER CHOICE: ${computer_choice}`) //Logging to console for debug
  temp = document.getElementById(`C${computer_choice.toLowerCase()}-selection`)
  temp.style.filter = "invert(1)" //Invert the image of the computers move

  console.log(`YOUR CHOICE: ${user_choice}`) //More debugging
  let winner = getWinner(computer_choice, user_choice);

  if (winner == RESULT_DRAW) { //If the result is a draw
    winnerText.innerText = "Draw!" //Set the winner text to "Draw!"
    console.log("DRAW!") //Logging to console for debug
  } else if (winner == RESULT_PLAYER_WINS) { //If the player wins
    UserScore++ //Increase the user score
    console.log("YOU WIN!") //Logging to console for debug
    winnerText.innerText = "You Win!" //Set the winner text to "You Win!"
  } else {
    console.log("YOU LOSE!") //Logging to console for debug
    ComputerScore++ //Increase the computer score
    winnerText.innerText = "Computer Wins!" //Set the winner text to "Computer Wins!"
  }
  sleep(1500).then(() => { //Sleep for 1.5 seconds
    ScoreUpdate() //Update the score
  })
  //Lines 77-79 Are all for the game log, and they're logging what time each round was completed.
  let d = new Date(); //New Date
  let time = d.toString() //Convert to a string
  let slicePoint = time.indexOf("G") //Find the index of "G", (Since anyone who plays this will be on GMT)
  time = time.slice(0, slicePoint); //Slice unnecessary text out of the string
  let LOGGER = new Array(`${time} [ROUND ${rounds}] Your selection: ${user_choice.toLowerCase()}, Computer selection: ${computer_choice.toLowerCase()}, result: <span class="highlight">${winner}</span>`)
  roundsLog.push(LOGGER); //Log the above data to the roundsLog list
  PopulateLog(); //Populate the log data on the HTML Page
}

function ScoreUpdate() {
  document.getElementById("computer-score").innerText = ComputerScore //Update the computer score
  document.getElementById("user-score").innerText = UserScore //Update the user score
  document.getElementById("round").innerText = rounds; //Update the round number
  let temp = document.querySelectorAll("img") //Reset the images
  console.log(temp) //To their default state
  for (let i = 0; i < temp.length; i++) { //Loop through all images
    temp[i].style.filter = "invert(0)" //Make sure the image is not inverted
  } //Changing all images back to their original state
  if(ComputerScore>UserScore){
    document.getElementById("computer-score").style.color="green"
  }
  else if(ComputerScore<UserScore){
    document.getElementById("user-score").style.color="green"
  }
  else{
    document.getElementById("computer-score").style.color="white"
    document.getElementById("user-score").style.color="white"
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms)); //Sleep function for smoother setTimeout
}

function PopulateLog() {
  let parent = document.getElementById("rounds-log-data"); //Get the parent element
  while (parent.firstChild) { //While there is a child element
    parent.removeChild(parent.lastChild); //Remove the last child element
  } //Clearing the list before each population, so theres no overlapping/duplicate
  console.log("Populating...") //Entries.
  for (let x = 0; x < roundsLog.length; x++) { //Loop through the roundsLog list
    console.log(`Added index ${x} to HTML Dom!`) //Logging to console for debug
    if(roundsLog[x][0].includes("COMPUTER_WINS")){
      parent.innerHTML += `${roundsLog[x][0].toString().replace("highlight","red")}<br>` //Add the data to the HTML DOM
    }
    else if(roundsLog[x][0].includes("DRAW")){
      parent.innerHTML += `${roundsLog[x][0].toString().replace("highlight","grey")}<br>` //Add the data to the HTML DOM
    }
    else{
    parent.innerHTML += `${roundsLog[x][0]}<br>`} //Add the data to the HTML DOM
  }
}
function RoundManager(){
sleep(1500).then(()=>{
if(rounds==rounds_input_slider.value){
  if(UserScore>ComputerScore){
    winnerText.innerText="You Win! :)"
  }
  else if(ComputerScore>UserScore){
    winnerText.innerText="You Lose :("
  }
  else{
    winnerText.innerText="Tie!"
  }
  UserScore=0
  ComputerScore=0
  rounds=0;
  roundsLog=[];
  PopulateLog();
  ScoreUpdate();}})
}

rounds_input_slider.oninput = function(){
  document.getElementById("rounds-counter").innerText = `Rounds: ${this.value}`
}
