import TodoForm from '/src/features/Todos/TodoForm.jsx';
import TodoList from '/src/features/Todos/TodoList/TodoList.jsx';
import SortBy from '/src/shared/SortBy.jsx';
import useDebounce from '/src/utils/useDebounce.js';
import FilterInput from '/src/shared/FilterInput.jsx';
import { useEffect, useCallback, useReducer } from 'react';
import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from '../../reducers/todoReducer.js';

function TodosPage ({token}) {

    // const [todoList, setTodoList] = useState ([]);
    // const [error, setError] = useState("");
    // const [isTodoListLoading, setIsTodoListLoading] = useState(false);
    // const [sortBy, setSortBy] = useState("creationDate");
    // const [sortDirection, setSortDirection] = useState("desc");
    // const [filterTerm, setFilterTerm] = useState("");
    // const [dataVersion, setDataVersion] = useState (0);
    // const [filterError, setFilterError] = useState("");

    
    
    const [state, dispatch] = useReducer(todoReducer, initialTodoState);
    const {
      todoList,
      error,
      filterError,
      isTodoListLoading,
      sortBy,
      sortDirection,
      filterTerm,
      dataVersion,
    } = state;

    const debouncedFilterTerm = useDebounce(filterTerm, 300);


    const invalidateCache = useCallback (()=> {
      // setDataVersion(prev => prev +1);
      dispatch({type: TODO_ACTIONS.SET_VERSION})
      // Do I get rid of this or leave it here?
      console.log("Invalidating memo cache after todo mutation.")
      
    }, []);

    const handleFilterChange = (newTerm) => {
      // setFilterTerm(newTerm);
      dispatch({type: TODO_ACTIONS.SET_FILTER, payload: {newTerm}})

    };


   
    // fetchTodos
    useEffect (()=>{
      const fetchTodos = async () => {
        //setIsTodoListLoading(true);
        dispatch({ type: TODO_ACTIONS.FETCH_START});
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

                // setTodoList(data.tasks);
                // setFilterError('');
                dispatch({
                  type: TODO_ACTIONS.FETCH_SUCCESS,
                  payload: {data},
                });
          } else if (response.status === 401) {
            throw new Error(`Unauthorized: ${response.status}`);

          } else if (!response.ok) {
           throw new Error(`Response Status: ${response.status}`);
          }
        } catch (error) {
          if (debouncedFilterTerm || sortBy !== 'creationDate' || sortDirection !== 'desc') {
            //setFilterError(`Error filtering/sorting todos: ${error.message}`);
            dispatch({
                  type: TODO_ACTIONS.FETCH_ERROR,
                  payload: {
                    message: `Error filtering/sorting todos: ${error.message}`},
                });
          } else {
            //setError(`Error fetching todos: ${error.message}`);
            dispatch({
                  type: TODO_ACTIONS.FETCH_ERROR,
                  payload: {
                    message: `Error fetching todos: ${error.message}`
                  },
                });
          }
        } finally {
          // setIsTodoListLoading(false);
          dispatch({
                  type: TODO_ACTIONS.FETCH_ERROR,
                  payload:{
                    error: '',
                    isTodoListLoading: false,
                  }
                });
          
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
    
      //setTodoList((prev) => [newTodo, ...prev]);
      dispatch({
                  type: TODO_ACTIONS.ADD_TODO_START,
                  payload: {newTodo},
                });

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
        const setTodoList = ((updatedTodoList) => updatedTodoList.map(todo => todo.id === newTodo.id ? newTodoData : todo));
        // possible issue with calling an await function into the dispatch
        dispatch({
                  type: TODO_ACTIONS.ADD_TODO_SUCCESS,
                  payload: {setTodoList},
                });

        invalidateCache();

      } catch (error) {
        //setError(`Error adding Todo: ${newTodo.title}, The Error Message: ${error.message}`);
        //setTodoList((updatedTodoList) => updatedTodoList.filter(todo => todo.id !== newTodo.id));
        dispatch({
                  type: TODO_ACTIONS.ADD_TODO_ERROR,
                  payload: {
                    message: `Error adding Todo: ${newTodo.title}, The Error Message: ${error.message}`,
                    newTodo,
                  },
                });
        

      }

    }
  
  // completeTodo  
    const completeTodo = async (id) => {
      const originalTodo = todoList.find((todo) => todo.id === id);
      const updatedTodoList = todoList.map (todo => 
        todo.id === id ? {...todo, isCompleted: true} : todo
      );
      // setTodoList (updatedTodoList);
      dispatch({
                  type: TODO_ACTIONS.COMPLETE_TODO,
                  payload: {updatedTodoList},
                });
      
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
        const setError = (`Error completing Todo: ${originalTodo.title}, The Error Message: ${error.message}`);
        const setTodoList = ((updatedTodoList) => updatedTodoList.map(todo => todo.id === id ? originalTodo : todo));
        dispatch({
                  type: TODO_ACTIONS.ADD_TODO_SUCCESS,
                  payload: {todoList: setTodoList, error: setError},
                });
        
      }
    };


    // updateTodo
    const updateTodo = async (editedTodo) => {
      const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
      const updatedTodos = todoList.map (todo =>
        todo.id === editedTodo.id ? {...editedTodo}: todo
      );
      // setTodoList (updatedTodos);
      dispatch({
                  type: TODO_ACTIONS.UPDATE_TODO,
                  payload: {updatedTodos},
                });
      

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
        const setError = (`Error updating Todo: ${editedTodo.title} || Error Message: ${error.message}`);
        const setTodoList = ((updatedTodos) => updatedTodos.map(todo => todo.id === editedTodo.id ? originalTodo : todo));
        dispatch({
                  type: TODO_ACTIONS.UPDATE_TODO,
                  payload: {todoList: setTodoList, error: setError},
                });

      }

    };

    return (
      <>
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={() => dispatch({type: TODO_ACTIONS.CLEAR_ERROR})}>Clear Error</button>
        </div>
      )}
      {filterError && (
        <div>
          <p>{filterError}</p>
          <button
            onClick={() => dispatch({type: TODO_ACTIONS.RESET_FILTERS})}
          >
            Clear Filter Error

          </button>
          <button
            onClick={()=> {
              dispatch({type: TODO_ACTIONS.SET_FILTER, payload: ''}),
              dispatch({type: TODO_ACTIONS.SET_SORT}),
              dispatch({type: TODO_ACTIONS.RESET_FILTERS})
            }}
          >
            Reset Filters

          </button>
        </div>
      )}
        
      
      {isTodoListLoading && <p>Loading Todos...</p>}
      
      <SortBy sortBy={sortBy} sortDirection={sortDirection} onSortByChange={(newSortBy)=> dispatch({
        type: TODO_ACTIONS.SET_SORT,
        payload: {sortBy: newSortBy, sortDirection},
      })} onSortDirectionChange={(newSortDirection)=> dispatch({
        type: TODO_ACTIONS.SET_SORT,
        payload: {sortDirection: newSortDirection, sortBy},
      })} />
      <p className='spaced-text'></p>
      <FilterInput filterTerm={filterTerm} onFilterChange={handleFilterChange}/>
      <p className='spaced-text'></p>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} dataVersion={dataVersion} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} />
      
      </>
    )

}

export default TodosPage;
//