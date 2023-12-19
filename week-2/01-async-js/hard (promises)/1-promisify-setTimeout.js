/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    let p = new Promise(function(resolve){
        console.log(`in promise right now, it will be resolved after ${n} seconds.`);
        setTimeout(resolve,n * 1000,"promise resolved")
    })
    return p
}

const prompt = require('prompt-sync')()
let input = parseInt(prompt('enter input:'))
wait(input).then(function(value){
    console.log(value);
})