// function counter(seconds){
//    console.log(seconds);
//    seconds--
//    if(seconds<0){
//       console.log("countdown ended.");
//       return
//    }
//    else{
//       setTimeout(counter, 1000, seconds)
//    }
// }

const prompt = require('prompt-sync')()
let input = parseInt(prompt('enter time:'))
counter(input)

function counter(seconds){
   console.log(seconds);
   seconds++
   setTimeout(counter, 1000, seconds)
}