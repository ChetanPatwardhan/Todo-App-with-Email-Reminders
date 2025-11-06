import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { getToken, logout } from './auth'

function PrivateRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">Todo App</Link>
          <nav className="space-x-4">
            <Link to="/" className="text-slate-600">Home</Link>
            {getToken() ? (
              <>
                <button
                  onClick={() => { logout(); window.location.href = '/login' }}
                  className="text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600">Login</Link>
                <Link to="/signup" className="text-slate-600">Signup</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        </Routes>
      </main>
    </div>
  )
}
