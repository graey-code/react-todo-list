import TodoListItem from './TodoListItem.jsx';

function TodoList ({todoList, onCompleteTodo}) {
    
    
    const filteredTodoList =
        todoList.filter ((todo) => !todo.isCompleted); 

    
    console.log(todoList);
    
    return (
        
            filteredTodoList.length === 0 ? (<p>Add Todo above to get started</p>) : (
                <ul>
                    {filteredTodoList.map(item =>
                        (<TodoListItem key={item.id} todo={item} onCompleteTodo={onCompleteTodo} />))}
                </ul>)
        
        
        
    );
}

export default TodoList;