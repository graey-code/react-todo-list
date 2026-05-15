import TodoListItem from './TodoListItem.jsx';

function TodoList ({todoList, onCompleteTodo}) {
    
    
    const filteredTodoList =
        todoList.filter ((todo) => !todo.isCompleted); 

    
    console.log(todoList);
    
    return (
        <ul>
            {filteredTodoList.length === 0 ? (<p>Add todo above to get started</p>) : (filteredTodoList.map(item =>(<TodoListItem key={item.id} todo={item} onCompleteTodo={onCompleteTodo} />)))}
        </ul>
        
        
    );
}

export default TodoList;