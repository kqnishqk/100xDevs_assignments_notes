/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/

function sum(a,b){
    let sum = 0
    for(let i = a; i<=b; i++){
        sum += i
    }
    return sum
}
 
function calculateTime(n) {
    const now = new Date()
    const bfrMilliSecs = now.getMilliseconds()
    const bfrSecs = now.getSeconds()
    const bfrTime = bfrSecs * 1000 + bfrMilliSecs
    console.log(`fnc is called and its value is:${sum(1,n)}`);
    const now2 = new Date()
    const afrMilliSecs = now2.getMilliseconds()
    const afrSecs = now2.getSeconds()
    const afrTime = afrSecs * 1000 + afrMilliSecs
    let timeToFncExec = (afrTime - bfrTime)/1000
    return timeToFncExec;
}

const prompt = require('prompt-sync')()
let input = parseInt(prompt('enter n:'))
let result = calculateTime(input) 

console.log(`time for func to execute:${result}s.`);