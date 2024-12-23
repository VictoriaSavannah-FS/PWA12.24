const {
  sumOfArray,
  findMax,
  reverseString,
  capitalizeWords,
} = require("../src/functions");

/** SUM OF ARRAY FUNCTION ---- */
// sumOfArray ------ TEST 1
test("sumOfArray: adds numbers in array", () => {
  expect(sumOfArray([1, 7, 2, 5])).toBe(15);
});

// sumOfArray ------ TEST 2 - Error when Array emtpy
test("sumOfArray: throws error if array is empty", () => {
  expect(() => sumOfArray([])).toThrow(
    "Array cannot be empty. Please try again..."
  );
});

// sumOfArray ------ TEST 3| Array less than 3 values
test("sumOfArray: error if array has less than 3 positive numbers", () => {
  expect(() => sumOfArray([7, 13])).toThrow(
    "Array needs at least 3 positive numbers."
  );
});

// sumOfArray ------ TEST 4| Array more than 5 values
test("sumOfArray: error if array more than 5 numbers", () => {
  expect(() => sumOfArray([1, 2, 3, 4, 5, 6])).toThrow(
    "Array cannot contain more than 5 numbers"
  );
});

// sumOf Array --- TEST 4 | Invalid iputs -NEgatives and strings

test("sumOfArray: throws error for invalid inputs", () => {
  expect(() => sumOfArray(["numbr", -12, -3])).toThrow(
    "Array needs at least 3 positive numbers."
  );
});

/** --------------- FIND MAX  -- TESTINGS */

// findMax ----- TEST 1 | Valid Inputs

test("findMax: return the largest value in array", () => {
  expect(findMax([10, 20, 100])).toBe(100);
});

// findMax ----- TEST 2 | Invalid Values
test("findMax: throw--> error for invalid inputs", () => {
  expect(() => findMax(["ans", -20, -100])).toThrow(
    "Array must contain at least one positive number within 0 and 999."
  );
});

/** --------------- REVERSE STRINGS  -- TESTINGS */

// reverseString ----- TEST 1 | Valid Inputs

test("reverseString: return the string in reverse", () => {
  expect(reverseString("hello")).toBe("olleh");
});

// reverseString ----- TEST 2 | string too long - max 15char/words
test("reverseString: error when string is too long", () => {
  expect(() => reverseString("exampleofbadstringmaybe")).toThrow(
    "String cannot be more than 15 characters."
  );
});
// reverseString ----- TEST 3 | Invalid Input
test("reverseString: throw error for invalid inputs", () => {
  expect(() => reverseString(123)).toThrow("Input type must be a string.");
});

/** --------------- CAPITILIZE WORDS  -- TESTINGS */
// capitalizeWords ----- TEST 1 | Valid Inputs

test("capitalizeWords: capitalize the first letter of each word", () => {
  expect(capitalizeWords("hello amazing world")).toBe("Hello Amazing World");
});

// capitalizeWords ----- TEST 2 | Invalid Values
test("capitalizeWords: throw error for invalid inputs", () => {
  expect(() => capitalizeWords(465)).toThrow("Input must be a string.");
});
