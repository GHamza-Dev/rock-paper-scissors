/*
 *
 * DOM Elements: 
 *
 */

const score = document.querySelector('.scr'); // score 
const choose = document.querySelector('.choose'); // Section : choose
const result = document.querySelector('.result'); // Section  : Display result

const choices = document.querySelectorAll('.choice'); // Choices
const rulesBtn = document.getElementById('rules'); // Rules button
const closeBtn = document.getElementById('close'); // Close button


const humanOutput = document.querySelector('.human_choice');
const compOutput = document.querySelector('.comp_choice');

const humanImg = humanOutput.querySelector('img');
const compImg = compOutput.querySelector('img');

const rText = document.querySelector('.result_text p'); // Display text : YOU LOSE, WIN or Draw

//console.log(humanOutput.firstElementChild);





/*
 *
 * Class
 *
 */
class Original {
    constructor(score) {
        this.score = score;
    }

    // Get the human choice
    getHuman(e) {
        const ch = e.target.classList;
        let class_ = '';
        if (ch.contains('paper')) {
            class_ = 'paper';
        } else if (ch.contains('scissors')) {
            class_ = 'scissors';
        } else if (ch.contains('rock')) {
            class_ = 'rock';
        } else {
            return 0;
        }
        return class_;
    }

    // Generate computer choice
    getHouse() {
        const classes = ['paper', 'scissors', 'rock']
        const rand = Math.floor(Math.random() * 3);
        return classes[rand];
    }

    // Winner
    winner(humanCh, compCh) {
        if (compCh === humanCh) {
            return 0;
        } else {
            if ((compCh === 'paper' && humanCh === 'scissors') || (compCh === 'scissors' && humanCh === 'rock') || (compCh === 'rock' && humanCh === 'paper')) {
                this.score++;
                return 1;

            } else {
                this.score--;
                return -1;
            }
        }
    }

    // UI handling
    ui(humanCh, compCh) {
        const win = this.winner(humanCh, compCh);
        let path = './images/icon-';
        if (win === 0) {
            rText.textContent = "Draw";
        } else if (win === 1) {
            rText.textContent = "You Win";
        } else {
            rText.textContent = "You lose";
        }
        score.textContent = this.score;
        humanImg.src = `${path}${humanCh}.svg`;
        compImg.src = `${path}${compCh}.svg`;
        humanOutput.firstElementChild.classList.add(humanCh);
        compOutput.firstElementChild.classList.add(compCh);
    }

    // Play again
    playAgain() {
        result.style.display = 'none';
        choose.style.display = 'flex';
        humanOutput.firstElementChild.classList.remove('paper');
        compOutput.firstElementChild.classList.remove('paper');
        humanOutput.firstElementChild.classList.remove('scissors');
        compOutput.firstElementChild.classList.remove('scissors');
        humanOutput.firstElementChild.classList.remove('rock');
        compOutput.firstElementChild.classList.remove('rock');
    }

    // Init
    init(e) {
        const humanCh = this.getHuman(e);
        const compCh = this.getHouse();
        if (humanCh != 0) {
            this.ui(humanCh, compCh);
            result.style.display = 'flex';
            choose.style.display = 'none';
        }
    }
}



// Eventes Listeners

// Init game
const game = new Original(0);
window.addEventListener('click', (e) => {
    game.init(e);
});
// Play again
document.getElementById('play_again').addEventListener('click', game.playAgain);


// Handle Rules Modal
// Show Modal
document.getElementById('rules').addEventListener('click', () => {
    document.querySelector('.rules_modal').style.display = 'flex';
});
// Hide Modal
document.getElementById('close').addEventListener('click', () => {
    document.querySelector('.rules_modal').style.display = 'none';
});

var rulesModal = document.querySelector('.rules_modal');