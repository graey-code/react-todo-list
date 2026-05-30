import TodoListItem from './TodoListItem.jsx';
//import isValidTodoTitle from '/src/utils/todoValidation.js';

function TodoList ({todoList, onCompleteTodo, onUpdateTodo}) {
    
    
    const filteredTodoList =
        todoList.filter ((todo) => !todo.isCompleted); 

    
    //console.log(todoList);
    
    return (
        
            filteredTodoList.length === 0 ? (<p>Add Todo above to get started</p>) : (
                <ul>
                    {filteredTodoList.map(item =>
                        (<TodoListItem key={item.id} todo={item} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo} />))}
                </ul>)
        
        
        
    );
}

export default TodoList;