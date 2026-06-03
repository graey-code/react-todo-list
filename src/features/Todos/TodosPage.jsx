import TodoForm from '/src/features/Todos/TodoForm.jsx';
import TodoList from '/src/features/Todos/TodoList/TodoList.jsx';
import SortedBy from '/src/shared/SortBy.jsx';
import useDebounce from '/src/utils/useDebounce.js';
import { useState, useEffect, useCallback } from 'react';

function TodosPage ({token}) {
    const [todoList, setTodoList] = useState ([]);
    const [error, setError] = useState("");
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);
    const [sortBy, setSortBy] = useState("creationDate");
    const [sortDirection, setSortDirection] = useState("desc");
    const [filterTerm, setFilterTerm] = useState("");
    const debouncedFilterTerm = useDebounce(filterTerm, 300);
    const [dataVersion, setDataVersion] = useState (0);
    const [filterError, setFilterError] = useState("");

    const invalidateCache = useCallback (()=> {
      setDataVersion(prev => prev +1);
      console.log("Invalidating memo cache after todo mutation.");

    }, []);

    const handleFilterChange = (newTerm) => {
      setFilterTerm(newTerm);

    };


   
    // fetchTodos
    useEffect (()=>{
      const fetchTodos = async () => {
        setIsTodoListLoading(true);
        try {
          const paramsObject = {
            sortBy,
            sortDirection,
          };
          if (debouncedFilterTerm) {
            paramsObject.find = debouncedFilterTerm;
          }
          const params = new URLSearchParams (paramsObject);
          const response = await fetch (`/api/tasks?${params}`, {
            method: "GET",
            headers: {"X-CSRF-TOKEN": token},
            credentials: "include"

          });
          const data = await response.json();
          if (response.status === 200) {

                setTodoList(data.tasks);
                setFilterError('');
          } else if (response.status === 401) {
            throw new Error(`Unauthorized: ${response.status}`);

          } else if (!response.ok) {
           throw new Error(`Response Status: ${response.status}`);
          }
        } catch (error) {
          if (debouncedFilterTerm || sortBy !== 'creationDate' || sortDirection !== 'desc') {
            setFilterError(`Error filtering/sorting todos: ${error.message}`);
          } else {
             setError(`Error fetching todos: ${error.message}`);
          }
        } finally {
          setIsTodoListLoading(false);
        }
      }
      if (token) {
      fetchTodos();
      }
    }, [token, sortBy, sortDirection, debouncedFilterTerm]);
  

// addTodo
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
        invalidateCache();

      } catch (error) {
        setError(`Error adding Todo: ${newTodo.title}, The Error Message: ${error.message}`);
        setTodoList((updatedTodoList) => updatedTodoList.filter(todo => todo.id !== newTodo.id));
        

      }

    }
  
  // completeTodo  
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
          body: JSON.stringify ({isCompleted: true})
          
          
          
        });
        if (!response.ok) {
          throw new Error(response.message || "Failed Todo");
        }
        invalidateCache();

      } catch (error) {
        setError(`Error completing Todo: ${originalTodo.title}, The Error Message: ${error.message}`);
        setTodoList((updatedTodoList) => updatedTodoList.map(todo => todo.id === id ? originalTodo : todo))
        
      }
    };


    // updateTodo
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
          body: JSON.stringify ({title: editedTodo.title, isCompleted: editedTodo.isCompleted})
          
          
        });
        if (!response.ok) {
          throw new Error(response.message || "Failed to update Todo");
        }
        invalidateCache();

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
      {filterError && (
        <div>
          <p>Filter Error</p>
          <button
            onClick={setFilterError('')}
          >
            Clear Filter Error

          </button>
          <button
            onClick={
              setFilterTerm(''),
              setSortBy('creationDate'),
              setSortDirection('desc'),
              setFilterError('')
            }
          >
            Reset Filters

          </button>
        </div>
      )}
        
      
      {isTodoListLoading && <p>Loading Todos...</p>}
      
      <SortedBy sortBy={sortBy} sortDirection={sortDirection} onSortByChange={setSortBy} onSortDirectionChange={setSortDirection} />
      <FilterInput filterTerm={filterTerm} onFilterChange={handleFilterChange}/>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} dataVersion={dataVersion} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} />
      
      </>
    )

}

export default TodosPage;
//