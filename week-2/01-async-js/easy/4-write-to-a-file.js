const fs = require('fs')
const prompt = require('prompt-sync')()


function myWriteFile(filename){
   let data = prompt('enter data to be written:')
   fs.writeFile(filename, data, function(err){
      if(err){
         console.log(err)
      }
      else{
         console.log("file successfully written")
         console.log(`written contents are: ${data}`)
         console.log('the file looks like:');
         console.log(fs.readFileSync(filename,'utf-8'))
      }
   })
}

myWriteFile("a.txt")