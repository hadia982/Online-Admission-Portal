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
    FaClock,
    FaEye,
    FaCheck,
    FaTimes,
    FaUserCheck,
    FaUserTimes,
    FaChartBar
} from 'react-icons/fa';

function CourseMg() {
    const user = useSelector((state) => state.home.user);
    const [courses, setCourses] = useState([]);
    // const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showApplications, setShowApplications] = useState(false);

    // Course form state with prefilled values for easier testing
    const [courseForm, setCourseForm] = useState({
        title: 'B.Tech Computer Science',
        description: 'A comprehensive 4-year engineering program covering computer science fundamentals, programming, software development, database management, and modern technologies. Students will gain hands-on experience with various programming languages and development tools.',
        duration: '4 years',
        eligibility: '12th standard with 60% marks in Physics, Chemistry, and Mathematics',
        fees: '95000',
        department: 'Computer Science',
        intakeCapacity: '60',
        courseType: 'undergraduate',
        admissionStart: new Date().toISOString().split('T')[0],
        admissionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });

    // Helper function to get default form values
    const getDefaultFormValues = () => ({
        title: 'B.Tech Computer Science',
        description: 'A comprehensive 4-year engineering program covering computer science fundamentals, programming, software development, database management, and modern technologies. Students will gain hands-on experience with various programming languages and development tools.',
        duration: '4 years',
        eligibility: '12th standard with 60% marks in Physics, Chemistry, and Mathematics',
        fees: '95000',
        department: 'Computer Science',
        intakeCapacity: '60',
        courseType: 'undergraduate',
        admissionStart: new Date().toISOString().split('T')[0],
        admissionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });

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
                
                // Get applications for this course
                const courseApplications = [];
                applicationsSnapshot.forEach(doc => {
                    courseApplications.push({ id: doc.id, ...doc.data() });
                });
                courseData.applications = courseApplications;
                
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

    // Handle application status update
    const handleApplicationStatusUpdate = async (applicationId, newStatus) => {
        try {
            await updateDoc(doc(db, 'applications', applicationId), {
                status: newStatus,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error updating application status:', error);
            alert('Error updating application status. Please try again.');
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

    // View applications for a course
    const viewApplications = (course) => {
        setSelectedCourse(course);
        setShowApplications(true);
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
                        <FaBookOpen size={32} color="#003366" />
                        <div>
                            <h1 style={styles.title}>Course Management</h1>
                            <p style={styles.subtitle}>Manage your courses and applications</p>
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
                    <div style={styles.statCard}>
                        <FaChartBar size={24} color="#003366" />
                        <div>
                            <h3 style={styles.statNumber}>
                                {courses.reduce((total, course) => 
                                    total + course.applications?.filter(app => app.status === 'accepted').length, 0
                                )}
                            </h3>
                            <p style={styles.statLabel}>Accepted Students</p>
                        </div>
                    </div>
                </div>

                {/* Courses Grid */}
                <div style={styles.coursesContainer}>
                    <h2 style={styles.sectionTitle}>Course Management</h2>
                    
                    {courses.length === 0 ? (
                        <div style={styles.emptyState}>
                            <FaBookOpen size={48} color="#ccc" />
                            <h3>No courses found</h3>
                            <p>Add your first course to get started</p>
                            <button
                                onClick={() => {
                                    setCourseForm(getDefaultFormValues());
                                    setEditingCourse(null);
                                    setShowModal(true);
                                }}
                                style={styles.emptyStateButton}
                            >
                                Add Your First Course
                            </button>
                        </div>
                    ) : (
                        <div style={styles.coursesGrid}>
                            {courses.map((course) => (
                                <div key={course.id} style={styles.courseCard}>
                                    {/* Course Header */}
                                    <div style={styles.courseHeader}>
                                        <div style={styles.courseTitle}>
                                            <h3 style={styles.courseName}>{course.title}</h3>
                                            <span style={styles.courseType}>{course.courseType}</span>
                                        </div>
                                        <div style={styles.courseActions}>
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

                                    {/* Course Status */}
                                    <div style={styles.statusContainer}>
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
                                                ? 'Admission Open' 
                                                : 'Admission Closed'}
                                        </span>
                                    </div>

                                    {/* Course Description */}
                                    <div style={styles.courseDescription}>
                                        <p>{course.description}</p>
                                    </div>

                                    {/* Course Details */}
                                    <div style={styles.courseDetails}>
                                        <div style={styles.detailItem}>
                                            <FaClock size={14} color="#666" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div style={styles.detailItem}>
                                            <FaDollarSign size={14} color="#666" />
                                            <span>₹{course.fees?.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Enrollment Info */}
                                    <div style={styles.enrollmentInfo}>
                                        <div style={styles.enrollmentItem}>
                                            <FaUsers size={16} color="#003366" />
                                            <span>{course.applicationCount} Applications</span>
                                        </div>
                                        <div style={styles.enrollmentItem}>
                                            <span>Capacity: {course.intakeCapacity}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div style={styles.courseActions}>
                                        <button
                                            onClick={() => viewApplications(course)}
                                            style={styles.viewButton}
                                        >
                                            <FaEye size={14} />
                                            View Applications ({course.applicationCount})
                                        </button>
                                        <button
                                            onClick={() => handleEdit(course)}
                                            style={styles.updateButton}
                                        >
                                            <FaEdit size={14} />
                                            Update Course
                                        </button>
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

                {/* Applications Modal */}
                {showApplications && selectedCourse && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.applicationsModal}>
                            <div style={styles.modalHeader}>
                                <h2>Applications for {selectedCourse.title}</h2>
                                <button
                                    onClick={() => {
                                        setShowApplications(false);
                                        setSelectedCourse(null);
                                    }}
                                    style={styles.closeButton}
                                >
                                    ×
                                </button>
                            </div>
                            
                            <div style={styles.applicationsList}>
                                {selectedCourse.applications?.length === 0 ? (
                                    <div style={styles.noApplications}>
                                        <FaUsers size={48} color="#ccc" />
                                        <h3>No Applications Yet</h3>
                                        <p>Students haven't applied to this course yet.</p>
                                    </div>
                                ) : (
                                    selectedCourse.applications?.map((application) => (
                                        <div key={application.id} style={styles.applicationCard}>
                                            <div style={styles.applicationInfo}>
                                                <h4 style={styles.studentName}>{application.studentName}</h4>
                                                <p style={styles.studentEmail}>{application.studentEmail}</p>
                                                <p style={styles.applicationDate}>
                                                    Applied: {formatDate(application.appliedAt)}
                                                </p>
                                            </div>
                                            <div style={styles.applicationStatus}>
                                                <span style={{
                                                    ...styles.statusBadge,
                                                    backgroundColor: 
                                                        application.status === 'accepted' ? '#d4edda' :
                                                        application.status === 'rejected' ? '#f8d7da' : '#fff3cd',
                                                    color: 
                                                        application.status === 'accepted' ? '#155724' :
                                                        application.status === 'rejected' ? '#721c24' : '#856404'
                                                }}>
                                                    {application.status}
                                                </span>
                                            </div>
                                            <div style={styles.applicationActions}>
                                                {application.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApplicationStatusUpdate(application.id, 'accepted')}
                                                            style={styles.acceptButton}
                                                        >
                                                            <FaCheck size={14} />
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() => handleApplicationStatusUpdate(application.id, 'rejected')}
                                                            style={styles.rejectButton}
                                                        >
                                                            <FaTimes size={14} />
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                {application.status === 'accepted' && (
                                                    <button
                                                        onClick={() => handleApplicationStatusUpdate(application.id, 'rejected')}
                                                        style={styles.rejectButton}
                                                    >
                                                        <FaUserTimes size={14} />
                                                        Revoke
                                                    </button>
                                                )}
                                                {application.status === 'rejected' && (
                                                    <button
                                                        onClick={() => handleApplicationStatusUpdate(application.id, 'accepted')}
                                                        style={styles.acceptButton}
                                                    >
                                                        <FaUserCheck size={14} />
                                                        Accept
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
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

// Modern styles for the course management page
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
    coursesContainer: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        width: '100%',
    },
    sectionTitle: {
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
    coursesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '20px',
        padding: '20px',
    },
    courseCard: {
        backgroundColor: 'white',
        border: '1px solid #e1e5e9',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    courseHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '15px',
    },
    courseTitle: {
        flex: 1,
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
    courseActions: {
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
    statusContainer: {
        marginBottom: '15px',
    },
    statusBadge: {
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    courseDescription: {
        marginBottom: '15px',
    },
    courseDetails: {
        display: 'flex',
        gap: '20px',
        marginBottom: '15px',
    },
    detailItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        color: '#666',
        fontSize: '14px',
    },
    enrollmentInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
    },
    enrollmentItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '14px',
        color: '#003366',
        fontWeight: '500',
    },
    viewButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 12px',
        fontSize: '12px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        flex: 1,
    },
    updateButton: {
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 12px',
        fontSize: '12px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        flex: 1,
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
    applicationsModal: {
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '700px',
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
        marginBottom: '0',
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
    applicationsList: {
        padding: '20px',
        maxHeight: '60vh',
        overflowY: 'auto',
    },
    noApplications: {
        textAlign: 'center',
        padding: '40px 20px',
        color: '#666',
    },
    applicationCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '15px',
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        marginBottom: '10px',
        backgroundColor: '#f8f9fa',
    },
    applicationInfo: {
        flex: 1,
    },
    studentName: {
        color: '#003366',
        fontSize: '16px',
        fontWeight: '600',
        margin: '0 0 5px 0',
    },
    studentEmail: {
        color: '#666',
        fontSize: '14px',
        margin: '0 0 5px 0',
    },
    applicationDate: {
        color: '#666',
        fontSize: '12px',
        margin: '0',
    },
    applicationStatus: {
        marginRight: '10px',
    },
    applicationActions: {
        display: 'flex',
        gap: '8px',
    },
    acceptButton: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '6px 12px',
        fontSize: '12px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    rejectButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '6px 12px',
        fontSize: '12px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
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

export default CourseMg;