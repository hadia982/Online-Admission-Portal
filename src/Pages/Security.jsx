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
import { FaEye } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaChrome, FaSafari, FaFirefox } from "react-icons/fa";
import { MdPhoneAndroid } from "react-icons/md";
import { MdOutlineWarningAmber } from "react-icons/md";
function Security() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

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
                    <h2 style={{ color: "white", margin: 0 }}>Course Management</h2>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center", marginLeft: "auto" }}>


                    </div>
                </div>
                <div style={{ height: 565, width: 1115, backgroundColor: 'white' }}>
                    <div style={{ height: 330, width: 1115, backgroundColor: 'white', display: 'flex', gap: '30px' }}>
                        <div style={{ height: 300, width: 440, backgroundColor: '#D9D9D9', border: "2px solid grey", borderRadius: 10, padding: "5px", justifyContent: "space-between", marginLeft: 22, marginTop: 9, display: 'flex', flexDirection: "column" }}>



                            <div style={{ height: 30, width: 430, backgroundColor: "white" }}><PiKeyLight size={20} color="black" style={{ marginTop: "1px" }} />Change Password</div>
                            <div style={{ height: 600, width: 430, backgroundColor: '#D9D9D9', marginTop: '10px' }}>
                                <div style={{
                                    height: 60, width: 430, backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <h3 style={{ margin: 0 }}>Current password</h3>
                                    <div style={{
                                        display: "flex", alignItems: "center", border: "1px solid grey", borderRadius: "10px", padding: "2px 8px", width: "300px", backgroundColor: "white"
                                    }}>
                                        <input type="password" placeholder="Enter Current password"
                                            style={{ flex: 1, border: "none", outline: "none" }} />
                                        <FaEye size={18} style={{ cursor: "pointer" }} />
                                    </div>
                                </div>
                                <div style={{
                                    height: 60, width: 430, backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <h3 style={{ margin: 0 }}>Current password</h3>
                                    <div style={{
                                        display: "flex", alignItems: "center", border: "1px solid grey", borderRadius: "10px", padding: "2px 8px", width: "300px", backgroundColor: "white"
                                    }}>
                                        <input type="password" placeholder="Enter Current password"
                                            style={{ flex: 1, border: "none", outline: "none" }} />
                                        <FaEye size={18} style={{ cursor: "pointer" }} />
                                    </div>
                                </div>
                                <div style={{
                                    height: 60, width: 430, backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <h3 style={{ margin: 0 }}>Current password</h3>
                                    <div style={{
                                        display: "flex", alignItems: "center", border: "1px solid grey", borderRadius: "10px", padding: "2px 8px", width: "300px", backgroundColor: "white"
                                    }}>
                                        <input type="password" placeholder="Enter Current password"
                                            style={{ flex: 1, border: "none", outline: "none" }} />
                                        <FaEye size={18} style={{ cursor: "pointer" }} />
                                    </div>
                                </div>
                                <div style={{ height: 60, width: 430, backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <button
                                        style={{ backgroundColor: "darkblue", color: "white", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 200 }}>Update password
                                    </button>

                                </div>
                            </div>

                        </div>
                        <div style={{ height: 300, width: 440, backgroundColor: '#D9D9D9', border: "2px solid grey", borderRadius: 10, padding: "5px", justifyContent: "space-between", marginLeft: 22, marginTop: 9, display: 'flex', flexDirection: "column" }}>
                            <div style={{ height: 30, width: 430, backgroundColor: "white" }}><FaHistory size={20} color="black" style={{ marginTop: "1px" }} />Recent login activity
                            </div>
                            <div style={{ height: 600, width: 430, backgroundColor: '#D9D9D9', marginTop: '10px', }}>

                                <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", backgroundColor: "white", borderRadius: "8px", width: 430, height: 70, marginBottom: "10px", }}>
                                    <div style={{ display: 'flex', alignItems: "center", gap: "10px", marginLeft: "10px" }}>
                                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "green" }}>

                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0, color: "black" }}>Chrome on Windows</h4>
                                            <p style={{ margin: 0, color: "grey", fontSize: "13px" }}>New York, US</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right", marginRight: "15px" }}>
                                        <h5 style={{ margin: 0, fontSize: "13px", color: "black" }}>2024-01-20 14:30</h5>
                                        <span style={{ backgroundColor: "#e6f7e6", color: "green", padding: "2px 8px", borderRadius: "5px", fontSize: "12px" }}>Success
                                        </span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", backgroundColor: "white", borderRadius: "8px", width: 430, height: 70, marginBottom: "10px", }}>
                                    <div style={{ display: 'flex', alignItems: "center", gap: "10px", marginLeft: "10px" }}>
                                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "green" }}>

                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0, color: "black" }}>Chrome on Windows</h4>
                                            <p style={{ margin: 0, color: "grey", fontSize: "13px" }}>New York, US</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right", marginRight: "15px" }}>
                                        <h5 style={{ margin: 0, fontSize: "13px", color: "black" }}>2024-01-20 14:30</h5>
                                        <span style={{ backgroundColor: "#e6f7e6", color: "green", padding: "2px 8px", borderRadius: "5px", fontSize: "12px" }}>Success
                                        </span>
                                    </div>
                                </div>


                                <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", backgroundColor: "white", borderRadius: "8px", width: 430, height: 70, marginBottom: "10px", }}>
                                    <div style={{ display: 'flex', alignItems: "center", gap: "10px", marginLeft: "10px" }}>
                                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "green" }}>

                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0, color: "black" }}>Chrome on Windows</h4>
                                            <p style={{ margin: 0, color: "grey", fontSize: "13px" }}>New York, US</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right", marginRight: "15px" }}>
                                        <h5 style={{ margin: 0, fontSize: "13px", color: "black" }}>2024-01-20 14:30</h5>
                                        <span style={{ backgroundColor: "#e6f7e6", color: "green", padding: "2px 8px", borderRadius: "5px", fontSize: "12px" }}>Success
                                        </span>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                    <div style={{width:1150, height:220, backgroundColor:'white', display:"flex", flexDirection:"row"}}>
                    <div style={{ width: "460px",height:105, backgroundColor: '#7ab9f7ff', borderRadius: "10px",  marginBottom: "20px", marginTop:'20px', marginLeft:"20px"}}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                            <MdPhoneAndroid size={18} color="green" /><h4 style={{ margin: 0, fontSize: "15px", fontWeight: "bold", color: "#003366" }}>
                                Two-Factor Authentication
                            </h4>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginLeft:"10px", backgroundColor: "#ffffffff", borderRadius: "8px", padding: "12px 15px", width:"410px",  }}>
                            <div>
                                <h5 style={{ margin: 0, fontSize: "14px", color: "black" }}>SMS Authentication</h5>
                                <p style={{ margin: 0, fontSize: "12px", color: "grey" }}>
                                    Add an extra layer of security to your account
                                </p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <input type="checkbox" disabled style={{ width: "15px", height: "15px" }} />
                                <span style={{ fontSize: "13px", color: "grey" }}>Disabled</span>
                            </div>
                        </div>
                    </div>
                        <div style={{ width: "440px",height:220, backgroundColor: '#7ab9f7ff', borderRadius: "10px", boxShadow: "0px 2px 6px rgba(0,0,0,0.1)", marginBottom: "20px", marginLeft:"55px" }}>

                            {/* Heading */}
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                                <MdOutlineWarningAmber size={18} color="green" />
                                <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "bold", color: "#003366" }}>
                                    Security Tips
                                </h4>
                            </div>

                            {/* Strong Passwords */}
                            <div style={{ backgroundColor: "#fff", padding: "12px", borderRadius: "8px", marginBottom: "10px", width:"395px", marginLeft:"10px" }}>
                                <h5 style={{ margin: 0, fontSize: "14px", color: "#003366", fontWeight: "bold" }}>Strong Passwords</h5>
                                <p style={{ margin: 0, fontSize: "12px", color: "grey" }}>
                                    Use a combination of letters, numbers, and symbols. Avoid common words or personal information.
                                </p>
                            </div>

                            {/* Two-Factor Auth */}
                            <div style={{ backgroundColor: "white", padding: "12px", borderRadius: "8px", width:"395px", marginLeft:"10px" }}>
                                <h5 style={{ margin: 0, fontSize: "14px", color: "#003366", fontWeight: "bold" }}>Two-Factor Authentication</h5>
                                <p style={{ margin: 0, fontSize: "12px", color: "grey" }}>
                                    Enable two-factor authentication for an additional layer of security on your account.
                                </p>
                            </div>
                    </div>
                        
                    </div>




                </div>
            </div>


        </div>
    )
}

export default Security