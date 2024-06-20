const rpsOptions = ['rock', 'paper', 'scissors'];
const rpsResult = document.getElementById('rps-result');

document.getElementById('rock').addEventListener('click', () => playRPS('rock'));
document.getElementById('paper').addEventListener('click', () => playRPS('paper'));
document.getElementById('scissors').addEventListener('click', () => playRPS('scissors'));

function playRPS(userChoice) {
    const computerChoice = rpsOptions[Math.floor(Math.random() * rpsOptions.length)];
    let result;

    if (userChoice === computerChoice) {
        result = "It's a draw!";
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'You win!';
    } else {
        result = 'You lose!';
    }

    rpsResult.innerHTML = `You chose <b>${userChoice}</b>. Computer chose <b>${computerChoice}</b>. <br><b>${result}</b>`;
}
