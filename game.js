initGame();

function initGame() {
    //TODO shuffle cards
    //TODO countries cards
    //TODO type of cards (countries, actors..)
    //TODO two click in one card = should nothing happened
    //TODO play again
    //TODO refresh button
    cards = getCards();
    cardsBoarding();
    counterBoarding();

}
// Nie mogę wstawić firstVisibleCard i turnCounter w funkcję, bo wtedy nie działa...
let firstVisibleCard = false;
let turnCounter = 0;
let visibleCardNumber = 0;
let lockCards = false;
let pairCards = 6;


function getCards(){
    return ["butterfly.png", "butterflyEggs.png", "caterpillar.png", "frog.png", "frogEggs.png", "tadpole.png", "butterfly.png", "butterflyEggs.png", "caterpillar.png", "frog.png", "frogEggs.png", "tadpole.png"]
}

function cardsBoarding(){
    let board = document.getElementById('board_id');
    for (let i = 0; i < cards.length; i++) {
        // console.log(cards[i])
        document.addEventListener('DOMContentLoaded', function () {
            let cardDiv = document.createElement('div');
            cardDiv.id = "card" + i;
            cardDiv.className = 'card';
            board.appendChild(cardDiv);
            clickCard(i)
        })
    }
}

function counterBoarding(){
    let board = document.getElementById('board_id')
    document.addEventListener('DOMContentLoaded', function (){
        let counterDiv = document.createElement('div');
        counterDiv.className = 'score';
        counterDiv.innerText = 'Turn counter: 0'
        board.appendChild(counterDiv)
    })
}

function clickCard(cardNumber){
    let card = document.getElementById('card' + cardNumber)
    card.addEventListener('click', function () {
        revealCard(cardNumber)
    })
}

function revealCard(cardNumber){

    // opacityValue domyślnie jest 1, po zniknęciu 0
    let opacityValue = $('#card' + cardNumber).css('opacity')
    let image = "url(images/" + cards[cardNumber] + ")";
    // alert('Opacity: '+opacityValue)

    if (opacityValue != 0 && lockCards === false){

        lockCards = true;

        // Odtwarzanie karty
        // '#card': szukaj po ID pod nazwą "card"
        $('#card' + cardNumber).css('background-image', image);
        $('#card' + cardNumber).addClass('cardActive');
        $('#card' + cardNumber).removeClass('card');

        if (firstVisibleCard === false) {
            // first card
            firstVisibleCard = true;
            visibleCardNumber = cardNumber;
            lockCards = false;

        } else {
            // second card

            if (cards[cardNumber] === cards[visibleCardNumber]){
                // alert('para')
                // ustawienie tajmera na 750 mls wywołania funkcji "hideCards"
                setTimeout(function () { hideCards(cardNumber, visibleCardNumber) }, 750);

            } else {
                // alert('nie para')
                setTimeout(function () { restoreCards(cardNumber, visibleCardNumber) }, 1000);


            }

            turnCounter ++;
            $('.score').html('Turn counter: ' + turnCounter);
            firstVisibleCard = false;
        }
    }

}

// usuwanie kart
function hideCards(actualCardNumber, visibleCardNumber){
    // widoczność obu kart na bordzie zmniejszamy do zera
    $('#card' + actualCardNumber).css('opacity', 0);
    $('#card' + visibleCardNumber).css('opacity', 0);
    // zmniejszamy ilość nieodkrytych kart o 1
    pairCards--;
    if(pairCards === 0){
        $('.board').html('<h1>Congratulations! <br> You win! <br> Done in ' + turnCounter + ' turns<h1>')
    }
    // usuwamy blokadę
    lockCards = false;
}

// przewracanie kart
function restoreCards(actualCardNumber, visibleCardNumber){
    $('#card' + actualCardNumber).css('background-image', 'url(images/background.jpg)');
    $('#card' + actualCardNumber).addClass('card');
    $('#card' + actualCardNumber).removeClass('cardActive');

    $('#card' + visibleCardNumber).css('background-image', 'url(images/background.jpg)');
    $('#card' + visibleCardNumber).addClass('card');
    $('#card' + visibleCardNumber).removeClass('cardActive');

    lockCards = false;
}