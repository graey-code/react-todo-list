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
  
  
  // const completeTodo = (todo) => {
  //   const newTodoArray = []; 
  //   todoList.map ((id) => {
  //     newTodoArray.push = todo.id === id ? {...todo, isCompleted: true} : todo;

  //     return (
  //       setTodoList ([...newTodoArray])
  //     );
      
  //   })

  // }

  // suggested change
  const completeTodo = (id) => {
    const updatedTodoList = todoList.map (todo => 
      todo.id === id ? {...todo, isCompleted: true} : todo
    );
    setTodoList (updatedTodoList);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  )
}

export default App
