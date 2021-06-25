initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)
    compareImages(document.querySelectorAll('.card'))
}

function compareImages(list){
    list.forEach(function(element){
        element.addEventListener('click', compare)
    })
}

function compare(event){
    console.debug(event.target)
    event.
//     imageOne = event.target.alt
//     imageTwo = event.target.alt
//     if(imageOne == imageTwo) {
//         console.debug(event.target)        
//     } else {
//         console.debug(event.target)        
//     }
}