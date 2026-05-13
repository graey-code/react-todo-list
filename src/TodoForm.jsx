import {useRef} from 'react';
import {useState} from 'react';


 
function TodoForm ({onAddTodo}) {
    const inputRef = useRef(null);
    const [workingTodoTitle, setWorkingTodoTitle] = useState([]);

    const handleAddTodo = (event) => {
        event.preventDefault();

        
        //const todoTitle = event.target.todoTitle.value.trim();
        if (workingTodoTitle && workingTodoTitle !== "") {
            onAddTodo(workingTodoTitle);
            setWorkingTodoTitle ("");
            
            inputRef.current.focus();
        }

    };


    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo </label>
            <input
              value={workingTodoTitle}
              onChange={event.target.value} 
              ref={inputRef}
              type="text"
              id="todoTitle"
              name="todoTitle"
              placeholder={'Todo Text'}
              required
            />
            <button 
              type="submit"
              disabled={!workingTodoTitle.trim()} 
            >
                Add Todo
            </button>
        </form>

    );
}

export default TodoForm;
