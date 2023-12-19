const fs = require('fs')


function fileCleaner(filename){
   fs.readFile(filename, 'utf-8',function(err, data){
      console.log(`contents of the file before cleaning:${data}`);
      let a = processing(data)
      fs.writeFile(filename, a, function(err){
         console.log(`contents of the file after cleaning:${a}`);
      })

   })

   function processing(value){
      let newValue = value.replace(/\s+/g," ")
      return newValue
   }
}
fileCleaner("b.txt")