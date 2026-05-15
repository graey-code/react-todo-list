import {useRef, useState} from 'react';



 
function TodoForm ({onAddTodo}) {
    const inputRef = useRef(null);
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");

    const handleAddTodo = (event) => {
        event.preventDefault();

        
        if (workingTodoTitle.trim()) {
            onAddTodo(workingTodoTitle);
            setWorkingTodoTitle ("");
            
            inputRef.current.focus();
        }

    };


    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="workingTodoTitle">Todo </label>
            
            <input
              value={workingTodoTitle}
              onChange={e => setWorkingTodoTitle(e.target.value)} 
              ref={inputRef}
              type="text"
              id="workingTodoTitle"
              name="workingTodoTitle"
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
