

export const TODO_ACTIONS = {
    // Async operations
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR',
    FETCH_END: 'FETCH_END',

    // Todo mutations
    ADD_TODO_START: 'ADD_TODO_START',
    ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
    ADD_TODO_ERROR: 'ADD_TODO_ERROR',

    // Complete TODOs
    COMPLETE_TODO_START: 'COMPLETE_TODO_START',
    COMPLETE_TODO_SUCCESS: 'COMPLETE_TODO_SUCCESS',
    COMPLETE_TODO_ERROR: 'COMPLETE_TODO_ERROR',

    // Update TODOs
    UPDATE_TODO_START: 'UPDATE_TODO_START',
    UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
    UPDATE_TODO_ERROR: 'UPDATE_TODO_ERROR',

    // UI operations
    SET_SORT: 'SET_SORT',
    SET_FILTER: 'SET_FILTER',
    CLEAR_ERROR: 'CLEAR_ERROR',
    RESET_FILTERS: 'RESET_FILTERS',
    // added 
    SET_VERSION: 'SET_VERSION',

};

export const initialTodoState = {
    todoList: [],
    error: "",
    isTodoListLoading: false,
    sortBy: "creationDate",
    sortDirection: "desc",
    filterTerm: "",
    dataVersion: 0,
    filterError: "",

};

export function todoReducer (state, action) {
    console.log('Dispatched Action: ', action.type, action.payload);
    switch (action.type) {
        // Add cases here

        //FETCH START
        case TODO_ACTIONS.FETCH_START:
                                           
            return {
                ...state,
                isTodoListLoading: true,
                error: '',
                filterError: '',

            };

        // FETCH SUCCESS
        case TODO_ACTIONS.FETCH_SUCCESS:

            // setTodoList(data.tasks);
            // setFilterError('');
            
        
            return {
                ...state,
                todoList: action.payload.todoList,
                isTodoListLoading: false,
                
            };

        // FETCH ERROR
        case TODO_ACTIONS.FETCH_ERROR: {
            const {debouncedFilterTerm, sortBy, sortDirection, error} = action.payload;

            if (debouncedFilterTerm || sortBy !== 'creationDate' || sortDirection !== 'desc') {
                return {
                ...state,
                isTodoListLoading: false,
                filterError: `Error filtering/sorting todos: ${error.message}`,
                };
            
            
          } else {
            return {
                ...state,
                isTodoListLoading: false,
                error: `Error fetching todos: ${error.message}`,
                };
            
            };
        }


        // Fetch End
        case TODO_ACTIONS.FETCH_END:

            
            //setIsTodoListLoading(false);

            return {
                ...state,
                isTodoListLoading: false
            
            };
        
        // ADD TODO START
        case TODO_ACTIONS.ADD_TODO_START:
            
          //setTodoList((prev) => [newTodo, ...prev]);

            return {
                ...state,
                todoList: [action.payload.newTodo, ...state.todoList],
                isTodoListLoading: false,
                error: '',
                
            };

        // ADD TODO SUCCESS
        case TODO_ACTIONS.ADD_TODO_SUCCESS:
            
            // setTodoList((updatedTodoList) => updatedTodoList.map(todo => todo.id === newTodo.id ? newTodoData : todo));
            // invalidateCache();

            return {
                ...state,
                todoList: state.updatedTodoList.map(todo => todo.id === action.payload.newTodo.id ? action.payload.newTodoData : todo),
                dataVersion: state.dataVersion + 1,
                
            };

        // ADD TODO ERROR
        case TODO_ACTIONS.ADD_TODO_ERROR: 

            // setError(`Error adding Todo: ${newTodo.title}, The Error Message: ${error.message}`);
            // setTodoList((updatedTodoList) => updatedTodoList.filter(todo => todo.id !== newTodo.id));

            return {
                ...state,
                isTodoListLoading: false,
                todoList: state.updatedTodoList.filter(todo => todo.id !== action.payload.id),
                error: action.payload.message,
                
            };

        // COMPLETE TODO START
        case TODO_ACTIONS.COMPLETE_TODO_START:
            
            // setTodoList (updatedTodoList);
            // const updatedTodoList = todoList.map (todo => 
            // todo.id === id ? {...todo, isCompleted: true} : todo
            return {
                ...state,
                todoList: state.todoList.map (todo => todo.id === action.payload.id ? {...todo, isCompleted: true} : todo),
                error: '',
                
            };

        // COMPLETE TODO SUCCESS
        case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
                                    
            // invalidateCache();
        
            return {
                ...state,
                dataVersion: state.dataVersion + 1,
                
            };

        // COMPLETE TODO ERROR
        case TODO_ACTIONS.COMPLETE_TODO_ERROR:
            
            // setTodoList = ((updatedTodoList) => updatedTodoList.map(todo => todo.id === id ? originalTodo : todo));
            // setError(`Error completing Todo: ${originalTodo.title}, The Error Message: ${error.message}`);
            
            return {
                ...state,
                error: action.payload.message,
                todoList: state.updatedTodoList.map(todo => todo.id === action.payload.id ? action.payload.originalTodo : todo),
            
            };

        // UPDATE TODO Start
        case TODO_ACTIONS.UPDATE_TODO_START: 

            // const updatedTodos = todoList.map (todo =>
            //   todo.id === editedTodo.id ? {...editedTodo}: todo);
            // setTodoList (updatedTodos);
                 
            return {
                ...state,
                todoList: state.todoList.map (todo =>
                todo.id === action.payload.editedTodo.id ? {...action.payload.editedTodo}: todo),
                error: '',
                
            };

        // UPDATE TODO Success
        case TODO_ACTIONS.UPDATE_TODO_SUCCESS: 

            // invalidateCache();     
            
            return {
                ...state,
                dataVersion: state.dataVersion + 1,
                
            };

        // UPDATE TODO Error
        case TODO_ACTIONS.UPDATE_TODO_ERROR: 

            // setError = (`Error updating Todo: ${editedTodo.title} || Error Message: ${error.message}`);
            // setTodoList = ((updatedTodos) => updatedTodos.map(todo => todo.id === editedTodo.id ? originalTodo : todo));
     
            return {
                ...state,
                todoList: state.updatedTodos.map(todo => todo.id === action.payload.editedTodo.id ? action.payload.originalTodo : todo),
                error: action.payload.message,
                
            };

        // SET SORT
        case TODO_ACTIONS.SET_SORT: 

            // setSortBy('creationDate');
            // setSortDirection('desc');

            return {
                ...state,
                // isTodoListLoading: false,
                sortBy: action.payload.sortBy,
                sortDirection: action.payload.sortDirection,
                // error: '',
                // filterError: '',

            };

        // SET FILTER
        case TODO_ACTIONS.SET_FILTER:
            
            // setFilterTerm('');

            return {
                ...state,
                // isTodoListLoading: false,
                // error: '',
                filterTerm: action.payload,

            };

        // CLEAR ERROR
        case TODO_ACTIONS.CLEAR_ERROR:
            
            // setError('');

            return {
                ...state,
                //isTodoListLoading: false,
                error: '',
                //filterError: '',

            };

        // RESET FILTERS
        case TODO_ACTIONS.RESET_FILTERS: 

            // setFilterError('')

            return {
                ...state,
                //isTodoListLoading: false,
                //error: '',
                filterError: action.type,

            };

        // Set Data Version
        case TODO_ACTIONS.SET_VERSION: 

            // setDataVersion(prev => prev +1);

            return {
                ...state,
                dataVersion: state.dataVersion + 1,
                
            };


        default:
            throw new Error(`Unknown Action Type: ${action.type}`);
    }

}