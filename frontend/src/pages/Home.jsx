import React from 'react'

//for specific task card
import TaskDetails from '../components/TaskDetails'
import TaskForm from '../components/TaskForm'

//Fetch data using API 
import { useEffect } from 'react'
import { useTasksContext } from '../hooks/useTasksContext'
import { useAuthContext } from '../hooks/useAuthContext'
const Home = () => {

    // const [tasks, setTasks] = useState(null) - we dont need this , because we are using useContext hook to re render every singlr time when an api hits

    const { tasks, dispatch } = useTasksContext()
    const { user } = useAuthContext()
    //useEffect fires a fucntion when the component is rended
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()

            if (response.ok) {
                //update some local states
                dispatch({ type: 'SET_TASKS', payload: json })
            }
        }

        if (user) {

            fetchTasks()
        }

    }, []) //the empty array is to specify for render only one time when 
    //api hits first time

    return (
        <div className='home'>
            <div className="tasks">

                {tasks && tasks.length > 0 ? (
                    tasks.map((task) => (
                        // Sending the specific task to TaskDetails component and we layout there
                        <TaskDetails key={task._id} task={task} />
                    ))
                ) : (
                    <p id='no-tasks'>No tasks yet</p>
                )}


            </div>
            <TaskForm />
        </div>
    )
}

export default Home
