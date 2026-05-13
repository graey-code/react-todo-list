import TodoListItem from './TodoListItem.jsx';

function TodoList ({filteredTodoList, onCompleteTodo}) {

    filteredTodoList =
        todo.filter (todo => todo.isCompleted === false); 

    
    
    
    return (
        <ul>
            {filteredTodoList.length === 0 ? (<p>Add todo above to get started</p>) : filteredTodoList}
        </ul>
        // replace with ternary operator that check if:
        // 1. todoList length equals zero
        // 2. If true, renders a paragraph element with the text "Add todo above to get started"
        // 3. If false, renders the existing unordered list with the mapped todos
        // replaced:  {todoList.map(todo => (<TodoListItem key={todo.id} todo={todo} />))}
        
    );
}

export default TodoList;