import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';
// Removed import - using simple direct upload
import { FaUniversity, FaEye, FaEyeSlash, FaUpload, FaCheck } from 'react-icons/fa';

function CollegeSignup() {
    const navigate = useNavigate();
    
    // Form state with prefilled test data
    const [formData, setFormData] = useState({
        collegeName: 'Lahore University of Technology',
        email: 'test@lutech.edu.pk',
        password: 'password123',
        phone: '042-1234567',
        address: '123 University Road, Johar Town',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan', // Default country
        postalCode: '54782',
        establishedYear: '1995',
        type: 'public',
        website: 'https://www.lutech.edu.pk',
        description: 'A leading technology university committed to providing quality education in engineering, computer science, and business administration. We offer undergraduate and graduate programs with modern facilities and experienced faculty.'
    });
    
    // UI state
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    
    // File upload state
    const [logoFile, setLogoFile] = useState(null);
    const [registrationFile, setRegistrationFile] = useState(null);
    const [uploadingFiles, setUploadingFiles] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Simple file upload function for Cloudinary
    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'react_native_uploads');
        
        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/drrr99dz9/image/upload',
                {
                    method: 'POST',
                    body: formData,
                }
            );
            
            if (!response.ok) {
                throw new Error('Upload failed');
            }
            
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.collegeName.trim()) newErrors.collegeName = 'College name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.establishedYear) newErrors.establishedYear = 'Established year is required';
        else if (formData.establishedYear < 1800 || formData.establishedYear > new Date().getFullYear()) {
            newErrors.establishedYear = 'Please enter a valid year';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setUploadingFiles(true);

        try {
            // Step 1: Create Firebase Auth user
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            // Step 2: Upload files to Cloudinary (if provided)
            let logoUrl = '';
            let registrationCertificateUrl = '';

            if (logoFile) {
                logoUrl = await uploadToCloudinary(logoFile);
            }

            if (registrationFile) {
                registrationCertificateUrl = await uploadToCloudinary(registrationFile);
            }

            // Step 3: Save college data to Firestore
            const collegeData = {
                uid: user.uid,
                collegeName: formData.collegeName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                postalCode: formData.postalCode,
                establishedYear: parseInt(formData.establishedYear),
                type: formData.type,
                website: formData.website,
                description: formData.description,
                logoUrl: logoUrl || '', // Use empty string if no logo uploaded
                documents: {
                    registrationCertificateUrl: registrationCertificateUrl || '', // Use empty string if no certificate uploaded
                    affiliationCertificateUrl: '' // Can be added later
                },
                status: 'pending', // Default status
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            // Save to colleges collection using user's UID as document ID
            await setDoc(doc(db, 'colleges', user.uid), collegeData);

            // Step 4: Show success message
            setSuccess(true);
            setUploadingFiles(false);

        } catch (error) {
            console.error('Registration error:', error);
            setErrors({ submit: 'Registration failed. Please try again.' });
        } finally {
            setLoading(false);
            setUploadingFiles(false);
        }
    };

    // If success, show success message
    if (success) {
        return (
            <div style={styles.container}>
                <div style={styles.leftPanel}>
                    <div style={styles.successCard}>
                        <FaCheck size={60} color="#28a745" />
                        <h2 style={styles.successTitle}>Registration Successful!</h2>
                        <p style={styles.successMessage}>
                            Your college registration has been submitted successfully.
                            Please wait for admin approval before you can access the portal.
                        </p>
                        <div style={styles.successActions}>
                            <Link to="/" style={styles.backToLoginBtn}>
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>

                <div style={styles.rightPanel}>
                    <div style={styles.imageContainer}>
                        <img
                            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                            alt="Registration Success"
                            style={styles.backgroundImage}
                        />
                        <div style={styles.overlay}>
                            <h2 style={styles.overlayTitle}>Welcome to Our Network</h2>
                            <p style={styles.overlayText}>
                                Your college has been successfully registered. 
                                Our admin team will review your application shortly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.leftPanel}>
                <div style={styles.loginCard}>
                    {/* Header */}
                    <div style={styles.header}>
                        <FaUniversity size={40} color="#003366" />
                        <h1 style={styles.title}>College Registration</h1>
                        <p style={styles.subtitle}>Register your college with our portal</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={styles.form}>
                        {/* Basic Information */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>Basic Information</h3>
                            
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>College Name *</label>
                                <input
                                    type="text"
                                    name="collegeName"
                                    value={formData.collegeName}
                                    onChange={handleInputChange}
                                    placeholder="Enter college name"
                                    style={{...styles.input, ...(errors.collegeName && styles.inputError)}}
                                    required
                                />
                                {errors.collegeName && <span style={styles.errorText}>{errors.collegeName}</span>}
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter college email"
                                    style={{...styles.input, ...(errors.email && styles.inputError)}}
                                    required
                                />
                                {errors.email && <span style={styles.errorText}>{errors.email}</span>}
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Password *</label>
                                <div style={styles.passwordContainer}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter password"
                                        style={{...styles.passwordInput, ...(errors.password && styles.inputError)}}
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
                                {errors.password && <span style={styles.errorText}>{errors.password}</span>}
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter phone number"
                                    style={{...styles.input, ...(errors.phone && styles.inputError)}}
                                    required
                                />
                                {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
                            </div>
                        </div>

                        {/* Address Information */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>Address Information</h3>
                            
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Address *</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter complete address"
                                    style={{...styles.textarea, ...(errors.address && styles.inputError)}}
                                    rows="3"
                                    required
                                />
                                {errors.address && <span style={styles.errorText}>{errors.address}</span>}
                            </div>

                            <div style={styles.row}>
                                <div style={styles.halfInput}>
                                    <label style={styles.label}>City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="Enter city"
                                        style={{...styles.input, ...(errors.city && styles.inputError)}}
                                        required
                                    />
                                    {errors.city && <span style={styles.errorText}>{errors.city}</span>}
                                </div>
                                <div style={styles.halfInput}>
                                    <label style={styles.label}>State *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        placeholder="Enter state"
                                        style={{...styles.input, ...(errors.state && styles.inputError)}}
                                        required
                                    />
                                    {errors.state && <span style={styles.errorText}>{errors.state}</span>}
                                </div>
                            </div>

                            <div style={styles.row}>
                                <div style={styles.halfInput}>
                                    <label style={styles.label}>Country *</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        placeholder="Enter country"
                                        style={styles.input}
                                        required
                                    />
                                </div>
                                <div style={styles.halfInput}>
                                    <label style={styles.label}>Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        placeholder="Enter postal code"
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* College Details */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>College Details</h3>
                            
                            <div style={styles.row}>
                                <div style={styles.halfInput}>
                                    <label style={styles.label}>Established Year *</label>
                                    <input
                                        type="number"
                                        name="establishedYear"
                                        value={formData.establishedYear}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 1995"
                                        style={{...styles.input, ...(errors.establishedYear && styles.inputError)}}
                                        required
                                    />
                                    {errors.establishedYear && <span style={styles.errorText}>{errors.establishedYear}</span>}
                                </div>
                                <div style={styles.halfInput}>
                                    <label style={styles.label}>Type *</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    >
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                    </select>
                                </div>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Website</label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    placeholder="https://www.yourcollege.com"
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Brief description of your college"
                                    style={styles.textarea}
                                    rows="4"
                                />
                            </div>
                        </div>

                        {/* File Uploads */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>Documents & Logo</h3>
                            
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>College Logo</label>
                                <div style={styles.fileUploadContainer}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setLogoFile(e.target.files[0])}
                                        style={styles.fileInput}
                                        id="logo"
                                    />
                                    <label htmlFor="logo" style={styles.fileUploadBtn}>
                                        <FaUpload /> {logoFile ? logoFile.name : 'Upload Logo'}
                                    </label>
                                </div>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Registration Certificate</label>
                                <div style={styles.fileUploadContainer}>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => setRegistrationFile(e.target.files[0])}
                                        style={styles.fileInput}
                                        id="registration"
                                    />
                                    <label htmlFor="registration" style={styles.fileUploadBtn}>
                                        <FaUpload /> {registrationFile ? registrationFile.name : 'Upload Certificate'}
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        {errors.submit && <span style={styles.errorText}>{errors.submit}</span>}
                        
                        <button
                            type="submit"
                            disabled={loading || uploadingFiles}
                            style={{
                                ...styles.submitButton,
                                opacity: (loading || uploadingFiles) ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Creating Account...' : 
                             uploadingFiles ? 'Uploading Files...' : 
                             'Register College'}
                        </button>
                    </form>

                    {/* Footer */}
                    <div style={styles.footer}>
                        <p style={styles.loginText}>
                            Already have an account?{' '}
                            <Link to="/" style={styles.loginLink}>
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div style={styles.rightPanel}>
                <div style={styles.imageContainer}>
                    <img
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="College Registration"
                        style={styles.backgroundImage}
                    />
                    <div style={styles.overlay}>
                        <h2 style={styles.overlayTitle}>Join Our Network</h2>
                        <p style={styles.overlayText}>
                            Register your college to start managing applications,
                            courses, and student information efficiently.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Professional styles matching college login page layout
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
        overflowY: 'auto',
    },
    loginCard: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '600px',
        border: '2px solid #003366',
        maxHeight: '90vh',
        overflowY: 'auto',
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
    section: {
        borderBottom: '1px solid #e1e5e9',
        paddingBottom: '20px',
        marginBottom: '20px',
    },
    sectionTitle: {
        color: '#003366',
        fontSize: '18px',
        fontWeight: '600',
        margin: '0 0 15px 0',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        marginBottom: '15px',
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
    inputError: {
        borderColor: '#dc3545',
    },
    textarea: {
        padding: '12px 16px',
        border: '2px solid #e1e5e9',
        borderRadius: '8px',
        fontSize: '16px',
        transition: 'border-color 0.3s ease',
        outline: 'none',
        resize: 'vertical',
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
    row: {
        display: 'flex',
        gap: '15px',
    },
    halfInput: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    fileUploadContainer: {
        position: 'relative',
    },
    fileInput: {
        position: 'absolute',
        opacity: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
    },
    fileUploadBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        border: '2px dashed #003366',
        borderRadius: '8px',
        backgroundColor: '#f8f9ff',
        color: '#003366',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.3s ease',
    },
    submitButton: {
        backgroundColor: '#003366',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '14px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '20px',
    },
    errorText: {
        color: '#dc3545',
        fontSize: '12px',
        marginTop: '2px',
    },
    footer: {
        marginTop: '30px',
        textAlign: 'center',
        paddingTop: '20px',
        borderTop: '1px solid #e1e5e9',
    },
    loginText: {
        color: '#666',
        fontSize: '14px',
        margin: '0',
    },
    loginLink: {
        color: '#003366',
        textDecoration: 'none',
        fontWeight: '500',
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
    // Success page styles - matching login layout
    successCard: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        padding: '60px 40px',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        border: '2px solid #28a745',
    },
    successTitle: {
        color: '#28a745',
        fontSize: '28px',
        fontWeight: 'bold',
        margin: '20px 0 15px 0',
    },
    successMessage: {
        color: '#666',
        fontSize: '16px',
        lineHeight: '1.6',
        margin: '0 0 30px 0',
    },
    successActions: {
        display: 'flex',
        justifyContent: 'center',
    },
    backToLoginBtn: {
        backgroundColor: '#003366',
        color: 'white',
        textDecoration: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'background-color 0.3s ease',
    },
};

export default CollegeSignup;
