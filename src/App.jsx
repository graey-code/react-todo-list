import TodoForm from './features/TodoForm.jsx';
import TodoList from './features/TodoList/TodoList.jsx';
import './App.css'
import { useState } from 'react';




function App() {

  const [todoList, setTodoList] = useState ([]);

  const addTodo = (workingTodoTitle) => {

    const newTodo = {
      id: Date.now(),
      title: workingTodoTitle,
      isCompleted: false
    };
    
    setTodoList((prev) => [newTodo, ...prev]);

  }
  
    
  const completeTodo = (id) => {
    const updatedTodoList = todoList.map (todo => 
      todo.id === id ? {...todo, isCompleted: true} : todo
    );
    setTodoList (updatedTodoList);
  };

  const updateTodo = (editedTodo) => {
    const updatedTodos = todoList.map (todo =>
      todo.id === editedTodo.id ? {...editedTodo}: todo
    );
    setTodoList (updatedTodos);

  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} />
    </div>
  )
}

export default App
