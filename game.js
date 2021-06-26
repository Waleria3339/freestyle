initGame();

function initGame() {
    cards = getCards()
    boarding(cards)
    // compareImages(document.querySelectorAll('.card'))

}

function getCards(){
    return ["butterfly.png", "butterflyEggs.png", "caterpillar.png", "frog.png", "frogEggs.png", "tadpole.png", "butterfly.png", "butterflyEggs.png", "caterpillar.png", "frog.png", "frogEggs.png", "tadpole.png"]
}

function boarding(cards){
    let board = document.getElementById('board_id')
    for (let i=0; i<cards.length; i++){
        // console.log(cards[i])
        document.addEventListener('DOMContentLoaded', function (){
            let divElement = document.createElement('div');
            divElement.id = "card"+i;
            divElement.className = 'card'
            board.appendChild(divElement)
        })
    }
}




























function compareImages(list){
    list.forEach(function(element){
        element.addEventListener('click', compare)
    })
}

function compare(event){
    console.debug(event.target)
//     imageOne = event.target.alt
//     imageTwo = event.target.alt
//     if(imageOne == imageTwo) {
//         console.debug(event.target)
//     } else {
//         console.debug(event.target)
//     }
}


// alert(cards[3])
// console.log(cards)


// function revealcards(number){
//
// }
