import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList.jsx';
import './App.css'
import { useState } from 'react';




function App() {

  const [todoList, setTodoList] = useState ([]);

  const addTodo = (todoTitle) => {

    const newTodo = {
      id: Date.now(),
      title: todoTitle
    };
    // Updating the todo list functionally
    setTodoList((prev) => [newTodo, ...prev]);

  }
  

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} />
    </div>
  )
}

export default App
