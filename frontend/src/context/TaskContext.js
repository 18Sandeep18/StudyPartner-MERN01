import { createContext, useReducer } from "react";

export const TasksContext = createContext()

export const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                tasks: action.payload
            }
        case 'CREATE_TASKS':
            return {
                tasks: [...state.tasks, action.payload]
            }
        case 'DELETE_TASKS':
            return {
                tasks: state.tasks.filter((t) => t._id !== action.payload._id)
            }
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task._id === action.payload._id ? action.payload : task
                )
            }
        default:
            return state
    }
}





export const TasksContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(tasksReducer, {
        tasks: null
    })

    return (
        <TasksContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TasksContext.Provider>
    )
}