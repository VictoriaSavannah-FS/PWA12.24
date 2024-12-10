// Imports your SCSS stylesheet
import "@/styles/index.scss";

console.log("Hello World! This is just a TEST--- Remain calm. ");

/* CARD MATCH | Overview | Goal

- A deck of 12 cards - start with 6
  A / B / C / D / E / F
- I'll needt two classe -
  > GAME LOGIC 
    - flipped / boolean result
      >if true + to attempts [] | !true
    - reset cards
    - add to attemps meter"
    - Keeps tracks of matches made
      > logic of paired / matches made

  > ATTEMPTS?
    - logic 
    - keep track [] array
    - set limit [] 
    - display the end results
    - will this reset game?

  >Define Card Type values / properties
    > id: keep track of card number
    > name: to pair / match pair names
    > flipped: booolean value - define wether face up or down
    > matched? / pair? = Booelean to keep track if matched a pair

*/

/*
 <<<<<< --------- Setting Card type ---------- >>>>>>>>>>
 -
 -
 */

type Card = {
  id: number; // keep track of card # - out 0f 12 [index in array]
  name: string; // "A", "B", "C", "D", "E", "F",
  flipped: boolean; // true: face UP | false: face down
  paired: boolean; // true: match made | false: no match made
};

/*
 <<<<<< --------- GAME LOGIC ---------- >>>>>>>>>>
 -
 start buidikg the game logic 
  > flipped / boolean result
      >if true + to attempts [] | !true
    - reset cards
    - add to attemps meter"
    - Keeps tracks of matches made
      > logic of paired / matches made
 --- Lesson | Custom Data Types
   
use Card [id,name,flipped,match]??
 -
 - create rules / set limits and empty arrays to hold game data
 */
// setting up the Variables
let attempts = 3;
let cards: Card[] = []; //where new cards will go
let flippedCards: Card[] = []; // where flipped cards will go (holds them until new round/pair of flipped)

/* ------ <<<< delcare suffle functin >>>> -----
 refernce:https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
 const shuffle = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};
 - sort(): rearrange the array
  - pass array-> Card[] -> hold the object/values
  - Math.random()-5:introduce a random value between -0.5 and 0.5
    > + # = swap order
    > - # = no swap
    PURPOSE : shufle cards in random order
*/
const suffle = (array: Card[]): Card[] => {
  return array.sort(() => Math.random() - 0.5);
};

/*
 <<<<<< ---------Creating Cards ---------- >>>>>>>>>>
 
 - use the Card [] type to create new set of cards
 - duplcaite values to match 
 https://stackoverflow.com/questions/33305152/how-to-duplicate-elements-in-a-js-array

function duplicateElements(array, times) {
  return array.reduce((res, current) => {
      return res.concat(Array(times).fill(current));
  }, []);

  > values [] redu((res,times-x2))
}
duplicateElements([2, 3, 1, 4], 2);
returns: [2, 2, 3, 3, 1, 1, 4, 4]
 */

function createCards(): Card[] {
  const values = ["A", "B", "C"]; //my card values
  //duplcate to maek pairs of e/a value
  const duplicateElements = values.reduce(
    (res, value) => {
      // =2 copies of e/a value- is this correct?
      return res.concat([value, value]); // kept causing me issue! ******
      // https://bobbyhadz.com/blog/typescript-no-overload-matches-this-call - tyep assertion!
      /**concat in ts expects aray s  */
    },
    // start with emppty array to hold be new array -->
    [] as string[] // type assertions: defined the [] as string[] for tyepscript
  );
  console.log(duplicateElements);

  /* Map(go through e/a val. in array)+ to Card []
  -  use params: Card [
    >id,
    >name,
    >flipped,
    >match]??
    -
    -new fucnt for deck: hold all cards values 
    */
  const deck = duplicateElements.map((name, index) => ({
    id: index, // Unique ID for each card
    name, // Card value (e.g., "A", "B", "C")
    flipped: false, // Cards are initially face-down
    paired: false, // Cards are not matched initially
  }));
  // res of cards values
  return suffle(deck);
}

// const cards = createCards();
// console.log(cards);
/*
 <<<<<< --------- ATTEMPTS LOGIC ---------- >>>>>>>>>>

 */
function updateCounter() {
  // HTML elememts - update based on attempts
  const attemptsCounter = document.getElementById("attempts-counter"); //targetting the el in html
  attempts--; //take 1 way
  attemptsCounter!.innerHTML = attempts.toString();
  // found out -->  ! or ? = exists {kpt auto-adding}

  // checsk amoount of attempts
  if (attempts === 0) {
    // dsiplays text based oin results
    const textLost = (document.getElementById("game-text-lost")!.style.display =
      "block");
  }
}
/**
 *
 * -------------   SHOW CARDS |
 *  track id - index of cads
 * logic for mathchin or not
 * upadte counter
 * show on UI?
 */
// type
function showCards() {
  // updateing html to display updates dynamkcially
  const container = document.querySelector(".card-container"); //target card class
  container!.innerHTML = ""; // Clear any existing cards

  cards.forEach((card) => {
    //tZrgetting e/a card's params html
    const cardElement = document.createElement("img");
    // upodate html with card img and id
    cardElement.id = `card ${card.id}`;
    cardElement.src = "./assets/card-flip-card-image.png"; //card img
    cardElement.alt = `Card ${card.id}`;
    // update the html lsit
    cardElement.classList.add("card");

    // ++ event listener for card clicks"
    cardElement.addEventListener("click", () => handleMatches(card.id));
    // creates elmntto previus li el
    container?.appendChild(cardElement);
  });
}

/**
 * ------- CARD FLIPS -------
 * logic
 * update counter
 * chekc of match
 */

function handleFlips(cardId: number) {
  // logic
}

/**
 * Checking for mathches -----
 *  */

function handleMatches() {
  // all logic that handles if pairs | not
  // lookingthorugh flippedCards in []
  const [firstCard, secondCard] = flippedCards;
  // tagrt the card inside flippedCards[]/id 1/2

  if (flippedCards[0].name === flippedCards[1].name) {
    // logic for paired
    flippedCards[0].flipped = true;
    flippedCards[1].flipped = true;

    // upadte counter and check for game results
    const allPaired = cards.every((card) => card.paired);
    console.log("All cards are paired!", allPaired);
    if (allPaired) {
      // update text
      const wonText = document.getElementById("game-text-won");
      if(wonText){
        wonText.style.display = "block";
    } else {
      // create a fucntion to flip cards back ove??
      firstCard.flipped = false;
      secondCard.flipped = false;
      attempts--; //update counter
      updateCounter();
    }
  }
  // reset the flippedCards [] to emptyu to hold new sest of pairs
  flippedCards = [];
}

/**
 * RESETTING THE GAME | Button Reset
 */
function resetGame() {
  attempts = 3; //start over
  flippedCards = [];
  cards = createCards(); // new decxk
  showCards(); // New cards
  updateCounter(); // Reset couter

  document.getElementById("game-text-lost")!.style.display = "none";
  document.getElementById("game-text-won")!.style.display = "none";
}

// BUTTON RESTART =---------------
// tagetr html
document.querySelector("button")!.addEventListener("click", resetGame);
