import React, { useState } from 'react'
import api from '../api'
import { saveAuth } from '../auth'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const nav = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')

    async function submit(e) {
        e.preventDefault()
        setErr('')
        try {
            const res = await api.post('/auth/login', { email, password })
            saveAuth(res.data.token, res.data.user)
            nav('/')
        } catch (err) {
            setErr(err?.response?.data?.message || 'Login failed')
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            {err && <div className="text-red-600 mb-2">{err}</div>}
            <form onSubmit={submit} className="space-y-4">
                <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
            </form>
            <div className="mt-4 text-sm">
                Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link>
            </div>
        </div>
    )
}
