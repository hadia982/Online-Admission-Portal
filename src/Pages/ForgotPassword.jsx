import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { FaEnvelope } from 'react-icons/fa'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(value).toLowerCase())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }
    if (!validateEmail(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/reset-password`,
        handleCodeInApp: true
      }
      await sendPasswordResetEmail(auth, email.trim(), actionCodeSettings)
      setMessage('Reset link sent. Check your inbox for instructions.')
    } catch (err) {
      let msg = 'Failed to send reset email.'
      if (err.code === 'auth/user-not-found') msg = 'No account found with this email.'
      if (err.code === 'auth/invalid-email') msg = 'Invalid email address.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>
        <p style={styles.subtitle}>Enter your email to receive a reset link.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputWithIcon}>
              <FaEnvelope style={styles.inputIcon} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={styles.input}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {error && <div style={styles.error}>{error}</div>}
        {message && <div style={styles.success}>{message}</div>}

        <div style={styles.footerActions}>
          <Link to="/" style={styles.link}>Back to Login</Link>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa'
  },
  card: {
    width: 420, backgroundColor: 'white', border: '1px solid #e1e5e9', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24
  },
  title: { fontSize: 24, fontWeight: '700', margin: '0 0 8px 0', color: '#003366' },
  subtitle: { fontSize: 14, color: '#666', margin: '0 0 16px 0' },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: 8 },
  label: { fontSize: 14, color: '#333' },
  inputWithIcon: { position: 'relative' },
  inputIcon: { position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#666' },
  input: { width: '100%', boxSizing: 'border-box', padding: '12px 12px 12px 40px', border: '2px solid #e1e5e9', borderRadius: 8, fontSize: 16, outline: 'none' },
  button: { width: '100%', backgroundColor: '#003366', color: 'white', border: 'none', borderRadius: 8, padding: '12px', fontSize: 16, fontWeight: '600', cursor: 'pointer' },
  error: { marginTop: 12, color: '#dc3545', fontSize: 13 },
  success: { marginTop: 12, color: '#28a745', fontSize: 13 },
  footerActions: { marginTop: 16, textAlign: 'center' },
  link: { color: '#003366', textDecoration: 'none', fontWeight: '500' }
}