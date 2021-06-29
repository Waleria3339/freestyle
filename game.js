initGame();

function initGame() {
    //TODO type of cards (countries, food, programming) AND category choosing

    //TODO two click in one card = should nothing happened
    //TODO timer

    //TODO play again
    //TODO refresh button
    //TODO Win-screen

    let cardsList = getCards();
    cards = shuffleCards(cardsList)
    cardsBoarding();
    counterBoarding();

}
// Nie mogę wstawić firstVisibleCard i turnCounter w funkcję, bo wtedy nie działa...
let firstVisibleCard = false;
let turnCounter = 0;
let visibleCardNumber = 0;
let lockCards = false;
let pairCards = cards.length / 2;


function getCards(){
    return ["australia.png", "brazil.png", "britain.png", "china.png", "france.png", "germany.png", "italy.png", "peru.png", "usa.png", "pair_australia.png", "pair_brazil.png", "pair_britain.png", "pair_china.png", "pair_france.png",  "pair_germany.png", "pair_italy.png", "pair_peru.png", "pair_usa.png"]
}

function shuffleCards(cardsList){
    return cardsList.sort(() => Math.random() - 0.5)
}

function cardsBoarding(){
    let board = document.getElementById('section');
    for (let i = 0; i < cards.length; i++) {
        // console.log(cards[i])
        document.addEventListener('DOMContentLoaded', function () {
            let cardDiv = document.createElement('div');
            cardDiv.id = "card" + i;
            cardDiv.className = 'memory-card';
            board.appendChild(cardDiv);
            clickCard(i)
        })
    }
}

function counterBoarding(){
    let board = document.getElementById('section')
    document.addEventListener('DOMContentLoaded', function (){
        let counterDiv = document.createElement('div');
        counterDiv.className = 'score';
        counterDiv.innerText = 'Turn counter: 0'
        board.appendChild(counterDiv)
    })
}

function clickCard(cardNumber){
    let card = document.getElementById('card' + cardNumber)
    card.addEventListener('click', function () { revealCard(cardNumber) })
}

function revealCard(cardNumber){
    // opacityValue domyślnie jest 1, po zniknęciu 0
    let opacityValue = $('#card' + cardNumber).css('opacity')
    let image = "url(images/" + cards[cardNumber] + ")";
    if (opacityValue != 0 && lockCards === false){
        lockCards = true;
        // Odtwarzanie karty
        $('#card' + cardNumber).css('background-image', image);
        // first card
        if (firstVisibleCard === false) { checkFirstCard(cardNumber) }
        // second card
        else if(cardNumber == visibleCardNumber){ checkingTwoClicksInOneCard(cardNumber) }
        else { if(cardNumber != visibleCardNumber){ checkSecondCard(cardNumber) }}
    }
}

function checkFirstCard(cardNumber){
    firstVisibleCard = true;
    visibleCardNumber = cardNumber;
    lockCards = false;
}

function checkSecondCard(cardNumber){
    if (cards[visibleCardNumber] === cards[cardNumber].split('_')[1] ||
        cards[cardNumber] === cards[visibleCardNumber].split('_')[1]) {
        setTimeout(function () { hideCards(cardNumber, visibleCardNumber) }, 750);
    } else {
        setTimeout(function () { restoreCards(cardNumber, visibleCardNumber) }, 1000);
    }
    turnCounter ++;
    $('.score').html('Turn counter: ' + turnCounter);
    firstVisibleCard = false;
}

// usuwanie kart
function hideCards(actualCardNumber, visibleCardNumber){
    // widoczność obu kart na bordzie zmniejszamy do zera
    $('#card' + actualCardNumber).css('opacity', 0);
    $('#card' + visibleCardNumber).css('opacity', 0);
    // zmniejszamy ilość nieodkrytych kart o 1
    pairCards--;
    // sprawdzanie wygranej
    if(pairCards === 0){ $('.board').html('<h1>Congratulations! <br> You win! <br> Done in ' + turnCounter + ' turns<h1>') }
    // usuwanie blokady
    lockCards = false;
}

// przewracanie kart
function restoreCards(actualCardNumber, visibleCardNumber){
    $('#card' + actualCardNumber).css('background-image', 'url(images/background.png)');
    $('#card' + visibleCardNumber).css('background-image', 'url(images/background.png)');
    // usuwanie blokady
    lockCards = false;
}

function checkingTwoClicksInOneCard(cardNumber){
    $('#card' + cardNumber).css('background-image', 'url(images/background.png)');
    firstVisibleCard = false;
    lockCards = false;
    turnCounter ++;
    $('.score').html('Turn counter: ' + turnCounter);
}
