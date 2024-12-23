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
    /**  make sure #'s are POSITITVE ---*/

    // option 2|
    let filterArr = arr.filter((number) => number > 0);
    console.log(filterArr);

    /**RANGE | MAX LENGTH of Array | Ar
     * array length | > 3 | < 5 --- */
    if (filterArr.length < 3) {
      throw new Error("Array needs at least 3 positive numbers.");
    }
    if (filterArr.length > 5) {
      throw new Error("Array must be less than 5 numbers");
    }

    // ACTUAL SUM LOGIC

    const sum = 0; //initila value=0/ add to it
    // for loop to go through new array and add values to "sum"
    for (let number of filterArr) {
      sum += number; //add new values to "sum"
    }
    return sum; //new sum of values
  } catch (error) {
    // handle errors
    return new Error(
      "Invalid Input. Needs to be an array with positive number."
    );
  }
}
/**
 * Function 2| findMax(arr)
 *	Takes an array of numbers and returns the largest number.
 * accepts only numbers
 * only positive numbers
 * max - range? 3 digits max
 * array of 10 numbers max
 */

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

/**
 * Function 4| capitalizeWords(str)
 * Accepts a string of words and returns a new version where  each word is capitalized (only the first letter of each word).
 * ONLY accepts Strings
 * MaxInput Range - 10 -15 words per string.
 * Language - English 
 * Error handlig-> throw error

 */

/**
 * Function 5| countVowels(str)
 * Counts the number of vowels in a given string and returns the count.
 * accept only Strings
 * max range of string: 10length
 * 10 word string max
 * Language - English
 * Error handling-> throw error
 */
