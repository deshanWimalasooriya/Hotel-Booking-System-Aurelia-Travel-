import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './styles/LoginRegister.css'
import axios from 'axios'

export default function Auth(){
  const navigate = useNavigate()
  const { refreshUser } = useUser()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ username: '', email: '', password: '' })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (mode === 'login') {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: form.email,
          password: form.password
        }, {
          withCredentials: true
        })

        console.log('Login successful:', response.data)
        await refreshUser()
        navigate('/profile')
      } else {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          username: form.username,
          email: form.email,
          password: form.password
        }, {
          withCredentials: true
        })

        console.log('Registration successful:', response.data)
        alert('Registration successful! Please login.')
        setMode('login')
        setForm({ username: '', email: '', password: '' })
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">{mode==='login' ? 'Sign in' : 'Create account'}</h2>
          <div className="auth-toggle">
            <button onClick={()=>setMode(mode==='login'?'register':'login')} className="pill">
              {mode==='login' ? 'Create account' : 'Have an account?'}
            </button>
          </div>
        </div>
        <form onSubmit={submit} className="auth-form">
          {mode==='register' && (
            <div className="form-field">
              <label className="form-label">Username</label>
              <input 
                value={form.username} 
                onChange={e=>setForm(f=>({...f, username:e.target.value}))} 
                className="form-input"
                required
              />
            </div>
          )}
          <div className="form-field">
            <label className="form-label">Email</label>
            <input 
              value={form.email} 
              onChange={e=>setForm(f=>({...f, email:e.target.value}))} 
              type="email" 
              required 
              className="form-input" 
            />
          </div>
          <div className="form-field">
            <label className="form-label">Password</label>
            <input 
              value={form.password} 
              onChange={e=>setForm(f=>({...f, password:e.target.value}))} 
              type="password" 
              required 
              className="form-input" 
            />
          </div>
          {error && <div className="auth-error">{error}</div>}
          <div className="auth-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Loading...' : (mode==='login' ? 'Sign in' : 'Create account')}
            </button>
            <button 
              type="button" 
              className="pill" 
              onClick={()=>setForm({ username:'', email:'', password:'' })}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}