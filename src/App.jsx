import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList.jsx';
import './App.css'
import { useState } from 'react';




function App() {

  const [filteredTodoList, setTodoList] = useState ([]);

  const addTodo = (todoTitle) => {

    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false
    };
    // Updating the todo list functionally
    setTodoList((prev) => [newTodo, ...prev]);

  }
  
  // function to work on
  // In App.jsx, create a new function called completeTodo above the return statement that:
  // Takes an id parameter
  // Maps through the todoList array
  // For each todo, checks if todo.id matches the provided id
  // If it matches, returns a new object that spreads the current todo and sets isCompleted to true 
  // possibly: {...todo, isCompleted: true}
  // If it doesn't match, returns the todo unchanged
  // Updates the todoList state with the resulting array
  const completeTodo = (todo) => {
    const newTodoArray = []; 
    filteredTodoList.map ((id) => {
      newTodoArray.push = todo.id === id ? {...todo, isCompleted: true} : todo;

      return (
        setTodoList ([...newTodoArray])
      );
      
    })

  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={filteredTodoList} onCompleteTodo={completeTodo} />
    </div>
  )
}

export default App
