// import {useState} from 'react';
import TextInputWithLabel from '/src/shared/TextInputWithLabel.jsx';
import useEditableTitle from '/src/hooks/useEditableTitle.js';

function TodoListItem ({todo, onCompleteTodo, onUpdateTodo}) {

    // const [isEditing, setIsEditing] = useState (false);
    // const [workingTitle, setWorkingTitle] = useState(todo.title)

    const {
        isEditing,
        workingTitle,
        startEditing,
        cancelEdit,
        updateTitle,
        finishEdit
    } = useEditableTitle (todo.title);

    
    // const handleCancel = () => {
    //     setWorkingTitle (todo.title);
    //     setIsEditing (false);

    // };

    const handleCancel = cancelEdit;

    // const handleEdit = (e) => {
    //     setWorkingTitle (e.target.value)
    // }

    const handleEdit = (event) => updateTitle (event.target.value);

    // const handleUpdate = (e) => {
    //     if (!isEditing) return;
    //         e.preventDefault();
    //         onUpdateTodo ({...todo, title: workingTitle});
    //         setIsEditing (false);
    //     };
    
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
                        <button type="button" onClick={handleUpdate}>Update</button>
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