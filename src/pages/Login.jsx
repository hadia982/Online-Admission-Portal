import React, { useState } from 'react'

import { FaEnvelope, FaLock, FaUniversity, FaUserShield } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/Slices/HomeDataSlice";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { loginWithFBase } from "../Helper/firebaseHelper";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("admin"); // 'admin' or 'college'
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // 1. Authenticate user with Firebase Auth
            const userCredential = await loginWithFBase(email, password);
            const user = userCredential;

            // 2. Determine the collection based on the selected role
            const collectionName = role === 'admin' ? 'admins' : 'colleges';
            const docRef = doc(db, collectionName, user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();

                // 3. For colleges, check if their status is 'approved'
                if (role === 'college' && userData.status !== 'approved') {
                    setError('Your registration is pending approval. You cannot log in yet.');
                    setLoading(false);
                    return;
                }

                // 4. Dispatch user data to Redux store
                dispatch(setUser({ ...userData, role }));
            } else {
                setError(`No ${role} profile found for this user.`);
            }

        } catch (err) {
            setError("Failed to login. Please check your credentials.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h2 style={styles.title}>
                    {role === 'admin' ? <FaUserShield style={{ marginRight: "10px" }} /> : <FaUniversity style={{ marginRight: "10px" }} />}
                    {role === 'admin' ? 'Admin' : 'College'} Login
                </h2>
                <p style={styles.subtitle}>Welcome back! Please enter your credentials.</p>


                <form onSubmit={handleSubmit}>
                    {/* Role Selector */}
                    <select 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        style={styles.input}
                    >
                        <option value="admin">Login as Admin</option>
                        <option value="college">Login as College</option>
                    </select>

                    {/* Email Input */}
                    <div style={styles.inputGroup}>
                        <FaEnvelope style={styles.icon} />
                        <input
                            type="email"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.inputField}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div style={styles.inputGroup}>
                        <FaLock style={styles.icon} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.inputField}
                            required
                        />
                    </div>

                    {error && <p style={styles.errorText}>{error}</p>}

                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </form>

                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <p>Don't have a college account? 
                        <Link to="/Clgsignup" style={styles.link}> Register here</Link>
                    </p>
                </div>
            </div>
            <div style={{ height: 432, width: 611, backgroundColor: " #3b72aaff", marginLeft: 500, marginTop: -538, padding: '20px' }}>
                <img src="https://www.marketing91.com/wp-content/uploads/2020/10/Study-Skills.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
            </div>
        </div>

    )
}

export default Login