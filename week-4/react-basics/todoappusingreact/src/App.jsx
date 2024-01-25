import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div>
        <InputBox id= "title" placeholder= "todo title" value={title} onChange={(event) => {setTitle(event.target.value)}}></InputBox>
        <br /><br />
        <InputBox id= "description" placeholder= "todo description" value={description} onChange={(event) => {setDescription(event.target.value)}}></InputBox>
        <br /><br />
        <AddTodo>Add Todo</AddTodo>
        <div id="container">
          <h1>hellohello</h1>
        </div>
    </div>
  )
}

function InputBox(props){
  return <input type="text" id={props.id} placeholder={props.placeholder} onChange={props.onChange}></input>
}

function AddTodo(){
  function addTodoPress(){
    let todosDOM = document.getElementById("container")

    const todo = document.createElement("div")


    const title = document.createElement("div")
    title.innerHTML = document.getElementById("title").value;

    const description = document.createElement("div")
    description.innerHTML = document.getElementById("description").value;

    todo.appendChild(title)
    todo.appendChild(description)

    todosDOM.appendChild(todo)

  }
  return <button onClick={addTodoPress}> Add Todo</button>
}

export default App
  