import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleSignUp } from '../Helper/firebaseHelper';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Slices/HomeDataSlice';
import { FaShieldAlt, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';

function AdminSignup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        organization: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            alert("Please fill in all required fields");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return false;
        }

        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters long");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address");
            return false;
        }

        return true;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const extraData = {
                fName: formData.name.split(' ')[0] || formData.name,
                lName: formData.name.split(' ').slice(1).join(' ') || '',
                phone: formData.phone,
                organization: formData.organization,
                role: 'admin',
                status: 'active',
                createdAt: new Date().toISOString()
            };

            const userData = await handleSignUp(formData.email, formData.password, extraData);
            
            // User data already includes role from extraData
            dispatch(setUser(userData));
            
            alert("Admin account created successfully!");
            navigate("/admin-dashboard");
        } catch (error) {
            let errorMessage = "Signup failed. Please try again.";
            
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email is already registered. Please use a different email or try logging in.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Password is too weak. Please choose a stronger password.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Please enter a valid email address.";
            }
            
            alert(errorMessage);
            console.error("Signup error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftPanel}>
                <div style={styles.signupCard}>
                    {/* Header */}
                    <div style={styles.header}>
                        <FaShieldAlt size={40} color="#dc3545" />
                        <h1 style={styles.title}>Admin Registration</h1>
                        <p style={styles.subtitle}>Create your administrative account</p>
                    </div>

                    {/* Signup Form */}
                    <form onSubmit={handleSignup} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                <FaUser style={styles.icon} /> Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                style={styles.input}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                <FaEnvelope style={styles.icon} /> Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter admin email"
                                style={styles.input}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                <FaPhone style={styles.icon} /> Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter phone number"
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                <FaBuilding style={styles.icon} /> Organization
                            </label>
                            <input
                                type="text"
                                name="organization"
                                value={formData.organization}
                                onChange={handleInputChange}
                                placeholder="Enter organization name"
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password *</label>
                            <div style={styles.passwordContainer}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter password (min 6 characters)"
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

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Confirm Password *</label>
                            <div style={styles.passwordContainer}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm your password"
                                    style={styles.passwordInput}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={styles.eyeButton}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                ...styles.signupButton,
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Creating Account...' : 'Create Admin Account'}
                        </button>
                    </form>

                    {/* Footer */}
                    <div style={styles.footer}>
                        <p style={styles.loginText}>
                            Already have an admin account?{' '}
                            <Link to="/admin" style={styles.loginLink}>
                                Sign In
                            </Link>
                        </p>
                        <div style={styles.backLink}>
                            <Link to="/" style={styles.backLinkText}>
                                ← Back to College Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div style={styles.rightPanel}>
                <div style={styles.imageContainer}>
                    <img
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="Admin Registration"
                        style={styles.backgroundImage}
                    />
                    <div style={styles.overlay}>
                        <h2 style={styles.overlayTitle}>Join as Admin</h2>
                        <p style={styles.overlayText}>
                            Create your administrative account to access powerful tools
                            for managing the college portal system.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Admin signup specific styles
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
    signupCard: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '450px',
        border: '2px solid #dc3545',
    },
    header: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    title: {
        color: '#dc3545',
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
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    icon: {
        fontSize: '14px',
        color: '#dc3545',
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
    signupButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '14px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '10px',
    },
    footer: {
        marginTop: '30px',
        textAlign: 'center',
    },
    loginText: {
        color: '#666',
        fontSize: '14px',
        margin: '0 0 15px 0',
    },
    loginLink: {
        color: '#dc3545',
        textDecoration: 'none',
        fontWeight: '600',
    },
    backLink: {
        marginTop: '15px',
        paddingTop: '15px',
        borderTop: '1px solid #e1e5e9',
    },
    backLinkText: {
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
        background: 'linear-gradient(135deg, rgba(220, 53, 69, 0.8), rgba(220, 53, 69, 0.6))',
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

export default AdminSignup;
