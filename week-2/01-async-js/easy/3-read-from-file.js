const fs = require('fs')


function myReadFile(filename){
   fs.readFile(filename, "utf-8", function(err, data){
         console.log(data);
   })
   setTimeout(console.log,2000,"expensive operation")
}

myReadFile("a.txt")
console.log("this is sync code.");