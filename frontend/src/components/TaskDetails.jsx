import React, { useState } from 'react';
import { useTasksContext } from '../hooks/useTasksContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { redirect, useNavigate } from 'react-router-dom';

const TaskDetails = ({ task }) => {
    const { dispatch } = useTasksContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editPriority, setEditPriority] = useState(task.priority);
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleClick = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this task?');
        if (confirmed) {
            const response = await fetch('api/tasks/' + task._id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'DELETE_TASKS', payload: json });
            }
        }
    };
    const handleOk = () => {
        navigate(`/focus/${task._id}`, { state: { task } });
    };

    const handleEdit = async (e) => {
        const response = await fetch('api/tasks/' + task._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                title: editTitle,
                priority: editPriority,
            }),
        });

        const json = await response.json();

        if (response.ok) {
            setIsEditing(false);
            dispatch({ type: 'UPDATE_TASK', payload: json });
        }
    };

    const isHighPriority = task.priority === "High Priority";

    return (
        <div className={`task-details ${isHighPriority ? 'high-priority' : ''}`}>
            <h4 id='title'>{task.title}</h4>
            <p><strong>Priority: </strong>{task.priority}</p>
            <p><strong>Finish Before: </strong>{task.due}</p>
            <p><strong>Time req: </strong>{task.timereq} hrs</p>
            <button id='delete' onClick={handleClick} aria-label="Delete Task">
                <i className="fas fa-trash"></i>
            </button>
            <button id='edit' onClick={() => setIsEditing(true)} aria-label="Edit Task">
                <i className="fas fa-edit"></i>
            </button>
            <button id='do-now' onClick={handleOk} aria-label="Do Now">
                DO NOW
            </button>
            {isEditing && (
                <div className="edit-modal">
                    <form onSubmit={handleEdit}>
                        <label>
                            Title:
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        </label>
                        <label>
                            Priority:
                            <select
                                value={editPriority}
                                onChange={(e) => setEditPriority(e.target.value)}
                            >
                                <option value="Low Priority">Low Priority</option>
                                <option value="High Priority">High Priority</option>
                            </select>
                        </label>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TaskDetails;
