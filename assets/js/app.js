// 2C = 2 de Trebol
// 2H = 2 de Corazones
// 2S = 2 de Picas
// 2D = 2 de Diamantes

(()=>{
let deckPlayer = [], deckComp = [];
let player = [];
let comp = [];

const btnNewGame = document.getElementById('btn-new-game');
const btnTakeOne = document.getElementById('btn-takeone');
const btnStop = document.getElementById('btn-stop');

const createDeck = (deck)=> {
    const pipes = ['C','H','S','D'];
    // [...Array(11).keys(), 'A', 'J','K','Q'].forEach(iter => {
    //      let comparation = iter.toString().includes('0') ||  iter.toString().includes('1') || iter.toString().includes('10')
    //     if (!comparation) {
    //         const n = pipes.map( p => `${iter}${p}`)
    //         deck.push(...n);
    //     }
    // });
    for (let index = 1; index < 14; index++) {
        let n = index;
        if (index === 1 ) n = "A";
        if (index === 11) n = "J";
        if (index === 12) n = "Q";
        if (index === 13) n = "K";
        pipes.forEach( e => deck.push(`${n}${e}`) );
    }
    return _.shuffle( deck ); 
}

btnNewGame.addEventListener('click', () => newGame())
btnTakeOne.addEventListener('click', () => takeOne('player-cards', player, 'player-score', deckPlayer));
btnStop.addEventListener('click', ()=> {
    btnTakeOne.disabled = true;
    btnStop.disabled = true;
    cpuTurnOn( getScore(player) );
})


const newGame = ()=>{
    deckPlayer = createDeck(deckPlayer);
    deckComp = createDeck(deckComp);
    player = [];
    comp = [];
    const playerDesk = document.getElementById('player-cards');
    playerDesk.innerHTML = '';
    const compDesk = document.getElementById('comp-cards');
    compDesk.innerHTML = '';
    displayScore(0,'comp-score');
    displayScore(0,'player-score');
    btnTakeOne.disabled = false;
    btnTakeOne.disabled = false;
    btnStop.disabled = false;
    // console.log(deck);
}

const takeOne = (container, listPlayer, display_score, deck) => {
    if(deckPlayer.length ==0){
        alert('Debe iniciar el juego');
        return;
    }
    let taked = deck.pop();
    let value = valueCard(taked);
    listPlayer.push({card: taked, value});
    createCard(container, { card: taked})
    let points = getScore(listPlayer);
    displayScore(points, display_score);
}

const createCard = (container, imgobj)=> {
    const { card } = imgobj; 
    const desk = document.getElementById(container);
    const image = document.createElement('img');
    image.src = `assets/suit-cards/${card}.png`;
    image.classList.add('card');
    desk.appendChild(image);
}

const verify = (points) =>{
    if (points == 21) {
        alert('Ganaste!');
        newGame();
    }
    if (points > 21) {
        alert('Perdiste!');
        newGame();
    }
}
const valueCard = (card) =>{
    let value = card.substring(0, card.length - 1);
    if (isNaN(value))
        value =  (value === 'A') ? 11 : 10;
    return +value;
}

const getScore = (desk) =>{
    return desk.map( c => c.value).reduce((a, b) => a + b, 0);
}

const displayScore = (score,scoreView)=>{
    let display = document.getElementById(scoreView);
    display.textContent = score;
    // verify(score);
}

const cpuTurnOn = (valueMin) => {
    do {
        takeOne('comp-cards', comp, 'comp-score', deckComp);
    } while ( valueMin <= 21? getScore(comp) <= valueMin &&  getScore(comp) <= 21 : false);
    let playerScore = getScore(player);   
    let compScore = getScore(comp);
    // console.log(playerScore);
    // console.log(compScore);
    let caso1 = (playerScore > 21 && compScore <= 21 ) || ( playerScore <= 21 && compScore <= 21 && playerScore < compScore ), // Jugador Pierde 
        caso2 = (playerScore <= 21 && compScore > 21) || (playerScore <= 21 && compScore <= 21 && playerScore > compScore), // Jugador Gana 
        caso3 = playerScore == compScore && compScore <= 21; // Empate
    
    // console.log(`Caso 1 = ${caso1}\nCaso 2 = ${caso2}\nCaso 3 = ${caso3}`);

    setTimeout(()=>{
        if (caso1) {
            alert('Perdiste');
            console.log('Perdiste')
        }else if (caso2) {
            alert('Ganaste');
            console.log('Ganaste')
        } else if (caso3) {
            alert('Empate');
            console.log('Empate');
        }else{
            alert('Empate');
            console.log('Empate');
        }
    }, 500)

}
})();