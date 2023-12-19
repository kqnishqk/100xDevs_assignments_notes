const prompt = require('prompt-sync')()
let time = parseInt(prompt('enter start:'))
setInterval(function(){
   console.log(time++)
},1000)