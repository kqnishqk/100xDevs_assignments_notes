/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  let x=[...str1].map((item) => item.toLowerCase())
  x = x.sort().join('')
  let y=[...str2].map((item) => item.toLowerCase())
  y = y.sort().join('')
  let result = (x === y)?true:false
     return result
}

module.exports = isAnagram;
