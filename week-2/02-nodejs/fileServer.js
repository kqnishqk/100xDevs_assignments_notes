/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
    const express = require('express');
    const fs = require('fs');
    const path = require('path');
    const app = express();
    // const port = 3000
    const fileDirectory = "./files"
    
    app.get('/files', (req,res) => {
      fs.readdir(fileDirectory,'utf-8',(err,data) => {
        if(err){
          console.error(err)
          return res.status(500).send("error accessing files directory")
        }
        res.status(200).send(JSON.stringify(data))
      })
    })
    
    
    app.get('/file/:filename', (req, res) => {
      
      let p = new Promise(function(resolve){
        let fileFound = false;
        fs.readdir(fileDirectory, 'utf-8', (err, data) => {
          let nameOfFile = req.params.filename
          
          data.forEach(file => {
            if (file === nameOfFile){
              fileFound = true
              let filePath = path.join(fileDirectory, nameOfFile);
              fs.readFile(filePath, 'utf-8', (err, fileData) => {
                resolve(fileData)
              });
            }
          });
          if(!fileFound){
            res.status(404).send('File not found')
          }
        })
      });
      p.then(function(value){
        res.status(200).send(value)
      })
    });
    
    
    app.use((req, res, next) => {
      res.status(404).send("Route not found");
    });
    
    // app.listen(port,() => {
    //   console.log(`Example app listening on port ${port}`)
    // } )
    
    module.exports = app;