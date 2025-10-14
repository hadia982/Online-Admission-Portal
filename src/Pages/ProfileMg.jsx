import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
    doc, 
    updateDoc, 
    getDoc,
    serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../firebase';
import { 
    FaUniversity,
    FaEdit,
    FaSave,
    FaUpload,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaGlobe,
    FaCalendarAlt,
    FaBuilding,
    FaUser,
    FaCheck,
    FaTimes
} from 'react-icons/fa';

function ProfileMg() {
    const user = useSelector((state) => state.home.user);
    const [profileData, setProfileData] = useState({
        collegeName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        establishedYear: '',
        type: 'private',
        website: '',
        description: '',
        logoUrl: '',
        registrationCertificateUrl: '',
        facilities: ['Library', 'Sports Complex', 'Hostel', 'Wi-Fi Campus']
    });
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [registrationFile, setRegistrationFile] = useState(null);
    const [uploadingFiles, setUploadingFiles] = useState(false);

    // Fetch college profile data
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.uid) return;

            try {
                const docRef = doc(db, 'colleges', user.uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProfileData({
                        collegeName: data.collegeName || '',
                        email: data.email || user.email || '',
                        phone: data.phone || '',
                        address: data.address || '',
                        city: data.city || '',
                        state: data.state || '',
                        country: data.country || '',
                        postalCode: data.postalCode || '',
                        establishedYear: data.establishedYear || '',
                        type: data.type || 'private',
                        website: data.website || '',
                        description: data.description || '',
                        logoUrl: data.logoUrl || '',
                        registrationCertificateUrl: data.registrationCertificateUrl || '',
                        facilities: data.facilities || ['Library', 'Sports Complex', 'Hostel', 'Wi-Fi Campus']
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Failed to load profile data');
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user?.uid, user?.email]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    // Handle facility change
    const handleFacilityChange = (index, value) => {
        setProfileData(prev => {
            const facilities = [...prev.facilities];
            facilities[index] = value;
            return { ...prev, facilities };
        });
    };

    // Add a new facility
    const handleAddFacility = () => {
        setProfileData(prev => ({
            ...prev,
            facilities: [...prev.facilities, '']
        }));
    };

    // Remove a facility
    const handleRemoveFacility = (index) => {
        setProfileData(prev => {
            const facilities = prev.facilities.filter((_, i) => i !== index);
            return { ...prev, facilities };
        });
    };

    // Handle file uploads
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (type === 'logo') {
                setLogoFile(file);
            } else if (type === 'registration') {
                setRegistrationFile(file);
            }
        }
    };

    // Upload file to Cloudinary
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            let logoUrl = profileData.logoUrl;
            let registrationCertificateUrl = profileData.registrationCertificateUrl;

            // Upload files if selected
            if (logoFile || registrationFile) {
                setUploadingFiles(true);
                
                if (logoFile) {
                    logoUrl = await uploadToCloudinary(logoFile);
                }
                
                if (registrationFile) {
                    registrationCertificateUrl = await uploadToCloudinary(registrationFile);
                }
                
                setUploadingFiles(false);
            }

            // Update profile in Firestore
            const docRef = doc(db, 'colleges', user.uid);
            await updateDoc(docRef, {
                ...profileData,
                logoUrl,
                registrationCertificateUrl,
                facilities: profileData.facilities,
                updatedAt: serverTimestamp()
            });

            setSuccess(true);
            setEditing(false);
            setLogoFile(null);
            setRegistrationFile(null);
            
            // Hide success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);

        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}>Loading profile...</div>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerContent}>
                        <FaUniversity size={32} color="#003366" />
                        <div>
                            <h1 style={styles.title}>Profile Management</h1>
                            <p style={styles.subtitle}>Manage your college profile information</p>
                        </div>
                    </div>
                    <div style={styles.headerActions}>
                        {!editing ? (
                            <button
                                onClick={() => setEditing(true)}
                                style={styles.editButton}
                            >
                                <FaEdit size={16} />
                                Edit Profile
                            </button>
                        ) : (
                            <div style={styles.editActions}>
                                <button
                                    onClick={() => setEditing(false)}
                                    style={styles.cancelButton}
                                >
                                    <FaTimes size={16} />
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={saving || uploadingFiles}
                                    style={{
                                        ...styles.saveButton,
                                        opacity: (saving || uploadingFiles) ? 0.7 : 1
                                    }}
                                >
                                    <FaSave size={16} />
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Success Message */}
                {success && (
                    <div style={styles.successMessage}>
                        <FaCheck size={16} color="#28a745" />
                        Profile updated successfully! Changes may require admin approval.
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div style={styles.errorMessage}>
                        <FaTimes size={16} color="#dc3545" />
                        {error}
                    </div>
                )}

                {/* Profile Form */}
                <div style={styles.profileContainer}>
                    <form onSubmit={handleSubmit} style={styles.profileForm}>
                        {/* Basic Information */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>
                                <FaBuilding size={20} color="#003366" />
                                Basic Information
                            </h2>
                            
                            <div style={styles.formGrid}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <FaUniversity size={14} />
                                        College Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="collegeName"
                                        value={profileData.collegeName}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        disabled={!editing}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <FaEnvelope size={14} />
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        disabled={!editing}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <FaPhone size={14} />
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        disabled={!editing}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <FaCalendarAlt size={14} />
                                        Established Year
                                    </label>
                                    <input
                                        type="number"
                                        name="establishedYear"
                                        value={profileData.establishedYear}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        disabled={!editing}
                                        min="1800"
                                        max="2024"
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <FaBuilding size={14} />
                                        College Type
                                    </label>
                                    <select
                                        name="type"
                                        value={profileData.type}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        disabled={!editing}
                                    >
                                        <option value="private">Private</option>
                                        <option value="public">Public</option>
                                        <option value="government">Government</option>
                                    </select>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <FaGlobe size={14} />
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={profileData.website}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        disabled={!editing}
                                        placeholder="https://www.college.edu"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>
                                <FaMapMarkerAlt size={20} color="#003366" />
                                Address Information
                            </h2>
                            
                            <div style={styles.formGrid}>
                                <div style={styles.formGroupFull}>
                                    <label style={styles.label}>
                                        <FaMapMarkerAlt size={14} />
                                        Address *
                                    </label>
                                    <textarea
                                        name="address"
                                        value={profileData.address}
                                        onChange={handleInputChange}
                                        style={styles.textarea}
                                        disabled={!editing}
                                        required
                                        rows="3"
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={profileData.city}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        disabled={!editing}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>State *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={profileData.state}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        disabled={!editing}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Country *</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={profileData.country}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        disabled={!editing}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={profileData.postalCode}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        disabled={!editing}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>
                                <FaUser size={20} color="#003366" />
                                College Description
                            </h2>
                            
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Description</label>
                                <textarea
                                    name="description"
                                    value={profileData.description}
                                    onChange={handleInputChange}
                                    style={styles.textarea}
                                    disabled={!editing}
                                    rows="5"
                                    placeholder="Describe your college, its mission, vision, and key features..."
                                />
                            </div>
                        </div>
                            {/* Facilities Section */}
                            <div style={styles.section}>
                                <h2 style={styles.sectionTitle}>
                                    <FaCheck size={20} color="#003366" />
                                    College Facilities
                                </h2>
                                {editing ? (
                                    <div>
                                        {profileData.facilities.map((facility, idx) => (
                                            <div key={idx} style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                                <input
                                                    type="text"
                                                    value={facility}
                                                    onChange={e => handleFacilityChange(idx, e.target.value)}
                                                    style={{fontSize: '16px', padding: '6px', marginRight: '8px', flex: 1}}
                                                />
                                                <button type="button" onClick={() => handleRemoveFacility(idx)} style={{padding: '4px 8px', color: '#fff', background: '#dc3545', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Remove</button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={handleAddFacility} style={{padding: '6px 12px', color: '#fff', background: '#003366', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '8px'}}>Add Facility</button>
                                    </div>
                                ) : (
                                    <ul style={{marginLeft: '20px', fontSize: '16px'}}>
                                        {profileData.facilities.map((facility, idx) => (
                                            <li key={idx}>{facility}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                        {/* File Uploads */}
                        {editing && (
                            <div style={styles.section}>
                                <h2 style={styles.sectionTitle}>
                                    <FaUpload size={20} color="#003366" />
                                    Documents & Images
                                </h2>
                                
                                <div style={styles.formGrid}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <FaUpload size={14} />
                                            College Logo
                                        </label>
                                        <div style={styles.fileUploadContainer}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, 'logo')}
                                                style={styles.fileInput}
                                            />
                                            <div style={styles.fileUploadButton}>
                                                <FaUpload size={16} />
                                                {logoFile ? 'Change Logo' : 'Upload Logo'}
                                            </div>
                                        </div>
                                        {profileData.logoUrl && (
                                            <div style={styles.currentFile}>
                                                <img 
                                                    src={profileData.logoUrl} 
                                                    alt="Current Logo" 
                                                    style={styles.currentImage}
                                                />
                                                <span>Current Logo</span>
                                            </div>
                                        )}
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <FaUpload size={14} />
                                            Registration Certificate
                                        </label>
                                        <div style={styles.fileUploadContainer}>
                                            <input
                                                type="file"
                                                accept="image/*,.pdf"
                                                onChange={(e) => handleFileChange(e, 'registration')}
                                                style={styles.fileInput}
                                            />
                                            <div style={styles.fileUploadButton}>
                                                <FaUpload size={16} />
                                                {registrationFile ? 'Change Certificate' : 'Upload Certificate'}
                                            </div>
                                        </div>
                                        {profileData.registrationCertificateUrl && (
                                            <div style={styles.currentFile}>
                                                <span>✓ Registration Certificate Uploaded</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Upload Progress */}
                        {uploadingFiles && (
                            <div style={styles.uploadProgress}>
                                <div style={styles.spinner}></div>
                                Uploading files...
                            </div>
                        )}
                    </form>
                </div>

                {/* Info Notice */}
                <div style={styles.notice}>
                    <FaCheck size={16} color="#28a745" />
                    <span>Profile updates may require admin approval before being visible to students.</span>
                </div>
            </div>
        </div>
    );
}

// Modern styles for the profile management page
const styles = {
    wrapper: {
        width: '100%',
        minHeight: '100vh',
        overflow: 'auto',
    },
    container: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        width: '100%',
        maxWidth: 'none',
        overflowX: 'hidden',
        boxSizing: 'border-box',
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    loadingSpinner: {
        fontSize: '18px',
        color: '#003366',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
    },
    headerContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    title: {
        color: '#003366',
        fontSize: '28px',
        fontWeight: 'bold',
        margin: '0',
    },
    subtitle: {
        color: '#666',
        fontSize: '14px',
        margin: '0',
    },
    headerActions: {
        display: 'flex',
        gap: '10px',
    },
    editButton: {
        backgroundColor: '#003366',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 20px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'background-color 0.3s ease',
    },
    editActions: {
        display: 'flex',
        gap: '10px',
    },
    cancelButton: {
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 20px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    saveButton: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 20px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    successMessage: {
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '12px 20px',
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: '1px solid #c3e6cb',
    },
    errorMessage: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '12px 20px',
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: '1px solid #f5c6cb',
    },
    profileContainer: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        width: '100%',
    },
    profileForm: {
        padding: '0',
    },
    section: {
        padding: '30px',
        borderBottom: '1px solid #e1e5e9',
    },
    sectionTitle: {
        color: '#003366',
        fontSize: '20px',
        fontWeight: '600',
        margin: '0 0 20px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    formGroupFull: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        gridColumn: '1 / -1',
    },
    label: {
        color: '#333',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    input: {
        padding: '12px 16px',
        border: '2px solid #e1e5e9',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.3s ease',
        backgroundColor: '#f8f9fa',
    },
    textarea: {
        padding: '12px 16px',
        border: '2px solid #e1e5e9',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        resize: 'vertical',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Arial, sans-serif',
    },
    fileUploadContainer: {
        position: 'relative',
        display: 'inline-block',
    },
    fileInput: {
        position: 'absolute',
        opacity: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
    },
    fileUploadButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'background-color 0.3s ease',
    },
    currentFile: {
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e1e5e9',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        color: '#28a745',
    },
    currentImage: {
        width: '40px',
        height: '40px',
        objectFit: 'cover',
        borderRadius: '8px',
        border: '1px solid #e1e5e9',
    },
    uploadProgress: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '15px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        color: '#1976d2',
        fontSize: '14px',
        fontWeight: '500',
    },
    spinner: {
        width: '16px',
        height: '16px',
        border: '2px solid #e3f2fd',
        borderTop: '2px solid #1976d2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    notice: {
        backgroundColor: '#e3f2fd',
        color: '#1976d2',
        padding: '15px 20px',
        borderRadius: '8px',
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        border: '1px solid #bbdefb',
    },
};

export default ProfileMg;