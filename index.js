/*
 * A BlackJack Game App
    A javascript app that performs the main functionalities of the famous casino game called BlackJack.
    The app generates random numbers ranging from 2 to 11 and adds the generated numbers. If their sum is equal to
    21, we will be getting a blackJack meaning we won the game. If the sum is less than 21, the game continues and
    another random number will generated and the process continues. If the sum is greater than 21. The game is lost
    and it will be over
 */

/**
 * creating an object that contains the player's name and the prize won
 */
let player = {
    name: "Per",
    chips: 145
}

// an array that will contain the randomly generated numbers which are the card numbers 
let cards = []
// creating a variable that contains the sum of the numbers. it is initialized as 0
let sum = 0;

/* a variable that controls the state of the game whether is is won or not and it only contains true of false value.
Since the game is not started and that it is not won, the value is set as false */
let hasBlackJack = false;
/* a variable that checks whether the game is currently playing or not. Since the game is not started yet at this stage,
the variable is assigned a false value */
let isAlive = false;
/* a variable that contains the message that will be displayed to the user. The win and the loss messages*/ 
let message = ""

// calling the html element with an id "message" and assigning it to a variable called "messageTag"
let messageTag = document.getElementById("message");

// calling the html element with an id "sum" and assigning it to a variable called "sumTag"
let sumTag = document.getElementById("sum");

// calling the html element with an id "cards" and assigning it to a variable called "cardsTag"
let cardsTag = document.getElementById("cards")

// calling the html element with an id "player" and assigning it to a variable called "playerTag"
let playerTag = document.getElementById("player")

// displaying the name and chips of the player on the game using the "textContent" property of the tag
playerTag.textContent = player.name + ": $" + player.chips

/* the function helps us to generate a random numbers ranging from 1 to 13. So that the numbers could be added and 
check if the game is won or lost */
function getRandomCard() {
    /* using the Math.random() function to generage random numbers and assign it to the variable "randomNumber"
    the Math.random() only generates numbers from 0 to 0.999, so to get numbers up to 13 and also avoid 0 in the process,
    we multiply it by 13 and add 1 to it. Then to remove the decimal points, we use Math.floor() */
    let randomNumber = (Math.floor(Math.random() * 13) + 1)
    /* Now we check if unneccessary numbers are generated, so that we could change them.
    Since Ace card is counted as 11 in Blackjack game, we have to replace 1 with 11 and if we get
    any numbers above 10, we make it 10, since Jack, Queen and King cards all are counted as 10. 
    But if the generated number is between 2 and 10, it will be just returned as is.*/  
    if(randomNumber == 1) {
        randomNumber = 11;
    } else if(randomNumber > 10) {
        randomeNumber = 10;
    }
    // we return the generated random number.
    return randomNumber;
}

/* this function officially starts the game by generating random numbers and adding the numbers. This function is 
called when the "Start Game" button is clicked */
function startGame(){
    // we call the getRandomCard() function and assign the generated number to the variable firstCard
    let firstCard = getRandomCard();

    // we call the getRandomCard() function and assign the generated number to the variable secondCard
    let secondCard = getRandomCard();

    // adding the variables to an array called cards
    cards = [firstCard, secondCard];
    
    // adding the two numbers to check the status of the game
    sum = firstCard + secondCard
    
    // since the game is started, we change the "isAlive" variable to true
    isAlive = true
    
    // we call render game to check the sum and display a message accordingly
    renderGame()
}

/* this function displays all the messages and checks if the game is over or there is more by changing the boolean variables */
function renderGame() {
  
    // displaying the sum to the html tag using the textContent property of it
    sumTag.textContent = "Sum: " +  sum

    // displaying a title to the html tag using the textContent property of it
    cardsTag.textContent = "Cards: "

    // since there are multiple randomly generated cards stored in the array, we are traversing using loop
    for(i = 0; i < cards.length; i++) {
        //appending each array items to the cards tag
        cardsTag.textContent += cards[i] + " ";
    }
    //if the sum is less than 21, we assign the message variable with a question
    if(sum < 21) {
        message = "Do you want to draw a new card?"
        /* if the sum is equal to 21, we assign the message variable with a win anouncement and change the hasBlackJack variable to true */
    } else if(sum == 21) {
        message = "Wohoo! You've got a Blackjack"
        hasBlackJack = true
        /* if the sum is greater than 21, we assign the message variable with a game over anouncement and change the isAlive variable to false */
    } else {
        message = "You're out of the game"        
        isAlive = false;
    }

    // we display the messages we created above on the page using textContent on messageTag
    messageTag.textContent = message

}

/* this function is triggered when "New Card" button is pressed and it checks
if the game is alive and blackJack is not yet reached, so that it can generate another card number */
function newCard() {
    // checking if isAlive variable is true and hasBlackJac variable is false
    if(isAlive && !hasBlackJack) {
        // if the above condition is true we generate a new number 
        let card = getRandomCard();
        // we add the new number to the cards array
        cards.push(card)
        // we then add that number to the sum to check the blackJack
        sum += card;
        // we call the renderGame() function to print the messages and check if hte game is won or lost
        renderGame();
    }
}