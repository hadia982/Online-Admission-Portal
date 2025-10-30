import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    FaUniversity, 
    FaGraduationCap, 
    FaTrophy, 
    FaUsers, 
    FaFileAlt, 
    FaUserGraduate,
    FaChartLine,
    FaEye,
    FaEdit,
    FaTrash,
    FaCheck,
    FaTimes
} from 'react-icons/fa';
import { getDashboardStats, getAllCollegesForAdmin, updateCollegeStatus } from '../Helper/firebaseHelper';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        colleges: 0,
        courses: 0,
        successStories: 0,
        users: 0,
        applications: 0,
        admissions: 0
    });
    const [recentColleges, setRecentColleges] = useState([]);
    const [allColleges, setAllColleges] = useState([]);
    const [showAllColleges, setShowAllColleges] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            // Fetch dashboard stats and colleges data
            const [statsData, colleges] = await Promise.all([
                getDashboardStats(),
                getAllCollegesForAdmin()
            ]);

            setStats(statsData);

            // Store all colleges
            setAllColleges(colleges || []);

            // Debug: Log all colleges to see what we're getting
            console.log('All colleges fetched:', colleges);
            console.log('Pending colleges:', colleges?.filter(c => c.status?.trim() === 'pending'));

            // Get recent colleges (last 5)
            const sortedColleges = colleges?.sort((a, b) => 
                new Date(b.createdAt) - new Date(a.createdAt)
            ).slice(0, 5) || [];
            setRecentColleges(sortedColleges);

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const cleanStatus = status?.trim()?.toLowerCase();
        switch (cleanStatus) {
            case 'approved': return '#28a745';
            case 'pending': return '#ffc107';
            case 'rejected': return '#dc3545';
            default: return '#6c757d';
        }
    };

    const getStatusIcon = (status) => {
        const cleanStatus = status?.trim()?.toLowerCase();
        switch (cleanStatus) {
            case 'approved': return <FaCheck color="#28a745" />;
            case 'pending': return <FaTimes color="#ffc107" />;
            case 'rejected': return <FaTimes color="#dc3545" />;
            default: return <FaTimes color="#6c757d" />;
        }
    };

    const handleApproveCollege = async (collegeId, collegeName) => {
        if (window.confirm(`Are you sure you want to approve "${collegeName}"?`)) {
            try {
                await updateCollegeStatus(collegeId, 'approved');
                
                // Update local state for both allColleges and recentColleges
                setAllColleges(prev => prev.map(college => 
                    college.id === collegeId 
                        ? { ...college, status: 'approved', updatedAt: new Date().toISOString() }
                        : college
                ));
                
                setRecentColleges(prev => prev.map(college => 
                    college.id === collegeId 
                        ? { ...college, status: 'approved', updatedAt: new Date().toISOString() }
                        : college
                ));
                
                alert(`College "${collegeName}" has been approved successfully!`);
            } catch (error) {
                console.error('Error approving college:', error);
                alert('Error approving college. Please try again.');
            }
        }
    };

    const handleRejectCollege = async (collegeId, collegeName) => {
        if (window.confirm(`Are you sure you want to reject "${collegeName}"?`)) {
            try {
                await updateCollegeStatus(collegeId, 'rejected');
                
                // Update local state for both allColleges and recentColleges
                setAllColleges(prev => prev.map(college => 
                    college.id === collegeId 
                        ? { ...college, status: 'rejected', updatedAt: new Date().toISOString() }
                        : college
                ));
                
                setRecentColleges(prev => prev.map(college => 
                    college.id === collegeId 
                        ? { ...college, status: 'rejected', updatedAt: new Date().toISOString() }
                        : college
                ));
                
                alert(`College "${collegeName}" has been rejected.`);
            } catch (error) {
                console.error('Error rejecting college:', error);
                alert('Error rejecting college. Please try again.');
            }
        }
    };

    const statCards = [
        {
            title: 'Colleges',
            count: stats.colleges,
            icon: FaUniversity,
            color: '#007bff',
            link: '/admin-colleges'
        },
        {
            title: 'Courses',
            count: stats.courses,
            icon: FaGraduationCap,
            color: '#28a745',
            link: '/admin-courses'
        },
        {
            title: 'Success Stories',
            count: stats.successStories,
            icon: FaTrophy,
            color: '#ffc107',
            link: '/admin-success-stories'
        },
        // {
        //     title: 'Users',
        //     count: stats.users,
        //     icon: FaUsers,
        //     color: '#6f42c1',
        //     link: '/admin-users'
        // },
        {
            title: 'Applications',
            count: stats.applications,
            icon: FaFileAlt,
            color: '#fd7e14',
            link: '/admin-applications'
        },
        // {
        //     title: 'Admissions',
        //     count: stats.admissions,
        //     icon: FaUserGraduate,
        //     color: '#20c997',
        //     link: '/admin-admissions'
        // }
    ];

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p>Loading dashboard data...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.title}>Admin Dashboard</h1>
                <p style={styles.subtitle}>Overview of the college portal system</p>
            </div>

            {/* Stats Cards */}
            <div style={styles.statsGrid}>
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Link key={index} to={stat.link} style={styles.statCard}>
                            <div style={{
                                ...styles.statIcon,
                                backgroundColor: stat.color
                            }}>
                                <Icon size={24} color="white" />
                            </div>
                            <div style={styles.statContent}>
                                <h3 style={styles.statCount}>{stat.count}</h3>
                                <p style={styles.statTitle}>{stat.title}</p>
                            </div>
                            <div style={styles.statArrow}>
                                <FaChartLine size={16} color="#666" />
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Pending Approvals */}
            {allColleges.filter(college => college.status?.trim()?.toLowerCase() === 'pending').length > 0 && (
                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>⚠️ Pending Approvals</h2>
                        <span style={styles.pendingCount}>
                            {allColleges.filter(college => college.status?.trim()?.toLowerCase() === 'pending').length} pending
                        </span>
                    </div>
                    
                    <div style={styles.collegesList}>
                        {allColleges
                            .filter(college => college.status?.trim()?.toLowerCase() === 'pending')
                            .map((college) => (
                                <div key={college.id} style={styles.collegeCard}>
                                    <div style={styles.collegeInfo}>
                                        <div style={styles.collegeLogo}>
                                            {college.logoUrl ? (
                                                <img 
                                                    src={college.logoUrl} 
                                                    alt={college.collegeName}
                                                    style={styles.logoImage}
                                                />
                                            ) : (
                                                <FaUniversity size={24} color="#666" />
                                            )}
                                        </div>
                                        <div style={styles.collegeDetails}>
                                            <h4 style={styles.collegeName}>{college.collegeName}</h4>
                                            <p style={styles.collegeLocation}>
                                                {college.city}, {college.state}
                                            </p>
                                            <p style={styles.collegeEmail}>{college.email}</p>
                                        </div>
                                    </div>
                                    <div style={styles.collegeActions}>
                                        <div style={{
                                            ...styles.statusBadge,
                                            backgroundColor: getStatusColor(college.status)
                                        }}>
                                            {getStatusIcon(college.status)}
                                            <span style={styles.statusText}>{college.status}</span>
                                        </div>
                                        <div style={styles.actionButtons}>
                                            <button
                                                onClick={() => handleApproveCollege(college.id, college.collegeName)}
                                                style={{
                                                    ...styles.approveButton,
                                                    backgroundColor: '#28a745'
                                                }}
                                            >
                                                <FaCheck size={14} />
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleRejectCollege(college.id, college.collegeName)}
                                                style={{
                                                    ...styles.rejectButton,
                                                    backgroundColor: '#dc3545'
                                                }}
                                            >
                                                <FaTimes size={14} />
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* Recent Colleges */}
            <div style={styles.section}>
                <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>Recent Colleges</h2>
                    <Link to="/admin-colleges" style={styles.viewAllLink}>
                        View All →
                    </Link>
                </div>
                
                <div style={styles.collegesList}>
                    {recentColleges.length > 0 ? (
                        recentColleges.map((college) => (
                            <div key={college.id} style={styles.collegeCard}>
                                <div style={styles.collegeInfo}>
                                    <div style={styles.collegeLogo}>
                                        {college.logoUrl ? (
                                            <img 
                                                src={college.logoUrl} 
                                                alt={college.collegeName}
                                                style={styles.logoImage}
                                            />
                                        ) : (
                                            <FaUniversity size={24} color="#666" />
                                        )}
                                    </div>
                                    <div style={styles.collegeDetails}>
                                        <h4 style={styles.collegeName}>{college.collegeName}</h4>
                                        <p style={styles.collegeLocation}>
                                            {college.city}, {college.state}
                                        </p>
                                        <p style={styles.collegeEmail}>{college.email}</p>
                                    </div>
                                </div>
                                <div style={styles.collegeActions}>
                                    <div style={{
                                        ...styles.statusBadge,
                                        backgroundColor: getStatusColor(college.status)
                                    }}>
                                        {getStatusIcon(college.status)}
                                        <span style={styles.statusText}>{college.status}</span>
                                    </div>
                                    <div style={styles.actionButtons}>
                                        <Link 
                                            to={`/admin-colleges/${college.id}`}
                                            style={styles.actionButton}
                                        >
                                            <FaEye size={14} />
                                        </Link>
                                        <Link 
                                            to={`/admin-colleges/edit/${college.id}`}
                                            style={styles.actionButton}
                                        >
                                            <FaEdit size={14} />
                                        </Link>
                                        
                                        {/* Approve/Reject buttons for pending colleges */}
                                        {college.status?.trim()?.toLowerCase() === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleApproveCollege(college.id, college.collegeName)}
                                                    style={{
                                                        ...styles.approveButton,
                                                        backgroundColor: '#28a745',
                                                        padding: '8px 12px',
                                                        fontSize: '12px',
                                                        fontWeight: '600'
                                                    }}
                                                    title="Approve College"
                                                >
                                                    <FaCheck size={12} />
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleRejectCollege(college.id, college.collegeName)}
                                                    style={{
                                                        ...styles.rejectButton,
                                                        backgroundColor: '#dc3545',
                                                        padding: '8px 12px',
                                                        fontSize: '12px',
                                                        fontWeight: '600'
                                                    }}
                                                    title="Reject College"
                                                >
                                                    <FaTimes size={12} />
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={styles.emptyState}>
                            <FaUniversity size={48} color="#ccc" />
                            <p>No colleges found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '30px',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa'
    },
    loadingSpinner: {
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #dc3545',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px'
    },
    header: {
        marginBottom: '30px'
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#333',
        margin: '0 0 10px 0'
    },
    subtitle: {
        fontSize: '16px',
        color: '#666',
        margin: '0'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
    },
    statCard: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        border: '1px solid #e9ecef'
    },
    statIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '20px'
    },
    statContent: {
        flex: 1
    },
    statCount: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#333',
        margin: '0 0 5px 0'
    },
    statTitle: {
        fontSize: '14px',
        color: '#666',
        margin: '0'
    },
    statArrow: {
        opacity: 0.5
    },
    section: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #e9ecef'
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    sectionTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        margin: '0'
    },
    viewAllLink: {
        color: '#dc3545',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '500'
    },
    pendingCount: {
        backgroundColor: '#ffc107',
        color: '#856404',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600'
    },
    collegesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    collegeCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        backgroundColor: '#f8f9fa',
        transition: 'box-shadow 0.2s ease'
    },
    collegeInfo: {
        display: 'flex',
        alignItems: 'center',
        flex: 1
    },
    collegeLogo: {
        width: '50px',
        height: '50px',
        borderRadius: '8px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '15px',
        overflow: 'hidden'
    },
    logoImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    collegeDetails: {
        flex: 1
    },
    collegeName: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
        margin: '0 0 5px 0'
    },
    collegeLocation: {
        fontSize: '14px',
        color: '#666',
        margin: '0 0 3px 0'
    },
    collegeEmail: {
        fontSize: '12px',
        color: '#999',
        margin: '0'
    },
    collegeActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    statusBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '6px 12px',
        borderRadius: '20px',
        color: 'white',
        fontSize: '12px',
        fontWeight: '500'
    },
    statusText: {
        textTransform: 'capitalize'
    },
    actionButtons: {
        display: 'flex',
        gap: '8px'
    },
    actionButton: {
        width: '32px',
        height: '32px',
        borderRadius: '6px',
        backgroundColor: 'white',
        border: '1px solid #dee2e6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        textDecoration: 'none',
        transition: 'all 0.2s ease'
    },
    approveButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.2s ease'
    },
    rejectButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.2s ease'
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        color: '#999'
    }
};

export default AdminDashboard;
