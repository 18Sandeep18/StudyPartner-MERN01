import { TasksContext } from "../context/TaskContext";
import { useContext } from "react";
export const useTasksContext = ()=>{
    const ctxt = useContext(TasksContext)

    if(!ctxt){
        throw Error('useTasksContext must be used inside an TaskContextProvider');
    }
    return ctxt
}