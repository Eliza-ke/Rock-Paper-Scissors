const movement = {
    'rock': "✊",
    'paper': "✋",
    'scissors': "✌️"
}
let score =  JSON.parse(localStorage.getItem('score')) || {              
        wins: 0,
        loses: 0,
        ties: 0,
};

updateScoreElement();

function computerRPS(){
    const randomNumber = Math.random();

    let action = "";
    if (randomNumber >= 0 && randomNumber < 1/3) {
        action = "rock"
    }else if (randomNumber >= 1/3 && randomNumber < 2/3){
        action = "paper"
    }else if (randomNumber >= 2/3 && randomNumber < 1){
        action = "scissors"
    }
    return action;
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playgame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playgame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playgame('scissors');
});

// keyboard key
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r'){
        playgame('rock');
    } else if (event.key === 'p'){
        playgame('paper');
    } else if (event.key === 's'){
        playgame('scissors');
    } else if (event.key === 'a'){
        autoPlay();
    } else if (event.key === 'Backspace'){
        resetValues();
    }
});


function playgame(playerMove){
    let result = "";
    computerMove = computerRPS();

    if (playerMove === 'rock'){
        if (computerMove === 'rock'){
            result = "Tie"
        }
        else if (computerMove === 'paper'){
            result = "You lose"
        }
        else if (computerMove === 'scissors'){
            result = "You win"

        }
    }

    if (playerMove === 'paper'){
        if (computerMove === 'rock'){
            result = "You win"
        }
        else if (computerMove === 'paper'){
            result = "Tie"
        }
        else if (computerMove === 'scissors'){
            result = "You lose"
        }
    }

    if (playerMove === 'scissors'){
        if (computerMove === 'rock'){
            result = "You lose"
        }
        else if (computerMove === 'paper'){
            result = "You win"
        }
        else if (computerMove === 'scissors'){
            result = "Tie"
        }
    }

    if (result === 'You win') {
        score.wins += 1;
    } else if (result === 'You lose'){
        score.loses += 1;
    }else if (result === 'Tie') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = `${result}`;

    
    document.querySelector('.js-moves').innerHTML = `You ${movement[playerMove]} - ${movement[computerMove]} Computer`;

}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties} `;
}

// auto play
let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-autoplay-button').addEventListener('click', () => {
    autoPlay()
});


function autoPlay(){

    if(!isAutoPlaying){

        intervalId = setInterval(() => {
            const playerMove = computerRPS();
            playgame(playerMove);
            document.querySelector('.auto-play-button').innerHTML = "Stop playing";
        }, 900);
        isAutoPlaying = true;
        document.querySelector('.auto-play-button').innerHTML = "loading...";
    }else{
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.auto-play-button').innerHTML = "Auto Play";
    }
}


// reset scores
document.querySelector('.js-resetscore-button').addEventListener('click', () => {
    const message = `
    <p class="message">Are you sure you want to reset the score <button class="js-yes-button">Yes</button><button class="js-no-button">No</button> 
    </p> `;

    document.querySelector('.js-show-message').innerHTML = message;

    document.querySelector('.js-yes-button').addEventListener('click', () => {
        resetValues();
        document.querySelector('.js-show-message').innerHTML = "";
    });

    document.querySelector('.js-no-button').addEventListener('click', () => {
        document.querySelector('.js-show-message').innerHTML = "";
    });
});



function resetValues(){
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}
