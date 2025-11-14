import React, { useState } from 'react';
import { auth } from '../../firebase'; // use your firebase auth export; or replace with getAuth()
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { Link } from 'react-router-dom'
import { PiKeyLight } from "react-icons/pi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Security() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const clearStatus = () => { setMessage(''); setError(''); };

    const handleChangePassword = async (e) => {
      e.preventDefault();
      clearStatus();

      if (!currentPassword || !newPassword || !confirmPassword) {
        setError('Fill all fields.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('New password and confirmation do not match.');
        return;
      }
      if (newPassword.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }

      const user = auth.currentUser;
      if (!user || !user.email) {
        setError('No authenticated user. Please login again.');
        return;
      }

      setLoading(true);
      try {
        // Re-authenticate
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // Update password
        await updatePassword(user, newPassword);
        setMessage('Password changed successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } catch (err) {
        console.error('Change password error:', err);
        // Common errors: auth/wrong-password, auth/too-many-requests, auth/requires-recent-login
        setError(err.code ? `${err.code} - ${err.message}` : String(err));
      } finally {
        setLoading(false);
      }
    };

    // Alternative: send password reset email if user forgot current password
    const handleSendReset = async () => {
      clearStatus();
      const user = auth.currentUser;
      if (!user || !user.email) {
        setError('No authenticated user to send reset email for.');
        return;
      }
      setLoading(true);
      try {
        await sendPasswordResetEmail(auth, user.email);
        setMessage('Password reset email sent to ' + user.email);
      } catch (err) {
        console.error('Send reset email error:', err);
        setError(err.code ? `${err.code} - ${err.message}` : String(err));
      } finally {
        setLoading(false);
      }
    };

    return (
        <div>
            <Link to="/StdMg"></Link>
            <a href="StdMg"></a>
            <div style={{ height: 630, width: 1120, backgroundColor: 'white' }}>
                <div style={{ height: 60, width: 1120, backgroundColor: "#003366", display: "flex", gap: 10 }}>
                    <h2 style={{ color: "white", margin: 0 }}>Password</h2>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center", marginLeft: "auto" }}>


                    </div>
                </div>
                <div style={{ height: 565, width: 1115, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ height: 'auto', width: 440, backgroundColor: '#D9D9D9', border: "2px solid grey", borderRadius: 10, padding: "5px", display: 'flex', flexDirection: "column" }}>



                            <div style={{ height: 30, width: 430, backgroundColor: "white" }}><PiKeyLight size={20} color="black" style={{ marginTop: "1px" }} />Change Password</div>
                            <form onSubmit={handleChangePassword} style={{ height: 'auto', width: 430, backgroundColor: '#D9D9D9', marginTop: '10px' }}>
                                <div style={{
                                    height: 60, width: 430, backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <h3 style={{ margin: 0 }}>Current password</h3>
                                    <div style={{
                                        display: "flex", alignItems: "center", border: "1px solid grey", borderRadius: "10px", padding: "2px 8px", width: "300px", backgroundColor: "white"
                                    }}>
                                        <input type={showCurrent ? "text" : "password"} placeholder="Enter Current password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            style={{ flex: 1, border: "none", outline: "none" }} />
                                        {showCurrent ? (
                                            <FaEyeSlash size={18} style={{ cursor: "pointer" }} onClick={() => setShowCurrent(false)} />
                                        ) : (
                                            <FaEye size={18} style={{ cursor: "pointer" }} onClick={() => setShowCurrent(true)} />
                                        )}
                                    </div>
                                </div>
                                <div style={{
                                    height: 60, width: 430, backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <h3 style={{ margin: 0 }}>New password</h3>
                                    <div style={{
                                        display: "flex", alignItems: "center", border: "1px solid grey", borderRadius: "10px", padding: "2px 8px", width: "300px", backgroundColor: "white"
                                    }}>
                                        <input type={showNew ? "text" : "password"} placeholder="Enter New password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            style={{ flex: 1, border: "none", outline: "none" }} />
                                        {showNew ? (
                                            <FaEyeSlash size={18} style={{ cursor: "pointer" }} onClick={() => setShowNew(false)} />
                                        ) : (
                                            <FaEye size={18} style={{ cursor: "pointer" }} onClick={() => setShowNew(true)} />
                                        )}
                                    </div>
                                </div>
                                <div style={{
                                    height: 60, width: 430, backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <h3 style={{ margin: 0 }}>Confirm password</h3>
                                    <div style={{
                                        display: "flex", alignItems: "center", border: "1px solid grey", borderRadius: "10px", padding: "2px 8px", width: "300px", backgroundColor: "white"
                                    }}>
                                        <input type={showConfirm ? "text" : "password"} placeholder="Confirm New password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            style={{ flex: 1, border: "none", outline: "none" }} />
                                        {showConfirm ? (
                                            <FaEyeSlash size={18} style={{ cursor: "pointer" }} onClick={() => setShowConfirm(false)} />
                                        ) : (
                                            <FaEye size={18} style={{ cursor: "pointer" }} onClick={() => setShowConfirm(true)} />
                                        )}
                                    </div>
                                </div>
                                <div style={{ height: 60, width: 430, backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <button type="submit" disabled={loading}
                                        style={{ backgroundColor: "darkblue", color: "white", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 200 }}>{loading ? 'Updating...' : 'Update password'}
                                    </button>
                                    {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
                                    {message && <div style={{ color: 'green', fontSize: '12px' }}>{message}</div>}
                                </div>
                            </form>

                        </div>
                    </div>
                    




                </div>
            </div>


        // </div>
    )
}

export default Security