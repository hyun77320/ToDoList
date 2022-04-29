import React, { createContext, useReducer, useContext, useRef, useEffect } from "react";

const TodoStateContext = createContext(null);
const TodoDispatchContext = createContext(null);
const TodoNextIdContext = createContext(null);


const saveData = (data) => {
    const userObj = { list: data }
    window.localStorage.setItem('list', JSON.stringify(userObj))
}

function todoReducer(state, action) {
    let a;
    switch (action.type) {
        case 'CREATE':
            a = state.concat(action.todo);
            break;
        case 'TOGGLE':
            a = state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
            break;
        case 'REMOVE':
            a = state.filter(todo => todo.id !== action.id);
            break;
        default:
            a = state;
            break;
    }
    
    saveData(a);
    return a;
}

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, []);
    const nextId = useRef(1);

    useEffect(() => {
        console.log(window.localStorage.getItem('list')); 
    }, [state]);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState() {
    return useContext(TodoStateContext);
}

export function useTodoDispatch() {
    return useContext(TodoDispatchContext);
}

export function useTodoNextId() {
    return useContext(TodoNextIdContext);
}