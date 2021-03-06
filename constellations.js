initGame();

function initGame() {
    //TODO category choosing

    //TODO play again
    //TODO refresh button

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
let timerStarted = false;
let sec = 0;



function getCards() {
    return constellations = ["aquarius.png", "aries.png", "cancer.png", "capricornus.png", "leo.png", "libra.png", "pair_aquarius.png", "pair_aries.png", "pair_cancer.png", "pair_capricornus.png", "pair_leo.png", "pair_libra.png", "pair_pisces.png", "pair_sagittarius.png", "pair_scorpius.png", "pisces.png", "sagittarius.png", "scorpius.png"]
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
            cardDiv.className = 'memory-card-constellations';
            board.appendChild(cardDiv);
            clickCard(i)
        })
    }
}

function counterBoarding(){
    let board = document.getElementById('counter')
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
    card.addEventListener('click', startTimer);
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
        else if(cardNumber === visibleCardNumber){ checkingTwoClicksInOneCard(cardNumber) }
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
    // if(pairCards === 0){ $('.board').html('<h1>Congratulations! <br> You win! <br> Done in ' + turnCounter + ' turns<h1>'); clearInterval(timer) }
    if(pairCards === 0){ winScreen() }
    // usuwanie blokady
    lockCards = false;
}

// przewracanie kart
function restoreCards(actualCardNumber, visibleCardNumber){
    $('#card' + actualCardNumber).css('background-image', 'url(images/background_4.png)');
    $('#card' + visibleCardNumber).css('background-image', 'url(images/background_4.png)');
    // usuwanie blokady
    lockCards = false;
}

function checkingTwoClicksInOneCard(cardNumber){
    $('#card' + cardNumber).css('background-image', 'url(images/bbackground_4.png)');
    firstVisibleCard = false;
    lockCards = false;
    turnCounter ++;
    $('.score').html('Turn counter: ' + turnCounter);
}

function pad ( val ) { return val > 9 ? val : "0" + val; }
function startTimer(){
    if (!timerStarted){
        timer = setInterval( function(){
            document.getElementById("seconds").innerHTML=pad(++sec%60);
            document.getElementById("minutes").innerHTML="Time: " + pad(parseInt(sec/60,10)) + ":";
        }, 1000);
            timerStarted = true
    }
}

function winScreen() {
    clearInterval(timer);
    $('.board').html('<h1>Congratulations! <br> You won! <br> Done in ' + turnCounter + ' turns<h1>');
    $('.board').addClass('animation')
    $('.board').removeClass('board')
}