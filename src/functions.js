// implement at least four (4) of the functions

/** ------------ FUNCTION WITH NUMBERS ONLY ---------
 * ----------------- DEALS WITH ARRAYS -----------------------*/

/** Function 1 | sumOfArray(arr)
 * Takes an array of numbers and returns the sum of all elements.
 * Rules | conditonals
 * ONLY numbers in Array
 * Error handlig-> throw error - only numbers| positive #'s | Needs input
 * maybe ignore all other types?? string and negative #'s
 * limit sum of 5 numbers
 * need at least 3 nummbers
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
 * filter arrays:https://www.geeksforgeeks.org/print-all-positive-numbers-in-javascript-array/
 * */

function sumOfArray(arr) {
  // try-catch
  try {
    // check for Valid input - only Arrays
    if (!Array.isArray(arr)) {
      // checks is array -> Not returns the Error message
      throw new Error("Input must be an array.");
    }

    // Array canbnot be empty
    if (arr.length === 0) {
      throw new Error("Array cannot be empty. Please try again...");
    }

    /**  make sure #'s are POSITITVE ---*/

    // option 2|
    let filterArr = arr.filter(
      (number) =>
        //make's sure elemnt is also a nummber
        typeof number === "number" && number > 0
    );

    /**RANGE | MAX LENGTH of Array | Ar
     * array length | > 3 | < 5 --- */
    if (filterArr.length < 3) {
      throw new Error("Array needs at least 3 positive numbers.");
    }
    if (filterArr.length >= 5) {
      throw new Error("Array cannot contain more than 5 numbers");
    }

    // ACTUAL SUM LOGIC

    let sum = 0; //initila value=0/ add to it
    // for loop to go through new array and add values to "sum"
    for (let number of filterArr) {
      sum += number; //add new values to "sum"
    }
    return sum; //new sum of values
  } catch (error) {
    // handle errors
    console.error("Error:Invalid input type");
    // return "Invalid Input. Needs to be an array with positive number.";
    throw error; //send to Jest to handle
  }
}
/**
 * Function 2| findMax(arr)
 *	Takes an array of numbers and returns the largest number.
 * Filters | accepts only numbers
 * only positive numbers
 * max - range? 3 digits max
 * array of 10 numbers max
 */

function findMax(arr) {
  //  try-ctch block
  try {
    // valid input - array only
    if (!Array.isArray(arr)) {
      throw new Error("Input must be an array.");
    }
    // FILTER ---- Only positive numbers |

    const filterArr = arr.filter(
      // defien the params |positive # | max 3 digits| 0-999
      (number) =>
        typeof number === "number" && //makes sure elemnts "number" are #'s & also included
        // check for range
        number > 0 &&
        number <= 999
    );
    // check for length of number----- one for error min and max
    if (filterArr.length === 0) {
      // needs to be morethan 0
      throw new Error(
        "Array must contain at least one positive number within 0 and 999."
      );
    }
    if (filterArr.length > 10) {
      // checks for arry max lenght
      throw new Error("Array must contain less than 10 numbers.");
    }
    // Use spreader() operator to exapnd array elemtns & pass as individal arguments to find max value in array.https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    // const maxValue = Math.max(...filterArr);
    // return maxValue;
    return Math.max(...filterArr);
  } catch (error) {
    console.error("Error: Invalid Input. Try again.");
    // return "Invalid input type. Array needs to contain positive numbers in range.";
    throw error; //for Jest
  }
}

/** ------------ FUNCTION WITH STRINGS ---------
 * ----------------------------------------*/

/**
 * Function 3| reverseString(str)
 *	Reverses the input string and returns the reversed result.
 * accepts only strings??
 * Error handlig-> throw error - only strings | mixed types | Needs input
 * max - range pf string: 15 letters? | no more--> throw error
 * Language - English
 *
 */

function reverseString(str) {
  try {
    // validate - check for String type
    if (typeof str !== "string") {
      throw new Error("Input type must be a string.");
    }
    // checks for valid inputs | no empty | range: +0|max 15char

    if (str.length === 0) {
      throw new Error("String cannot be empty.");
    }
    if (str.length > 15) {
      throw new Error("String cannot be more than 15 characters.");
    }

    //https://www.freecodecamp.org/news/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb/

    let strSplit = str.split(""); //split the string
    console.log(strSplit);
    // reverse split string
    // let reverseStr = strSplit.reverse();
    // return reverseStr;
    // // join split string
    // let joinStr = reverseStr.join("");
    // return joinStr;

    let reverseStr = str.split("").reverse().join("");
    // console.log(reverseStr);
    return reverseStr;
  } catch (error) {
    console.error("Error:Invalid Input");
    // return "Invalid Input. Try again wiht a valid string.";
    throw error; //for jest
  }
}

/**
 * Function 4| capitalizeWords(str)
 * Accepts a string of words and returns a new version where  each word is capitalized (only the first letter of each word).
 * ONLY accepts Strings
 * MaxInput Range - 10 -15 words per string.
 * Language - English 
 * Error handlig-> throw error

 */

function capitalizeWords(str) {
  try {
    // check for strings only
    if (typeof str !== "string") {
      throw new Error("Input must be a string.");
    }
    //check for length of characters in string

    // https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
    const words = str.split(" "); //cut @ spaces
    if (words.length > 15) {
      throw new Error("String cannot have more than 15 characters.");
    }

    // CAPITALIZE e/a word - split ()
    const capiWords = words.map(
      //map : go thorugh e/a word ina array
      (word) => {
        // return word @ index 0 -> upperCase / e/a first char or that word
        return word.charAt(0).toUpperCase() + word.slice(1); //slice>to NOT change the rest of the word
      }
    );
    // Join words back together to one string
    return capiWords.join(" ");
  } catch (error) {
    console.error("Error: Invalid Input. Input must  be a string. ");
    // return "Invalid Input: Needs to a Valid String";
    throw error; //for jest to handle
  }
}

// Exporting the modules
module.exports = {
  sumOfArray,
  findMax,
  reverseString,
  capitalizeWords,
};
