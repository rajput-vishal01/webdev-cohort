/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  // Remove non-alphanumeric characters (punctuation, spaces) and convert to lowercase
  let word = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  let newWord = "";

  // Reverse the string
  for (let i = word.length - 1; i >= 0; i--) {
    newWord += word[i];
  }

  // Check if the word is the same as its reverse
  return word === newWord;
}

module.exports = isPalindrome;
