import React, { useState } from 'react'
import api from '../api'
import { saveAuth } from '../auth'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const nav = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [err, setErr] = useState('')

    async function submit(e) {
        e.preventDefault()
        setErr('')
        try {
            const res = await api.post('/auth/signup', { email, password, name })
            saveAuth(res.data.token, res.data.user)
            nav('/')
        } catch (err) {
            setErr(err?.response?.data?.message || 'Signup failed')
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Signup</h2>
            {err && <div className="text-red-600 mb-2">{err}</div>}
            <form onSubmit={submit} className="space-y-3">
                <input className="w-full p-2 border rounded" placeholder="Name (optional)" value={name} onChange={e => setName(e.target.value)} />
                <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="w-full py-2 bg-green-600 text-white rounded">Create account</button>
            </form>
            <div className="mt-3 text-sm">
                Already have an account? <Link to="/login" className="text-blue-600">Log in</Link>
            </div>
        </div>
    )
}
