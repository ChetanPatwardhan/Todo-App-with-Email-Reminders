import React, { useEffect, useState } from 'react'
import api from '../api'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import { getUser } from '../auth'

export default function Dashboard() {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const user = getUser()

    async function load() {
        setLoading(true)
        try {
            const res = await api.get('/tasks')
            setTasks(res.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    async function handleCreate(data) {
        const res = await api.post('/tasks', data)
        setTasks(prev => [res.data, ...prev])
    }

    async function handleUpdate(id, updates) {
        const res = await api.put(`/tasks/${id}`, updates)
        setTasks(prev => prev.map(t => t._id === id ? res.data : t))
    }

    async function handleDelete(id) {
        await api.delete(`/tasks/${id}`)
        setTasks(prev => prev.filter(t => t._id !== id))
    }

    return (
        <div>
            <div className="mb-4">
                <h1 className="text-2xl font-semibold">Welcome{user?.name ? `, ${user.name}` : ''}</h1>
                <p className="text-sm text-slate-600">Your tasks</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <TaskForm onCreate={handleCreate} />
                {loading ? <div>Loading...</div> : (
                    <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
                )}
            </div>
        </div>
    )
}
