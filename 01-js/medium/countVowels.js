/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  let newstr = str.toLowerCase()
  let count = 0
  let vowels = ['a','e','i','o','u']
  for (let i =0; i<str.length; i++){
    for(let j=0; j<vowels.length; j++){
      if(newstr[i] === vowels[j]){
        count = count + 1
      }
    }
  }
  return count
}

module.exports = countVowels;