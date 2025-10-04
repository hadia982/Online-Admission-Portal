import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    deleteDoc, 
    updateDoc, 
    query, 
    where,
    onSnapshot,
    serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../firebase';
import { 
    FaPlus, 
    FaEdit, 
    FaTrash, 
    FaCalendarAlt, 
    FaUsers, 
    FaUniversity,
    FaBookOpen,
    FaDollarSign,
    FaClock
} from 'react-icons/fa';

function ClgDashboard() {
    const user = useSelector((state) => state.home.user);
    const [courses, setCourses] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    // Helper function to get default form values
    const getDefaultFormValues = () => ({
        title: 'B.Sc Computer Science',
        description: 'A comprehensive 4-year undergraduate program covering computer science fundamentals, programming, software development, database management, and modern technologies. Students will gain hands-on experience with various programming languages and development tools.',
        duration: '4 years',
        eligibility: '12th standard with 60% marks in Physics, Chemistry, and Mathematics',
        fees: '85000',
        department: 'Computer Science',
        intakeCapacity: '60',
        courseType: 'undergraduate',
        admissionStart: new Date().toISOString().split('T')[0],
        admissionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });

    // Course form state with prefilled values for easier testing
    const [courseForm, setCourseForm] = useState(getDefaultFormValues());

    // Fetch courses for the logged-in college
    useEffect(() => {
        if (!user?.uid) return;

        const coursesQuery = query(
            collection(db, 'courses'),
            where('collegeId', '==', user.uid)
        );

        const unsubscribe = onSnapshot(coursesQuery, async (snapshot) => {
            const coursesData = [];
            
            for (const docSnapshot of snapshot.docs) {
                const courseData = { id: docSnapshot.id, ...docSnapshot.data() };
                
                // Get application count for this course
                const applicationsQuery = query(
                    collection(db, 'applications'),
                    where('courseId', '==', docSnapshot.id)
                );
                const applicationsSnapshot = await getDocs(applicationsQuery);
                courseData.applicationCount = applicationsSnapshot.size;
                
                coursesData.push(courseData);
            }
            
            setCourses(coursesData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user?.uid]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission (Add/Edit)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const courseData = {
                ...courseForm,
                collegeId: user.uid,
                fees: parseInt(courseForm.fees),
                intakeCapacity: parseInt(courseForm.intakeCapacity),
                admissionStart: new Date(courseForm.admissionStart),
                admissionEnd: new Date(courseForm.admissionEnd),
                updatedAt: serverTimestamp()
            };

            if (editingCourse) {
                // Update existing course
                await updateDoc(doc(db, 'courses', editingCourse.id), courseData);
            } else {
                // Add new course
                courseData.createdAt = serverTimestamp();
                await addDoc(collection(db, 'courses'), courseData);
            }

            // Reset form with prefilled values and close modal
            setCourseForm(getDefaultFormValues());
            setEditingCourse(null);
            setShowModal(false);
            
        } catch (error) {
            console.error('Error saving course:', error);
            alert('Error saving course. Please try again.');
        }
    };

    // Handle edit course
    const handleEdit = (course) => {
        setEditingCourse(course);
        setCourseForm({
            title: course.title,
            description: course.description,
            duration: course.duration,
            eligibility: course.eligibility,
            fees: course.fees.toString(),
            department: course.department,
            intakeCapacity: course.intakeCapacity.toString(),
            courseType: course.courseType,
            admissionStart: course.admissionStart?.toDate?.()?.toISOString?.()?.split('T')[0] || '',
            admissionEnd: course.admissionEnd?.toDate?.()?.toISOString?.()?.split('T')[0] || ''
        });
        setShowModal(true);
    };

    // Handle delete course
    const handleDelete = async (courseId) => {
        try {
            await deleteDoc(doc(db, 'courses', courseId));
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Error deleting course. Please try again.');
        }
    };

    // Check if admission is open
    const isAdmissionOpen = (startDate, endDate) => {
        const now = new Date();
        const start = startDate?.toDate?.() || new Date(startDate);
        const end = endDate?.toDate?.() || new Date(endDate);
        return now >= start && now <= end;
    };

    // Format date for display
    const formatDate = (date) => {
        if (!date) return 'Not set';
        const dateObj = date?.toDate?.() || new Date(date);
        return dateObj.toLocaleDateString();
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}>Loading...</div>
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
                        <h1 style={styles.title}>College Dashboard</h1>
                        <p style={styles.subtitle}>Course Management System</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setCourseForm(getDefaultFormValues());
                        setEditingCourse(null);
                        setShowModal(true);
                    }}
                    style={styles.addButton}
                >
                    <FaPlus size={16} />
                    Add New Course
                </button>
            </div>

            {/* Stats Cards */}
            <div style={styles.statsContainer}>
                <div style={styles.statCard}>
                    <FaBookOpen size={24} color="#003366" />
                    <div>
                        <h3 style={styles.statNumber}>{courses.length}</h3>
                        <p style={styles.statLabel}>Total Courses</p>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <FaUsers size={24} color="#003366" />
                    <div>
                        <h3 style={styles.statNumber}>
                            {courses.reduce((total, course) => total + course.applicationCount, 0)}
                        </h3>
                        <p style={styles.statLabel}>Total Applications</p>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <FaCalendarAlt size={24} color="#003366" />
                    <div>
                        <h3 style={styles.statNumber}>
                            {courses.filter(course => 
                                isAdmissionOpen(course.admissionStart, course.admissionEnd)
                            ).length}
                        </h3>
                        <p style={styles.statLabel}>Open Admissions</p>
                    </div>
                </div>
            </div>

            {/* Courses Table */}
            <div style={styles.tableContainer}>
                <h2 style={styles.tableTitle}>Course Management</h2>
                
                {courses.length === 0 ? (
                    <div style={styles.emptyState}>
                        <FaBookOpen size={48} color="#ccc" />
                        <h3>No courses found</h3>
                        <p>Add your first course to get started</p>
                        <button
                            onClick={() => setShowModal(true)}
                            style={styles.emptyStateButton}
                        >
                            Add Your First Course
                        </button>
                    </div>
                ) : (
                    <div style={styles.table}>
                        <div style={styles.tableHeader}>
                            <div style={styles.headerCell}>Course Title</div>
                            <div style={styles.headerCell}>Department</div>
                            <div style={styles.headerCell}>Duration</div>
                            <div style={styles.headerCell}>Fees</div>
                            <div style={styles.headerCell}>Admission Period</div>
                            <div style={styles.headerCell}>Applications</div>
                            <div style={styles.headerCell}>Status</div>
                            <div style={styles.headerCell}>Actions</div>
                        </div>
                        
                        {courses.map((course) => (
                            <div 
                                key={course.id} 
                                style={{
                                    ...styles.tableRow,
                                    ':hover': {
                                        backgroundColor: '#f8f9fa'
                                    }
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#f8f9fa';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'white';
                                }}
                            >
                                <div style={styles.tableCell}>
                                    <strong>{course.title}</strong>
                                    <br />
                                    <small style={styles.courseType}>{course.courseType}</small>
                                </div>
                                <div style={styles.tableCell}>{course.department}</div>
                                <div style={styles.tableCell}>
                                    <FaClock size={14} color="#666" />
                                    {course.duration}
                                </div>
                                <div style={styles.tableCell}>
                                    <FaDollarSign size={14} color="#666" />
                                    ₹{course.fees?.toLocaleString()}
                                </div>
                                <div style={styles.tableCell}>
                                    <div style={styles.dateContainer}>
                                        <div>Start: {formatDate(course.admissionStart)}</div>
                                        <div>End: {formatDate(course.admissionEnd)}</div>
                                    </div>
                                </div>
                                <div style={styles.tableCell}>
                                    <span style={styles.applicationCount}>
                                        {course.applicationCount}
                                    </span>
                                </div>
                                <div style={styles.tableCell}>
                                    <span style={{
                                        ...styles.statusBadge,
                                        backgroundColor: isAdmissionOpen(course.admissionStart, course.admissionEnd) 
                                            ? '#d4edda' 
                                            : '#f8d7da',
                                        color: isAdmissionOpen(course.admissionStart, course.admissionEnd) 
                                            ? '#155724' 
                                            : '#721c24'
                                    }}>
                                        {isAdmissionOpen(course.admissionStart, course.admissionEnd) 
                                            ? 'Open' 
                                            : 'Closed'}
                                    </span>
                                </div>
                                <div style={styles.tableCell}>
                                    <div style={styles.actionButtons}>
                                        <button
                                            onClick={() => handleEdit(course)}
                                            style={styles.editButton}
                                            title="Edit Course"
                                        >
                                            <FaEdit size={14} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirm(course.id)}
                                            style={styles.deleteButton}
                                            title="Delete Course"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add/Edit Course Modal */}
            {showModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <div style={styles.modalHeader}>
                            <h2>{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setEditingCourse(null);
                                }}
                                style={styles.closeButton}
                            >
                                ×
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.formGrid}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Course Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={courseForm.title}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>
                                
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Department *</label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={courseForm.department}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>
                                
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Duration *</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={courseForm.duration}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 4 years, 2 years"
                                        style={styles.input}
                                        required
                                    />
                                </div>
                                
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Course Type *</label>
                                    <select
                                        name="courseType"
                                        value={courseForm.courseType}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    >
                                        <option value="undergraduate">Undergraduate</option>
                                        <option value="postgraduate">Postgraduate</option>
                                        <option value="diploma">Diploma</option>
                                        <option value="certificate">Certificate</option>
                                    </select>
                                </div>
                                
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Fees (₹) *</label>
                                    <input
                                        type="number"
                                        name="fees"
                                        value={courseForm.fees}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>
                                
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Intake Capacity *</label>
                                    <input
                                        type="number"
                                        name="intakeCapacity"
                                        value={courseForm.intakeCapacity}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>
                                
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Admission Start Date *</label>
                                    <input
                                        type="date"
                                        name="admissionStart"
                                        value={courseForm.admissionStart}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>
                                
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Admission End Date *</label>
                                    <input
                                        type="date"
                                        name="admissionEnd"
                                        value={courseForm.admissionEnd}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Eligibility Criteria *</label>
                                <textarea
                                    name="eligibility"
                                    value={courseForm.eligibility}
                                    onChange={handleInputChange}
                                    style={styles.textarea}
                                    placeholder="e.g., 12th standard with 60% marks"
                                    required
                                />
                            </div>
                            
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Course Description *</label>
                                <textarea
                                    name="description"
                                    value={courseForm.description}
                                    onChange={handleInputChange}
                                    style={styles.textarea}
                                    placeholder="Describe the course content, objectives, and career prospects"
                                    rows="4"
                                    required
                                />
                            </div>
                            
                            <div style={styles.modalActions}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingCourse(null);
                                    }}
                                    style={styles.cancelButton}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={styles.saveButton}
                                >
                                    {editingCourse ? 'Update Course' : 'Add Course'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div style={styles.modalOverlay}>
                    <div style={styles.confirmModal}>
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this course? This action cannot be undone.</p>
                        <div style={styles.confirmActions}>
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                style={styles.cancelButton}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                style={styles.deleteConfirmButton}
                            >
                                Delete Course
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}

// Professional styles for the dashboard
const styles = {
    wrapper: {
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
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
    addButton: {
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
    statsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px',
        width: '100%',
    },
    statCard: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        minHeight: '80px',
    },
    statNumber: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#003366',
        margin: '0',
    },
    statLabel: {
        fontSize: '14px',
        color: '#666',
        margin: '0',
    },
    tableContainer: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        width: '100%',
    },
    tableTitle: {
        padding: '20px',
        margin: '0',
        color: '#003366',
        fontSize: '20px',
        fontWeight: '600',
        borderBottom: '1px solid #e1e5e9',
    },
    emptyState: {
        padding: '60px 20px',
        textAlign: 'center',
        color: '#666',
    },
    emptyStateButton: {
        backgroundColor: '#003366',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '15px',
    },
    table: {
        width: '100%',
        overflowX: 'auto',
    },
    tableHeader: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr 1fr 1fr 1fr',
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #e1e5e9',
        padding: '15px',
        fontWeight: '600',
        color: '#003366',
    },
    tableRow: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr 1fr 1fr 1fr',
        borderBottom: '1px solid #e1e5e9',
        padding: '15px',
        alignItems: 'center',
        transition: 'background-color 0.3s ease',
    },
    headerCell: {
        padding: '0 10px',
        fontSize: '14px',
    },
    tableCell: {
        padding: '0 10px',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    courseType: {
        color: '#666',
        fontSize: '12px',
        textTransform: 'capitalize',
    },
    dateContainer: {
        fontSize: '12px',
        color: '#666',
    },
    applicationCount: {
        backgroundColor: '#e3f2fd',
        color: '#1976d2',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
    },
    statusBadge: {
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    actionButtons: {
        display: 'flex',
        gap: '8px',
    },
    editButton: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '6px 8px',
        cursor: 'pointer',
        fontSize: '12px',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '6px 8px',
        cursor: 'pointer',
        fontSize: '12px',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflowY: 'auto',
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #e1e5e9',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#666',
    },
    form: {
        padding: '20px',
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        marginBottom: '20px',
    },
    formGroup: {
        marginBottom: '0', // Remove margin since grid handles spacing
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: '600',
        color: '#333',
        fontSize: '14px',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '2px solid #e1e5e9',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        border: '2px solid #e1e5e9',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        resize: 'vertical',
        minHeight: '80px',
    },
    modalActions: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end',
        marginTop: '20px',
        paddingTop: '20px',
        borderTop: '1px solid #e1e5e9',
    },
    cancelButton: {
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: '#003366',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
    },
    confirmModal: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        width: '400px',
        textAlign: 'center',
    },
    confirmActions: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        marginTop: '20px',
    },
    deleteConfirmButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
    },
};

export default ClgDashboard;