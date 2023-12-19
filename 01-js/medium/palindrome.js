/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let newstr = str.trim().split(" ").join("").toLowerCase().replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g,"")
  let reverse = ""
  for(let i = newstr.length - 1; i >=0; i-- ){
      reverse += newstr[i]
  }
  result = (reverse == newstr)?true:false
  return result;
}

module.exports = isPalindrome;
