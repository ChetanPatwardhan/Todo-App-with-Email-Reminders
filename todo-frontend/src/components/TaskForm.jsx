import React, { useState } from 'react'

export default function TaskForm({ onCreate }) {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [dueAt, setDueAt] = useState('') // yyyy-mm-ddThh:mm
    const [priority, setPriority] = useState('medium')

    async function submit(e) {
        e.preventDefault()
        if (!title.trim()) return alert('Title required')
        const payload = {
            title: title.trim(),
            description: desc.trim() || undefined,
            dueAt: dueAt ? new Date(dueAt).toISOString() : undefined,
            priority
        }
        await onCreate(payload)
        setTitle(''); setDesc(''); setDueAt(''); setPriority('medium')
    }

    return (
        <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-3">
            <div className="flex items-start gap-3">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" className="flex-1 p-2 border rounded" />
                <select value={priority} onChange={e => setPriority(e.target.value)} className="p-2 border rounded">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description (optional)" className="w-full p-2 border rounded"></textarea>
            <div className="flex gap-3">
                <input type="datetime-local" value={dueAt} onChange={e => setDueAt(e.target.value)} className="p-2 border rounded" />
                <button className="px-4 py-2 bg-blue-600 text-white rounded">Add Task</button>
            </div>
        </form>
    )
}
