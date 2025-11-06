import React from 'react'

export default function TaskList({ tasks = [], onUpdate, onDelete }) {
    if (!tasks.length) return <div className="bg-white p-4 rounded shadow">No tasks yet</div>

    return (
        <div className="bg-white p-4 rounded shadow">
            <table className="w-full">
                <thead>
                    <tr className="text-left text-sm text-slate-500">
                        <th>Title</th>
                        <th>Due</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(t => (
                        <tr key={t._id} className="border-t">
                            <td className="py-2">
                                <div className="font-medium">{t.title}</div>
                                <div className="text-xs text-slate-500">{t.description}</div>
                            </td>
                            <td>{t.dueAt ? new Date(t.dueAt).toLocaleString() : '-'}</td>
                            <td className="capitalize">{t.priority}</td>
                            <td>{t.completed ? <span className="text-green-600">Completed</span> : <span className="text-orange-600">Pending</span>}</td>
                            <td className="text-right space-x-2">
                                <button onClick={() => onUpdate(t._id, { completed: !t.completed })} className="px-2 py-1 text-sm border rounded">
                                    {t.completed ? 'Mark pending' : 'Mark done'}
                                </button>
                                <button onClick={() => {
                                    if (confirm('Delete task?')) onDelete(t._id)
                                }} className="px-2 py-1 text-sm border rounded text-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
