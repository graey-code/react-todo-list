import TodoForm from '/src/features/Todos/TodoForm.jsx';
import TodoList from '/src/features/Todos/TodoList/TodoList.jsx';
import { useState, useEffect } from 'react';

function TodosPage ({token}) {
    const [todoList, setTodoList] = useState ([]);
    const [error, setError] = useState("");
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);

   
    // create an async function inside a useEffect hook
    useEffect (()=>{
      const fetchTodos = async () => {
        setIsTodoListLoading(true);
        try {
          const response = await fetch ("/api/tasks", {
            method: "GET",
            headers: {"X-CSRF-TOKEN": token},
            credentials: "include"

          });
          const data = await response.json();
          if (response.status === 200) {

                setTodoList(data.tasks);
          } else if (response.status === 401) {
            throw new Error(`Unauthorized: ${response.status}`);

          } else if (!response.ok) {
           throw new Error(`Response Status: ${response.status}`);
          }
        } catch (error) {
          setError(`Error: ${error.message}`);
        } finally {
          setIsTodoListLoading(false);
        }
      }
      if (token) {
      fetchTodos();
      }
    }, [token]);
  


    const addTodo = async (workingTodoTitle) => {

      const newTodo = {
        id: Date.now(),
        title: workingTodoTitle,
        isCompleted: false
      };
    
      setTodoList((prev) => [newTodo, ...prev]);

      try {
        const response = await fetch("/api/tasks", {
          method: "POST",
          headers: {"Content-Type": "application/json", "X-CSRF-TOKEN": token},
          credentials: "include",
          body: JSON.stringify ({title: newTodo.title, isCompleted: newTodo.isCompleted})

        });
        if (!response.ok) {
          throw new Error(response.message || "Failed to add Todo");
        }
        const newTodoData = await response.json();
        setTodoList((updatedTodoList) => updatedTodoList.map(todo => todo.id === newTodo.id ? newTodoData : todo));

      } catch (error) {
        setError(`Error adding Todo: ${newTodo.title}, The Error Message: ${error.message}`);
        setTodoList((updatedTodoList) => updatedTodoList.filter(todo => todo.id !== newTodo.id));
        

      }

    }
  
    
    const completeTodo = async (id) => {
      const originalTodo = todoList.find((todo) => todo.id === id);
      const updatedTodoList = todoList.map (todo => 
        todo.id === id ? {...todo, isCompleted: true} : todo
      );
      setTodoList (updatedTodoList);

      try{
        const response = await fetch(`/api/tasks/${id}`, {
          method: "PATCH",
          headers: {"Content-Type": "application/json", "X-CSRF-TOKEN": token},
          credentials: "include",
          body: JSON.stringify ({isCompleted: true}),
          createdAt: originalTodo.createdAt

        });
        if (!response.ok) {
          throw new Error(response.message || "Failed Todo");
        }

      } catch (error) {
        setError(`Error completing Todo: ${originalTodo.title}, The Error Message: ${error.message}`);
        setTodoList((updatedTodoList) => updatedTodoList.map(todo => todo.id === id ? originalTodo : todo))
        
      }
    };

    const updateTodo = async (editedTodo) => {
      const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
      const updatedTodos = todoList.map (todo =>
        todo.id === editedTodo.id ? {...editedTodo}: todo
      );
      setTodoList (updatedTodos);

      try {
        const response = await fetch(`/api/tasks/${editedTodo.id}`, {
          method: "PATCH",
          headers: {"Content-Type": "application/json", "X-CSRF-TOKEN": token},
          credentials: "include",
          body: JSON.stringify ({title: editedTodo.title, isCompleted: editedTodo.isCompleted}),
          createdAt: originalTodo.createdAt

        });
        if (!response.ok) {
          throw new Error(response.message || "Failed to update Todo");
        }

      } catch (error) {
        setError(`Error updating Todo: ${editedTodo.title} || Error Message: ${error.message}`);
        setTodoList((updatedTodos) => updatedTodos.map(todo => todo.id === editedTodo.id ? originalTodo : todo))

      }

    };

    return (
      <>
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={() => setError("")}>Clear Error</button>
        </div>
      )}
      {isTodoListLoading && <p>Loading Todos...</p>}
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} />
      
      </>
    )

}

export default TodosPage;
