/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  word1 = str1;
  word2 = str2;

  // Remove spaces and convert to lowercase
  word1 = word1.replace(/\s/g, "").toLowerCase();
  word2 = word2.replace(/\s/g, "").toLowerCase();

  // Check if the lengths are the same
  if (word1.length !== word2.length) {
    return false;
  }

  // Sort the characters in both words
  let sortedWord1 = word1.split("").sort().join("");
  let sortedWord2 = word2.split("").sort().join("");

  // Compare the sorted words
  return sortedWord1 === sortedWord2;
}

module.exports = isAnagram;
