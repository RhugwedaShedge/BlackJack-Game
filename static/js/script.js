
// Challenge 1: Age in Days

function ageInDays() {
    var birthYear = prompt("Enter your Birthyear");
    var ageInDayss = 2021 - birthYear;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are age is '+ ageInDayss + ' years')
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer)
    document.getElementById('flex-box-result').appendChild(h1)
}

function reset() {
    document.getElementById('ageInDays').remove()
}

// Challenge 4

var all_buttons = document.getElementsByTagName('button');
console.log(all_buttons)

let copyallbuttons = []
for(let i = 0; i < all_buttons.length; i++) {
    copyallbuttons[i] = all_buttons[i].classList[1]; // 2nd class of all buttons 
}

console.log(all_buttons[1].classList) // List of classes on that button
// copyallbuttons[1].classList.remove('btn-danger')
// copyallbuttons[1].classList.add('btn-success')

function buttonColorChange(buttonThingy) {
    console.log(buttonThingy.value);
    if (buttonThingy.value == 'red') {
        buttonsRed()
    }
    else if (buttonThingy.value == 'green') {
        buttonsGreen()
    }
    else if (buttonThingy.value == 'random') {
        buttonsRandom()
    }
    else if (buttonThingy.value == 'reset') {
        buttonsReset()
    }
}

function buttonsRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger')
    }
}

function buttonsGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success')
    }
}

function buttonsRandom() {
    var choices = ['btn-danger', 'btn-success', 'btn-warning', 'btn-primary']
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[Math.floor(Math.random() * 5)])
        // Math.random() * 5 - Random numbers from 0-5
        // Math.floor(Math.random() * 5 - floor of random numbers from 0-5
    }
}

function buttonsReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyallbuttons[i])
    }
}


// Black Jack 

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit) // The querySelector() method returns the first element that matches a specified CSS selector(s) in the document.
//whenever the mentioned id is hit, listen to the event click and run the function blackjackHit

// When we click stand button, function dealerLogic should run
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic)

// When we click deal button, function blackjackDeal should run
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal)


let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score':0},
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': {'2': 2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':10, 'A':[1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false, // Stand button is not pressed
    'turnsOver': false, // Turns are not over, set to true when turn of both the players is over
    'isHit': false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');
const drawSound = new Audio('static/sounds/draw.wav');

function blackjackHit() {

    blackjackGame['isHit'] = true; // Hit button pressed
    // Can press hit only when stand button is not pressed
    if (blackjackGame['isStand'] == false) {
        randomCardImage = randomCard()
        showCard(randomCardImage, YOU) // Display a card
        updateScore(randomCardImage, YOU)
        console.log(YOU['score'])
        showScore(YOU);
    }
}

function randomCard() {
    // Selecting random image name from the above list
    let randomCardImage = blackjackGame["cards"][Math.floor(Math.random() * 13)] // Math function selects random numbers from 0 to 13
    // console.log(randomImage)

    return randomCardImage
}

// activePlayer - You or dealer
function showCard(randomImage, activePlayer) {

    // If score becomes greater than 21 stop showing the card
    if(activePlayer['score'] <= 21) {

        // Create image element
        let cardImage = document.createElement('img')

        cardImage.src = `static/images/${randomImage}.png`; // This makes it a variable, `` and $
        
        // Put image in right place
        document.querySelector(activePlayer['div']).appendChild(cardImage)
        hitSound.play(); // Everytime we press hit button sound plays

    }
}


function blackjackDeal() {

    // Activate the button only when both the turns are over
    if (blackjackGame['turnsOver'] == true) {

        // Deactivate the stand button as the game will restart now
        blackjackGame['isStand'] = false;

        // query selector your box and then query selector all the images of your box
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        console.log(yourImages)

        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        console.log(dealerImages)

        // Remove all the images from you-box and dealer-box
        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        // Deal should also reset the score
        YOU['score'] = 0
        DEALER['score'] = 0

        // Display the score of YOU
        document.querySelector(YOU['scoreSpan']).textContent = 0
        document.querySelector(YOU['scoreSpan']).style.color = 'white'

        // Display the score of dealer
        document.querySelector(DEALER['scoreSpan']).textContent = 0
        document.querySelector(DEALER['scoreSpan']).style.color = 'white'

        document.querySelector('#blackjack-result').textContent = "Let's play"
        document.querySelector('#blackjack-result').style.color = 'black'

        blackjackGame['turnsOver'] = false;
        blackjackGame['isHit'] = false;
    }
}

function updateScore(card, activePlayer) {
    // This 'score' is from blackjackGame

    // If adding 11 keeps me below 21, add 11. Otherwise, add 1
    if (card == 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1]
        }
        else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0]
        }
    }
    else {
        activePlayer['score'] += blackjackGame['cardsMap'][card]; 
    }

}

function showScore(activePlayer) {

    if(activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// Make it a asynchronous function
async function dealerLogic() {

    // If once the stand button is pressed, should not be pressed again
    if (blackjackGame['isStand'] == false) {

        // Stand button should not run if hit is not pressed
        if (blackjackGame['isHit'] == true) {

            blackjackGame['isStand'] = true;

            while (DEALER['score'] < 16 && blackjackGame['isStand'] == true) {

                let card = randomCard()
                showCard(card, DEALER)
                updateScore(card, DEALER)
                showScore(DEALER)
                await sleep(1000);
            }
            
            if (DEALER['score'] > 15 && blackjackGame['turnsOver'] == false) {
                // All the turns are over, no one can play now
                blackjackGame['turnsOver'] = true;
                let winner = computeWinner();
                showResult(winner);
            }
        }
    }
}

// Compute winner and update the wins, losses, draws
function computeWinner() {
    let winner = null;

    // You are not bust
    if (YOU['score'] <= 21) {
        
        // Your score is greater than dealer or dealer has busted
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            winner = YOU;
            blackjackGame['wins']++;
            document.querySelector('#wins').textContent = blackjackGame['wins']
            console.log("You win!")
        } 
        
        // Dealer is not bust and your score is less than dealer
        else if (YOU['score'] < DEALER['score']) {
            winner = DEALER;
            blackjackGame['losses']++;
            document.querySelector('#lose').textContent = blackjackGame['losses']
            console.log("You lose!");
        }

        // Tie
        else if (YOU['score'] == DEALER['score']){
            blackjackGame['draws']++;
            document.querySelector('#draws').textContent = blackjackGame['draws']
            console.log("You drew!")
        }

    }
    // Your bust and dealer is not bust
    else if (DEALER['score'] <= 21) {
        winner = DEALER;
        blackjackGame['losses']++;
        document.querySelector('#lose').textContent = blackjackGame['losses']
    }
    // Both are busted
    else if (DEALER['score'] > 21) {
        blackjackGame['draws']++;
        document.querySelector('#draws').textContent = blackjackGame['draws']
        console.log("You drew");
    }

    console.log("Winner is: ", winner)

    return winner;
}

function showResult(winner) {
    let message, messageColor;

    // Show the result only if the turns are over
    if (blackjackGame['turnsOver'] == true) {

        if (winner == YOU) {
            message = "You won!"
            messageColor = 'green'
            winSound.play();
        }
        else if (winner == DEALER) {
            message = "You lost!"
            messageColor = 'red'
            lossSound.play();
        }
        else {
            message = "You drew!"
            messageColor = 'blue'
            drawSound.play();
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}



