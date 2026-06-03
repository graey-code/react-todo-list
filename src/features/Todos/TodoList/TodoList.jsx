import {useMemo} from 'react';
import TodoListItem from './TodoListItem.jsx';
//import isValidTodoTitle from '/src/utils/todoValidation.js';

function TodoList ({todoList, onCompleteTodo, onUpdateTodo, dataVersion}) {
    
    
    const filteredTodoList = useMemo (()=> {
        const todos = todoList.filter ((todo) => !todo.isCompleted);
        const version = dataVersion;
        //console.log(`Recalculating filtered todos (v${dataVersion})`);
        return {
            version,
            todos
        }
    }, [todoList, dataVersion]);

    
    
    return (
        
            filteredTodoList.todos.length === 0 ? (<p>Add Todo above to get started</p>) : (
                <ul>
                    {filteredTodoList.todos.map(item =>
                        (<TodoListItem key={item.id} todo={item} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo} />))}
                </ul>)
        
        
        
    );
}

export default TodoList;