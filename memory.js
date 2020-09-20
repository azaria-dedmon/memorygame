let cards = document.getElementById('cards');
let card1 = null;
let card2 = null;
let noClicking = false;


const colors = [
'pink', 
'blue', 
'orange', 
'yellow', 
'purple', 
'pink', 
'blue', 
'orange', 
'yellow', 
'purple',
]


function shuffleCards(arr) {
    let newPos,
        temp;
    for(let i = arr.length - 1; i > 0; i--) {
        newPos = Math.floor(Math.random() * (i + 1));
        temp = arr[i]
        arr[i] = arr[newPos];
        arr[newPos] = temp;
    }
    return arr
}

let shuffle = shuffleCards(colors);



function divsForColors(colors) {
    for (let color of colors) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(color);
        newDiv.addEventListener("click", handleCardClick)
        cards.append(newDiv);
    }
}

function handleCardClick(e) {
    if (noClicking) return

    let currentCard = e.target;
    currentCard.style.backgroundColor = currentCard.classList[0]

    if(!card1 || !card2) {
        currentCard.classList.add('flipped')
        card1 = card1 || currentCard;
        card2 = currentCard === card1 ? null : currentCard;
        console.log(card1, card2)
    }

    if(card1 && card2) {
        noClicking = true;

        let comp1 = card1.className;
        let comp2 = card2.className;
        if(comp1 === comp2) {
            card1.removeEventListener("click", handleCardClick);
            card2.removeEventListener("click", handleCardClick);
            card1 = null;
            card2 = null;
            noClicking = false;
        }else {
            setTimeout(function() {
              card1.style.backgroundColor = "";
              card2.style.backgroundColor = "";
              card1.classList.remove("flipped");
              card2.classList.remove("flipped");
              card1 = null;
              card2 = null;
              noClicking = false;
            }, 1000);
        }
    }
}
document.addEventListener("DOMContentLoaded", divsForColors(shuffle));
