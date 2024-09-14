import React from 'react'
import { useState } from 'react'
import { useTasksContext } from '../hooks/useTasksContext'
import { useAuthContext } from '../hooks/useAuthContext'
const TaskForm = () => {
    //need to create state for each different properties..
    const { dispatch } = useTasksContext()
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState('')
    const [timereq, setTimereq] = useState('')
    const [due, setDue] = useState('')
    const [error, setError] = useState('')
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {

        //whenever you hit the form action - the page will automatically reload
        //to prevent that we use this line, and if we use this line if we made any new changes, to see that we need to refresh page
        e.preventDefault()

        // in order to overcome that problem - we use context = which is a globally managing state - whenever any state change is happening it will render them
        if (!user) {
            setError('You must logged in')
            return
        }

        const task = { title, priority, timereq, due }
        const response = await fetch('/api/tasks/', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        else {
            dispatch({ type: 'CREATE_TASKS', payload: json })
            setTimereq('')
            setTitle('')
            setDue('')
            setPriority('')
            setError(null)
        }


    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Topic to Study</h3>
            <label>Topic Name:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>Priority:</label>
            <select className="prior" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="" disabled>Select Priority</option>
                <option value="High Priority">High</option>
                <option value="Less Priority">Low</option>
            </select>

            <label>Time Req to finish (hrs):</label>
            <input
                type="number"
                onChange={(e) => setTimereq(e.target.value)}
                value={timereq}
            />
            <label>Deadline:</label>
            <input
                type="date"
                onChange={(e) => setDue(e.target.value)}
                value={due}
            />
            <button>Submit</button>
            {error && <div className='error'>Enter all fields</div>}
        </form>
    )
}

export default TaskForm
