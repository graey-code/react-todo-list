import TextInputWithLabel from '/src/shared/TextInputWithLabel.jsx';
import useEditableTitle from '/src/hooks/useEditableTitle.js';
import isValidTodoTitle from '/src/utils/todoValidation.js';

function TodoListItem ({todo, onCompleteTodo, onUpdateTodo}) {

    
    const {
        isEditing,
        workingTitle,
        startEditing,
        cancelEdit,
        updateTitle,
        finishEdit
    } = useEditableTitle (todo.title);

    
    const handleCancel = cancelEdit;

    const handleEdit = (event) => updateTitle (event.target.value);
    
    const handleUpdate = (event) => {
        if (!isEditing) return;
        event.preventDefault();
        const finalTitle = finishEdit();
        onUpdateTodo({...todo, title: finalTitle});

        }
    
    
    return (
            <li>
                <form onSubmit={handleUpdate}>
                    {isEditing ? (
                        <>
                        <TextInputWithLabel value={workingTitle} onChange={handleEdit}/>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                        <button type="button" onClick={handleUpdate} disabled={!isValidTodoTitle(workingTitle)}>Update</button>
                        </>
                    ):(
                        <>
                        <label>                     
                            <input
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={() => onCompleteTodo(todo.id)}
                            />
                        </label>
                        <span onClick={() => startEditing()}>{todo.title}</span>
                        </>
                    )}              
                </form>
            </li>       
    );

}

export default TodoListItem;