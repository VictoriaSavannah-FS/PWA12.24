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
  id: number; // keep track of card # - out 0f 12
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
   
use Cards [id,name,flipped,match]??
 -
 - create rules / set limits and empty arrays to hold game data
 */

let attempts = 3;
let cards: Card[] = []; //where new cards will go
let flippedCard: Card[] = [];
// function shuffleCards : Cards[] {
//   const cardValue = ["A", "B", "C"];
//   const cardDeck= Cards[] = []; //pushing the values to the cardDeck array

// }

/*
 <<<<<< --------- ATTEMPTS LOGIC ---------- >>>>>>>>>>
 -
 -
 */

/*
 <<<<<< --------- Setting Card type ---------- >>>>>>>>>>
 -
 -
 */
