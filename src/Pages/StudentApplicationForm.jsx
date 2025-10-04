import React, { useState, useEffect } from 'react';
import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where,
    serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../firebase';
import { 
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCalendarAlt,
    FaGraduationCap,
    FaFileUpload,
    FaCheck,
    FaTimes,
    FaUniversity,
    FaBookOpen,
    FaDollarSign,
    FaClock,
    FaMapMarkerAlt,
    FaIdCard
} from 'react-icons/fa';

function StudentApplicationForm() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Application form state
    const [applicationForm, setApplicationForm] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        
        // Academic Information
        previousEducation: '',
        previousInstitution: '',
        previousYear: '',
        previousGrade: '',
        
        // Address Information
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        
        // Emergency Contact
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelation: '',
        
        // Documents
        photoFile: null,
        documentsFile: null,
        
        // Course Selection
        courseId: '',
        collegeId: '',
        
        // Additional Information
        motivation: '',
        additionalInfo: ''
    });

    // Fetch available courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesQuery = query(
                    collection(db, 'courses')
                );
                const snapshot = await getDocs(coursesQuery);
                
                const coursesData = [];
                snapshot.forEach(doc => {
                    const courseData = { id: doc.id, ...doc.data() };
                    // Only show courses with open admissions
                    const now = new Date();
                    const start = courseData.admissionStart?.toDate?.() || new Date(courseData.admissionStart);
                    const end = courseData.admissionEnd?.toDate?.() || new Date(courseData.admissionEnd);
                    
                    if (now >= start && now <= end) {
                        coursesData.push(courseData);
                    }
                });
                
                setCourses(coursesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError('Failed to load courses');
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setApplicationForm(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    // Handle course selection
    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
        setApplicationForm(prev => ({
            ...prev,
            courseId: course.id,
            collegeId: course.collegeId
        }));
    };

    // Handle file uploads
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            setApplicationForm(prev => ({
                ...prev,
                [type]: file
            }));
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
        setSubmitting(true);
        setError('');

        try {
            let photoUrl = '';
            let documentsUrl = '';

            // Upload files if selected
            if (applicationForm.photoFile) {
                photoUrl = await uploadToCloudinary(applicationForm.photoFile);
            }
            
            if (applicationForm.documentsFile) {
                documentsUrl = await uploadToCloudinary(applicationForm.documentsFile);
            }

            // Prepare application data
            const applicationData = {
                // Student Information
                studentName: `${applicationForm.firstName} ${applicationForm.lastName}`,
                studentEmail: applicationForm.email,
                studentPhone: applicationForm.phone,
                dateOfBirth: new Date(applicationForm.dateOfBirth),
                gender: applicationForm.gender,
                nationality: applicationForm.nationality,
                
                // Academic Information
                previousEducation: applicationForm.previousEducation,
                previousInstitution: applicationForm.previousInstitution,
                previousYear: applicationForm.previousYear,
                previousGrade: applicationForm.previousGrade,
                
                // Address Information
                address: applicationForm.address,
                city: applicationForm.city,
                state: applicationForm.state,
                country: applicationForm.country,
                postalCode: applicationForm.postalCode,
                
                // Emergency Contact
                emergencyContactName: applicationForm.emergencyContactName,
                emergencyContactPhone: applicationForm.emergencyContactPhone,
                emergencyContactRelation: applicationForm.emergencyContactRelation,
                
                // Documents
                photoUrl,
                documentsUrl,
                
                // Course Information
                courseId: applicationForm.courseId,
                collegeId: applicationForm.collegeId,
                courseName: selectedCourse?.title,
                collegeName: selectedCourse?.collegeName || 'College',
                
                // Application Details
                motivation: applicationForm.motivation,
                additionalInfo: applicationForm.additionalInfo,
                status: 'pending',
                appliedAt: serverTimestamp()
            };

            // Submit application
            await addDoc(collection(db, 'applications'), applicationData);

            setSuccess(true);
            setApplicationForm({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                dateOfBirth: '',
                gender: '',
                nationality: '',
                previousEducation: '',
                previousInstitution: '',
                previousYear: '',
                previousGrade: '',
                address: '',
                city: '',
                state: '',
                country: '',
                postalCode: '',
                emergencyContactName: '',
                emergencyContactPhone: '',
                emergencyContactRelation: '',
                photoFile: null,
                documentsFile: null,
                courseId: '',
                collegeId: '',
                motivation: '',
                additionalInfo: ''
            });
            setSelectedCourse(null);

        } catch (error) {
            console.error('Error submitting application:', error);
            setError('Failed to submit application. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}>Loading available courses...</div>
            </div>
        );
    }

    if (success) {
        return (
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    <div style={styles.successContainer}>
                        <FaCheck size={64} color="#28a745" />
                        <h1 style={styles.successTitle}>Application Submitted Successfully!</h1>
                        <p style={styles.successMessage}>
                            Thank you for applying to {selectedCourse?.title}. Your application has been submitted and is under review.
                        </p>
                        <div style={styles.successDetails}>
                            <p><strong>Application ID:</strong> {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                            <p><strong>Course:</strong> {selectedCourse?.title}</p>
                            <p><strong>Status:</strong> Pending Review</p>
                        </div>
                        <button
                            onClick={() => {
                                setSuccess(false);
                                setSelectedCourse(null);
                            }}
                            style={styles.newApplicationButton}
                        >
                            Submit Another Application
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerContent}>
                        <FaGraduationCap size={32} color="#003366" />
                        <div>
                            <h1 style={styles.title}>Course Application Form</h1>
                            <p style={styles.subtitle}>Apply for your desired course</p>
                        </div>
                    </div>
                </div>

                {/* Course Selection */}
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        <FaBookOpen size={20} color="#003366" />
                        Select Course
                    </h2>
                    
                    {courses.length === 0 ? (
                        <div style={styles.noCourses}>
                            <FaBookOpen size={48} color="#ccc" />
                            <h3>No Courses Available</h3>
                            <p>There are currently no courses with open admissions.</p>
                        </div>
                    ) : (
                        <div style={styles.coursesGrid}>
                            {courses.map((course) => (
                                <div 
                                    key={course.id} 
                                    style={{
                                        ...styles.courseCard,
                                        borderColor: selectedCourse?.id === course.id ? '#003366' : '#e1e5e9',
                                        backgroundColor: selectedCourse?.id === course.id ? '#f8f9fa' : 'white'
                                    }}
                                    onClick={() => handleCourseSelect(course)}
                                >
                                    <div style={styles.courseHeader}>
                                        <h3 style={styles.courseName}>{course.title}</h3>
                                        <span style={styles.courseType}>{course.courseType}</span>
                                    </div>
                                    <div style={styles.courseDetails}>
                                        <div style={styles.courseDetail}>
                                            <FaUniversity size={14} color="#666" />
                                            <span>{course.department}</span>
                                        </div>
                                        <div style={styles.courseDetail}>
                                            <FaClock size={14} color="#666" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div style={styles.courseDetail}>
                                            <FaDollarSign size={14} color="#666" />
                                            <span>₹{course.fees?.toLocaleString()}</span>
                                        </div>
                                        <div style={styles.courseDetail}>
                                            <FaCalendarAlt size={14} color="#666" />
                                            <span>Admission Open</span>
                                        </div>
                                    </div>
                                    <div style={styles.courseDescription}>
                                        <p>{course.description?.substring(0, 100)}...</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Application Form */}
                {selectedCourse && (
                    <form onSubmit={handleSubmit} style={styles.applicationForm}>
                        {/* Personal Information */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>
                                <FaUser size={20} color="#003366" />
                                Personal Information
                            </h2>
                            
                            <div style={styles.formGrid}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>First Name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={applicationForm.firstName}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Last Name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={applicationForm.lastName}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <FaEnvelope size={14} />
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={applicationForm.email}
                                        onChange={handleInputChange}
                                        style={styles.input}
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
                                        value={applicationForm.phone}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <FaCalendarAlt size={14} />
                                        Date of Birth *
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={applicationForm.dateOfBirth}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Gender *</label>
                                    <select
                                        name="gender"
                                        value={applicationForm.gender}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Nationality *</label>
                                    <input
                                        type="text"
                                        name="nationality"
                                        value={applicationForm.nationality}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Academic Information */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>
                                <FaGraduationCap size={20} color="#003366" />
                                Academic Information
                            </h2>
                            
                            <div style={styles.formGrid}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Previous Education *</label>
                                    <select
                                        name="previousEducation"
                                        value={applicationForm.previousEducation}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    >
                                        <option value="">Select Education Level</option>
                                        <option value="10th">10th Grade</option>
                                        <option value="12th">12th Grade</option>
                                        <option value="diploma">Diploma</option>
                                        <option value="bachelor">Bachelor's Degree</option>
                                        <option value="master">Master's Degree</option>
                                    </select>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Previous Institution *</label>
                                    <input
                                        type="text"
                                        name="previousInstitution"
                                        value={applicationForm.previousInstitution}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Completion Year *</label>
                                    <input
                                        type="number"
                                        name="previousYear"
                                        value={applicationForm.previousYear}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                        min="2000"
                                        max="2024"
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Grade/Percentage *</label>
                                    <input
                                        type="text"
                                        name="previousGrade"
                                        value={applicationForm.previousGrade}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                        placeholder="e.g., 85% or A+"
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
                                    <label style={styles.label}>Address *</label>
                                    <textarea
                                        name="address"
                                        value={applicationForm.address}
                                        onChange={handleInputChange}
                                        style={styles.textarea}
                                        required
                                        rows="3"
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={applicationForm.city}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>State *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={applicationForm.state}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Country *</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={applicationForm.country}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={applicationForm.postalCode}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>
                                <FaIdCard size={20} color="#003366" />
                                Emergency Contact
                            </h2>
                            
                            <div style={styles.formGrid}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Contact Name *</label>
                                    <input
                                        type="text"
                                        name="emergencyContactName"
                                        value={applicationForm.emergencyContactName}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Contact Phone *</label>
                                    <input
                                        type="tel"
                                        name="emergencyContactPhone"
                                        value={applicationForm.emergencyContactPhone}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Relationship *</label>
                                    <input
                                        type="text"
                                        name="emergencyContactRelation"
                                        value={applicationForm.emergencyContactRelation}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                        placeholder="e.g., Father, Mother, Guardian"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Document Upload */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>
                                <FaFileUpload size={20} color="#003366" />
                                Documents Upload
                            </h2>
                            
                            <div style={styles.formGrid}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Photo *</label>
                                    <div style={styles.fileUploadContainer}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, 'photoFile')}
                                            style={styles.fileInput}
                                        />
                                        <div style={styles.fileUploadButton}>
                                            <FaFileUpload size={16} />
                                            {applicationForm.photoFile ? 'Change Photo' : 'Upload Photo'}
                                        </div>
                                    </div>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Academic Documents *</label>
                                    <div style={styles.fileUploadContainer}>
                                        <input
                                            type="file"
                                            accept="image/*,.pdf"
                                            onChange={(e) => handleFileChange(e, 'documentsFile')}
                                            style={styles.fileInput}
                                            multiple
                                        />
                                        <div style={styles.fileUploadButton}>
                                            <FaFileUpload size={16} />
                                            {applicationForm.documentsFile ? 'Change Documents' : 'Upload Documents'}
                                        </div>
                                    </div>
                                    <p style={styles.fileHelpText}>
                                        Upload your academic certificates, transcripts, and other relevant documents
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>
                                <FaUser size={20} color="#003366" />
                                Additional Information
                            </h2>
                            
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Why do you want to join this course? *</label>
                                <textarea
                                    name="motivation"
                                    value={applicationForm.motivation}
                                    onChange={handleInputChange}
                                    style={styles.textarea}
                                    required
                                    rows="4"
                                    placeholder="Explain your motivation for applying to this course..."
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Additional Information</label>
                                <textarea
                                    name="additionalInfo"
                                    value={applicationForm.additionalInfo}
                                    onChange={handleInputChange}
                                    style={styles.textarea}
                                    rows="3"
                                    placeholder="Any additional information you'd like to share..."
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div style={styles.errorMessage}>
                                <FaTimes size={16} color="#dc3545" />
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div style={styles.submitSection}>
                            <button
                                type="submit"
                                disabled={submitting}
                                style={{
                                    ...styles.submitButton,
                                    opacity: submitting ? 0.7 : 1
                                }}
                            >
                                {submitting ? 'Submitting Application...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

// Styles for the student application form
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
        maxWidth: '1200px',
        margin: '0 auto',
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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
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
    section: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        overflow: 'hidden',
    },
    sectionTitle: {
        color: '#003366',
        fontSize: '20px',
        fontWeight: '600',
        margin: '0',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e1e5e9',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    coursesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '20px',
        padding: '20px',
    },
    courseCard: {
        border: '2px solid #e1e5e9',
        borderRadius: '12px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: 'white',
    },
    courseHeader: {
        marginBottom: '15px',
    },
    courseName: {
        color: '#003366',
        fontSize: '18px',
        fontWeight: 'bold',
        margin: '0 0 5px 0',
    },
    courseType: {
        color: '#666',
        fontSize: '12px',
        textTransform: 'capitalize',
        backgroundColor: '#f8f9fa',
        padding: '2px 8px',
        borderRadius: '12px',
    },
    courseDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '15px',
    },
    courseDetail: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: '#666',
    },
    courseDescription: {
        fontSize: '14px',
        color: '#666',
        lineHeight: '1.5',
    },
    noCourses: {
        padding: '60px 20px',
        textAlign: 'center',
        color: '#666',
    },
    applicationForm: {
        padding: '0',
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        padding: '20px',
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
        backgroundColor: 'white',
    },
    textarea: {
        padding: '12px 16px',
        border: '2px solid #e1e5e9',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        resize: 'vertical',
        backgroundColor: 'white',
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
    fileHelpText: {
        fontSize: '12px',
        color: '#666',
        marginTop: '5px',
    },
    errorMessage: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '12px 20px',
        borderRadius: '8px',
        margin: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: '1px solid #f5c6cb',
    },
    submitSection: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e1e5e9',
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#003366',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '15px 40px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    successContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '40px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    successTitle: {
        color: '#28a745',
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '20px 0 10px 0',
    },
    successMessage: {
        color: '#666',
        fontSize: '16px',
        marginBottom: '20px',
        lineHeight: '1.5',
    },
    successDetails: {
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'left',
    },
    newApplicationButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default StudentApplicationForm;
