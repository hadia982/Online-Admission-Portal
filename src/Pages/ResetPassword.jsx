import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { auth } from '../../firebase'
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth'
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'

export default function ResetPassword() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useMemo(() => new URLSearchParams(location.search), [location.search])
  const oobCode = params.get('oobCode') || ''
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    if (!oobCode) {
      setError('Invalid or missing reset code.')
      setLoading(false)
      return
    }
    verifyPasswordResetCode(auth, oobCode)
      .then((userEmail) => {
        setEmail(userEmail || '')
      })
      .catch(() => {
        setError('This reset link is invalid or has expired.')
      })
      .finally(() => setLoading(false))
  }, [oobCode])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!password || !confirm) {
      setError('Please enter and confirm your new password.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    try {
      await confirmPasswordReset(auth, oobCode, password)
      setSuccess('Password updated successfully. You can now sign in.')
    } catch (err) {
      let msg = 'Failed to reset password.'
      if (err.code === 'auth/expired-action-code') msg = 'Reset link has expired.'
      if (err.code === 'auth/invalid-action-code') msg = 'Invalid reset code.'
      setError(msg)
    }
  }

  if (loading) return <div style={{ padding: 20 }}>Verifying reset link...</div>

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        {email && <p style={styles.subtitle}>Account: {email}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>New Password</label>
            <div style={styles.inputWithIcon}>
              <FaLock style={styles.inputIcon} />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                style={styles.input}
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={styles.eyeButton}>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm New Password</label>
            <div style={styles.inputWithIcon}>
              <FaLock style={styles.inputIcon} />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm new password"
                style={styles.input}
                required
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={styles.eyeButton}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" style={styles.button}>Update Password</button>
        </form>

        {error && <div style={styles.error}>{error}</div>}
        {success && (
          <div style={styles.success}>
            {success} <Link to="/" style={styles.link}>Go to Login</Link>
          </div>
        )}

        <div style={styles.footerActions}>
          <Link to="/" style={styles.link}>Back to Login</Link>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8f9fa', padding: 20 },
  card: { width: 420, backgroundColor: 'white', border: '1px solid #e1e5e9', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', margin: '0 0 8px 0', color: '#003366' },
  subtitle: { fontSize: 14, color: '#666', margin: '0 0 16px 0' },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: 8 },
  label: { fontSize: 14, color: '#333' },
  inputWithIcon: { position: 'relative' },
  inputIcon: { position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#666' },
  input: { width: '100%', padding: '12px 45px 12px 40px', border: '2px solid #e1e5e9', borderRadius: 8, fontSize: 16, outline: 'none' },
  eyeButton: { position: 'absolute', right: 12, background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 16 },
  button: { backgroundColor: '#003366', color: 'white', border: 'none', borderRadius: 8, padding: '12px', fontSize: 16, fontWeight: '600', cursor: 'pointer' },
  error: { marginTop: 12, color: '#dc3545', fontSize: 13 },
  success: { marginTop: 12, color: '#28a745', fontSize: 13 },
  footerActions: { marginTop: 16, textAlign: 'center' },
  link: { color: '#003366', textDecoration: 'none', fontWeight: '500' }
}