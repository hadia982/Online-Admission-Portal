import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginWithFBase, getCollegeByUID } from '../Helper/firebaseHelper';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
// import { setUser } from '../redux/Slices/userSlice'; // adjust path if different
import { FaUniversity, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { setUser } from '../redux/Slices/HomeDataSlice';
import { db } from '../../firebase';


function CollegeLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("c1@lutech.edu.pk");
    const [password, setPassword] = useState("password123");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = async (e) => {


        e.preventDefault();
        
        if (!email || !password) {
            
            alert("Please enter both email and password");
            return;
        }


        console.log(email, password);
        

        setLoading(true);
        try {
            const userCred = await loginWithFBase(email, password);

            console.log("userCred:", userCred);
            
            const uid = userCred.uid;

            alert (uid )

            // console.log("userCred:", userCred);
            

            // fetch user profile from Firestore (so you have college details stored)
            const userDocRef = doc(db, 'colleges', uid);
            const userSnap = await getDoc(userDocRef);
            const profile = userSnap.exists() ? userSnap.data() : {};

            // Check if college is approved
            const collegeData = await getCollegeByUID(uid);
            
            if (!collegeData) {
                alert("College not found. Please register first.");
                return;
            }
            
            if (collegeData.status === 'pending') {
                alert("Your college registration is pending approval from admin. Please wait for approval.");
                return;
            }
            
            if (collegeData.status === 'rejected') {
                alert("Your college registration has been rejected. Please contact admin for more information.");
                return;
            }
            
            // College is approved, proceed with login - store in redux with uid
            const userWithRole = { 
                uid: uid, 
                ...collegeData,
                role: 'college'
            };
            dispatch(setUser(userWithRole));
            navigate("/ClgDashboard");
        } catch (error) {
            alert("Login failed. Please check your credentials.");
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = () => {
        navigate("/Signup");
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftPanel}>
                <div style={styles.loginCard}>
                    {/* Header */}
                    <div style={styles.header}>
                        <FaUniversity size={40} color="#003366" />
                        <h1 style={styles.title}>College Portal</h1>
                        <p style={styles.subtitle}>Sign in to your college account</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                style={styles.input}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password</label>
                            <div style={styles.passwordContainer}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    style={styles.passwordInput}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={styles.eyeButton}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div style={styles.forgotPassword}>
                            <Link to="/forgot-password" style={styles.forgotLink}>
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                ...styles.loginButton,
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Footer */}
                    <div style={styles.footer}>
                        <p style={styles.signupText}>
                            Don't have an account?{' '}
                            <Link to="/Signup" style={styles.signupLink}>
                                Sign up here
                            </Link>
                        </p>
                        <div style={styles.adminLink}>
                            <Link to="/admin" style={styles.adminLinkText}>
                                Admin Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div style={styles.rightPanel}>
                <div style={styles.imageContainer}>
                    <img
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="College Campus"
                        style={styles.backgroundImage}
                    />
                    <div style={styles.overlay}>
                        <h2 style={styles.overlayTitle}>Welcome to College Portal</h2>
                        <p style={styles.overlayText}>
                            Manage your college applications, courses, and student information
                            in one convenient platform.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Clean and professional styles - matching admin login layout with blue theme
const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
    },
    leftPanel: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: '20px',
    },
    loginCard: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        border: '2px solid #003366', // Blue border instead of red
    },
    header: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    title: {
        color: '#003366',
        fontSize: '28px',
        fontWeight: 'bold',
        margin: '10px 0 5px 0',
    },
    subtitle: {
        color: '#666',
        fontSize: '14px',
        margin: '0',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    label: {
        color: '#333',
        fontSize: '14px',
        fontWeight: '500',
    },
    input: {
        padding: '12px 16px',
        border: '2px solid #e1e5e9',
        borderRadius: '8px',
        fontSize: '16px',
        transition: 'border-color 0.3s ease',
        outline: 'none',
    },
    passwordContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    passwordInput: {
        padding: '12px 45px 12px 16px',
        border: '2px solid #e1e5e9',
        borderRadius: '8px',
        fontSize: '16px',
        width: '100%',
        transition: 'border-color 0.3s ease',
        outline: 'none',
    },
    eyeButton: {
        position: 'absolute',
        right: '12px',
        background: 'none',
        border: 'none',
        color: '#666',
        cursor: 'pointer',
        fontSize: '16px',
    },
    forgotPassword: {
        textAlign: 'right',
    },
    forgotLink: {
        color: '#003366',
        textDecoration: 'none',
        fontSize: '14px',
    },
    loginButton: {
        backgroundColor: '#003366',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '14px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    footer: {
        marginTop: '30px',
        textAlign: 'center',
    },
    signupText: {
        color: '#666',
        fontSize: '14px',
        margin: '0 0 15px 0',
    },
    signupLink: {
        color: '#003366',
        textDecoration: 'none',
        fontWeight: '500',
    },
    adminLink: {
        marginTop: '15px',
        paddingTop: '15px',
        borderTop: '1px solid #e1e5e9',
    },
    adminLinkText: {
        color: '#666',
        textDecoration: 'none',
        fontSize: '14px',
    },
    rightPanel: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        height: '100%',
        width: '100%',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(0, 51, 102, 0.8), rgba(0, 51, 102, 0.6))', // Blue overlay
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px',
        color: 'white',
    },
    overlayTitle: {
        fontSize: '36px',
        fontWeight: 'bold',
        margin: '0 0 20px 0',
    },
    overlayText: {
        fontSize: '18px',
        lineHeight: '1.6',
        maxWidth: '500px',
        margin: '0',
    },
};

export default CollegeLogin;