/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const uuid = require('uuid');
//   const port = 3000

  const bodyParser = require('body-parser');
  
  const app = express();
  app.use(bodyParser.json());

//   let allTodos = [{id:2},{id:3},{id:4}]
  let allTodos = []

  app.get('/todos',(req, res) => {
    res.status(200).send(JSON.stringify(allTodos))
  })
  

  app.get('/todos/:id',(req, res) => { // req.params.id when params are given followed by :, req.query.id when params are given followed by ?
    let id = req.params.id
    let found = false
    allTodos.forEach(element => {
      if(element["id"]==id){
        found = true
        res.status(200).send(JSON.stringify(element))
      }
    })
    if(!found){
      res.status(404).send("404 not found.")
    }
    
  })



  app.post('/todos',(req, res) => {
    let item = req.body
    let newId = uuid.v4()
    item['id']= newId
    allTodos.push(item)
    res.status(201).send(JSON.stringify(item))
  })


  app.put('/todos/:id', (req, res) => {
    let existingId = req.params.id;
    let item = req.body;
    let found = false;
    let id = uuid.v4();
    item['id'] = id;

    let index = allTodos.findIndex(element => String(element["id"]) === String(existingId));

    if (index != -1) {
        found = true;
        allTodos[index] = item;
        res.status(200).send("Item was found and updated.");
    }

    else{
        res.status(404).send("404 not found.");
    }
  });


  // app.delete('/todos/:id',(req, res) => {
  //   let existingId = parseInt(req.params.id)
  //   let delIndex = allTodos.findIndex(element => element['id'] === existingId);
  
  //   if (delIndex === -1) {
  //     res.status(404).send("item not found");
  //   } 
  //   else {
  //     allTodos.splice(delIndex, 1);
  //     res.status(200).send("item deleted successfully");
  //   }
  // })
  app.delete('/todos/:id', (req, res) => {
    const todoIndex = allTodos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      todos.splice(todoIndex, 1);
      res.status(200).send();
    }
  });


  app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
  });


//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//   })
  
  module.exports = app;
