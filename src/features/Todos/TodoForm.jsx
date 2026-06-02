import {useRef, useState} from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx';
import isValidTodoTitle from '../../utils/todoValidation.js';


 
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
            <TextInputWithLabel
              value={workingTodoTitle}
              onChange={e => setWorkingTodoTitle(e.target.value)}
              ref={inputRef}
              elementId="workingTodoTitle"
              labelText="Todo"
            />
            
            
            <button 
              type="submit"
              disabled={!isValidTodoTitle(workingTodoTitle.trim())}
            >
                Add Todo
            </button>
        </form>

    );
}

export default TodoForm;
