

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

    // Similar patters
    COMPLETE_TODO: 'COMPLETE_TODO',
    UPDATE_TODO: 'UPDATE_TODO',

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
    switch (action.type) {
        // Add cases here

        //FETCH START
        case TODO_ACTIONS.FETCH_START:
                                           
            return {
                ...state,
                isTodoListLoading: false,
                error: '',
                filterError: '',

            };

        // FETCH SUCCESS
        case TODO_ACTIONS.FETCH_SUCCESS:

            // setTodoList(data.tasks);
            // setFilterError('');
            
        
            return {
                ...state,
                todoList: action.payload,
                error: '',
                filterError: '',

            };

        // FETCH ERROR
        case TODO_ACTIONS.FETCH_ERROR:

            // setError(`Error fetching todos: ${error.message}`);
            //setFilterError(`Error filtering/sorting todos: ${error.message}`);
            //setIsTodoListLoading(false);

            return {
                ...state,
                error: action.type,
                filterError: '',
                isTodoListLoading: false
                

            };

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
                todoList: action.payload,
                isTodoListLoading: false,
                error: '',
                filterError: '',

            };

        // ADD TODO SUCCESS
        case TODO_ACTIONS.ADD_TODO_SUCCESS:
            
            // setTodoList((updatedTodoList) => updatedTodoList.map(todo => todo.id === newTodo.id ? newTodoData : todo));
            // invalidateCache();

            return {
                ...state,
                todoList: action.payload,
                //isTodoListLoading: false,
                error: '',
                filterError: '',

            };

        // ADD TODO ERROR
        case TODO_ACTIONS.ADD_TODO_ERROR: 

            // setError(`Error adding Todo: ${newTodo.title}, The Error Message: ${error.message}`);
            // setTodoList((updatedTodoList) => updatedTodoList.filter(todo => todo.id !== newTodo.id));

            return {
                ...state,
                isTodoListLoading: false,
                todoList: ((updatedTodoList) => updatedTodoList.filter(todo => todo.id !== action.payload.id)),
                error: '',
                filterError: '',

            };

        // COMPLETE TODO
        case TODO_ACTIONS.COMPLETE_TODO:
            
            // setTodoList (updatedTodoList);
            // setError(`Error completing Todo: ${originalTodo.title}, The Error Message: ${error.message}`);
            // setTodoList((updatedTodoList) => updatedTodoList.map(todo => todo.id === id ? originalTodo : todo));

            return {
                ...state,
                isTodoListLoading: false,
                todoList: action.payload,
                error: '',
                filterError: '',

            };

        // UPDATE TODO
        case TODO_ACTIONS.UPDATE_TODO: 

            // setTodoList (updatedTodos);
            // setError(`Error updating Todo: ${editedTodo.title} || Error Message: ${error.message}`);
            // setTodoList((updatedTodos) => updatedTodos.map(todo => todo.id === editedTodo.id ? originalTodo : todo))
     
            
            return {
                ...state,
                isTodoListLoading: false,
                todoList: action.payload,
                error: '',
                filterError: '',

            };

        // SET SORT
        case TODO_ACTIONS.SET_SORT: 

            // setSortBy('creationDate');
            // setSortDirection('desc');

            return {
                ...state,
                // isTodoListLoading: false,
                sortBy: action.type,
                sortDirection: action.type,
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
                //isTodoListLoading: false,
                //error: '',
                dataVersion: action.payload,
                filterError: '',

            };


        default:
            throw new Error(`Unknown Action Type: ${action.type}`);
    }

}