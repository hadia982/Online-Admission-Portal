import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    FaUniversity, 
    FaEdit, 
    FaTrash, 
    FaCheck, 
    FaTimes, 
    FaEye,
    FaSearch,
    FaFilter,
    FaPlus,
    FaDownload,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaGlobe,
    FaCalendarAlt
} from 'react-icons/fa';
import { getAllCollegesForAdmin, updateCollegeStatus, deleteCollege } from '../Helper/firebaseHelper';

const AdminColleges = () => {
    const [colleges, setColleges] = useState([]);
    const [filteredColleges, setFilteredColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchColleges();
    }, []);

    useEffect(() => {
        filterColleges();
    }, [colleges, searchTerm, statusFilter]);

    const fetchColleges = async () => {
        try {
            setLoading(true);
            const collegesData = await getAllCollegesForAdmin();
            setColleges(collegesData || []);
        } catch (error) {
            console.error('Error fetching colleges:', error);
            alert('Error fetching colleges data');
        } finally {
            setLoading(false);
        }
    };

    const filterColleges = () => {
        let filtered = colleges;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(college =>
                college.collegeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                college.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                college.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(college => college.status === statusFilter);
        }

        setFilteredColleges(filtered);
    };

    const handleStatusChange = async (collegeId, newStatus) => {
        try {
            await updateCollegeStatus(collegeId, newStatus);
            
            // Update local state
            setColleges(prev => prev.map(college => 
                college.id === collegeId 
                    ? { ...college, status: newStatus, updatedAt: new Date().toISOString() }
                    : college
            ));
            
            alert(`College status updated to ${newStatus}`);
        } catch (error) {
            console.error('Error updating college status:', error);
            alert('Error updating college status');
        }
    };

    const handleDeleteCollege = async (collegeId, collegeName) => {
        if (window.confirm(`Are you sure you want to delete "${collegeName}"? This action cannot be undone.`)) {
            try {
                await deleteCollege(collegeId);
                setColleges(prev => prev.filter(college => college.id !== collegeId));
                alert('College deleted successfully');
            } catch (error) {
                console.error('Error deleting college:', error);
                alert('Error deleting college');
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return '#28a745';
            case 'pending': return '#ffc107';
            case 'rejected': return '#dc3545';
            default: return '#6c757d';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return <FaCheck />;
            case 'pending': return <FaTimes />;
            case 'rejected': return <FaTimes />;
            default: return <FaTimes />;
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString();
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p>Loading colleges...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Colleges Management</h1>
                    <p style={styles.subtitle}>Manage all registered colleges</p>
                </div>
                <div style={styles.headerActions}>
                    <button style={styles.exportButton}>
                        <FaDownload size={16} />
                        Export
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div style={styles.filtersContainer}>
                <div style={styles.searchContainer}>
                    <FaSearch style={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search colleges..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>
                
                <div style={styles.filterContainer}>
                    <FaFilter style={styles.filterIcon} />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={styles.filterSelect}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div style={styles.statsContainer}>
                <div style={styles.statCard}>
                    <span style={styles.statNumber}>{colleges.length}</span>
                    <span style={styles.statLabel}>Total Colleges</span>
                </div>
                <div style={styles.statCard}>
                    <span style={styles.statNumber}>
                        {colleges.filter(c => c.status === 'approved').length}
                    </span>
                    <span style={styles.statLabel}>Approved</span>
                </div>
                <div style={styles.statCard}>
                    <span style={styles.statNumber}>
                        {colleges.filter(c => c.status === 'pending').length}
                    </span>
                    <span style={styles.statLabel}>Pending</span>
                </div>
                <div style={styles.statCard}>
                    <span style={styles.statNumber}>
                        {colleges.filter(c => c.status === 'rejected').length}
                    </span>
                    <span style={styles.statLabel}>Rejected</span>
                </div>
            </div>

            {/* Colleges List */}
            <div style={styles.collegesContainer}>
                {filteredColleges.length > 0 ? (
                    filteredColleges.map((college) => (
                        <div key={college.id} style={styles.collegeCard}>
                            <div style={styles.collegeHeader}>
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
                                <div style={styles.collegeInfo}>
                                    <h3 style={styles.collegeName}>{college.collegeName}</h3>
                                    <div style={styles.collegeMeta}>
                                        <span style={styles.collegeType}>{college.type}</span>
                                        <span style={styles.collegeYear}>
                                            Est. {college.establishedYear}
                                        </span>
                                    </div>
                                </div>
                                <div style={{
                                    ...styles.statusBadge,
                                    backgroundColor: getStatusColor(college.status)
                                }}>
                                    {getStatusIcon(college.status)}
                                    <span style={styles.statusText}>{college.status}</span>
                                </div>
                            </div>

                            <div style={styles.collegeDetails}>
                                <div style={styles.detailRow}>
                                    <FaMapMarkerAlt style={styles.detailIcon} />
                                    <span>{college.address}, {college.city}, {college.state}</span>
                                </div>
                                <div style={styles.detailRow}>
                                    <FaEnvelope style={styles.detailIcon} />
                                    <span>{college.email}</span>
                                </div>
                                <div style={styles.detailRow}>
                                    <FaPhone style={styles.detailIcon} />
                                    <span>{college.phone}</span>
                                </div>
                                {college.website && (
                                    <div style={styles.detailRow}>
                                        <FaGlobe style={styles.detailIcon} />
                                        <a href={college.website} target="_blank" rel="noopener noreferrer" style={styles.websiteLink}>
                                            {college.website}
                                        </a>
                                    </div>
                                )}
                                <div style={styles.detailRow}>
                                    <FaCalendarAlt style={styles.detailIcon} />
                                    <span>Registered: {formatDate(college.createdAt)}</span>
                                </div>
                            </div>

                            <div style={styles.collegeActions}>
                                <button
                                    onClick={() => {
                                        setSelectedCollege(college);
                                        setShowModal(true);
                                    }}
                                    style={styles.actionButton}
                                >
                                    <FaEye size={14} />
                                    View
                                </button>
                                
                                <Link
                                    to={`/admin-colleges/edit/${college.id}`}
                                    style={styles.actionButton}
                                >
                                    <FaEdit size={14} />
                                    Edit
                                </Link>

                                {college.status === 'pending' && (
                                    <button
                                        onClick={() => handleStatusChange(college.id, 'approved')}
                                        style={{...styles.actionButton, backgroundColor: '#28a745'}}
                                    >
                                        <FaCheck size={14} />
                                        Approve
                                    </button>
                                )}

                                {college.status === 'approved' && (
                                    <button
                                        onClick={() => handleStatusChange(college.id, 'rejected')}
                                        style={{...styles.actionButton, backgroundColor: '#dc3545'}}
                                    >
                                        <FaTimes size={14} />
                                        Reject
                                    </button>
                                )}

                                <button
                                    onClick={() => handleDeleteCollege(college.id, college.collegeName)}
                                    style={{...styles.actionButton, backgroundColor: '#dc3545'}}
                                >
                                    <FaTrash size={14} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={styles.emptyState}>
                        <FaUniversity size={48} color="#ccc" />
                        <h3>No colleges found</h3>
                        <p>No colleges match your current filters.</p>
                    </div>
                )}
            </div>

            {/* College Details Modal */}
            {showModal && selectedCollege && (
                <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2>{selectedCollege.collegeName}</h2>
                            <button 
                                onClick={() => setShowModal(false)}
                                style={styles.closeButton}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        
                        <div style={styles.modalBody}>
                            <div style={styles.modalSection}>
                                <h4>Basic Information</h4>
                                <p><strong>Type:</strong> {selectedCollege.type}</p>
                                <p><strong>Established:</strong> {selectedCollege.establishedYear}</p>
                                <p><strong>Status:</strong> 
                                    <span style={{
                                        ...styles.inlineStatus,
                                        backgroundColor: getStatusColor(selectedCollege.status)
                                    }}>
                                        {selectedCollege.status}
                                    </span>
                                </p>
                            </div>

                            <div style={styles.modalSection}>
                                <h4>Contact Information</h4>
                                <p><strong>Email:</strong> {selectedCollege.email}</p>
                                <p><strong>Phone:</strong> {selectedCollege.phone}</p>
                                <p><strong>Website:</strong> 
                                    {selectedCollege.website ? (
                                        <a href={selectedCollege.website} target="_blank" rel="noopener noreferrer">
                                            {selectedCollege.website}
                                        </a>
                                    ) : 'N/A'}
                                </p>
                            </div>

                            <div style={styles.modalSection}>
                                <h4>Address</h4>
                                <p>{selectedCollege.address}</p>
                                <p>{selectedCollege.city}, {selectedCollege.state} {selectedCollege.postalCode}</p>
                                <p>{selectedCollege.country}</p>
                            </div>

                            {selectedCollege.description && (
                                <div style={styles.modalSection}>
                                    <h4>Description</h4>
                                    <p>{selectedCollege.description}</p>
                                </div>
                            )}

                            <div style={styles.modalSection}>
                                <h4>Documents</h4>
                                {selectedCollege.documents?.registrationCertificateUrl && (
                                    <p>
                                        <strong>Registration Certificate:</strong>{' '}
                                        <a href={selectedCollege.documents.registrationCertificateUrl} target="_blank" rel="noopener noreferrer">
                                            View Document
                                        </a>
                                    </p>
                                )}
                                {selectedCollege.documents?.affiliationCertificateUrl && (
                                    <p>
                                        <strong>Affiliation Certificate:</strong>{' '}
                                        <a href={selectedCollege.documents.affiliationCertificateUrl} target="_blank" rel="noopener noreferrer">
                                            View Document
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    headerActions: {
        display: 'flex',
        gap: '10px'
    },
    exportButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500'
    },
    filtersContainer: {
        display: 'flex',
        gap: '20px',
        marginBottom: '30px',
        flexWrap: 'wrap'
    },
    searchContainer: {
        position: 'relative',
        flex: 1,
        minWidth: '300px'
    },
    searchIcon: {
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#666',
        fontSize: '16px'
    },
    searchInput: {
        width: '100%',
        padding: '12px 12px 12px 40px',
        border: '2px solid #e1e5e9',
        borderRadius: '8px',
        fontSize: '16px',
        outline: 'none'
    },
    filterContainer: {
        position: 'relative',
        minWidth: '200px'
    },
    filterIcon: {
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#666',
        fontSize: '16px'
    },
    filterSelect: {
        width: '100%',
        padding: '12px 12px 12px 40px',
        border: '2px solid #e1e5e9',
        borderRadius: '8px',
        fontSize: '16px',
        outline: 'none',
        backgroundColor: 'white'
    },
    statsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
    },
    statCard: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #e9ecef'
    },
    statNumber: {
        display: 'block',
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '5px'
    },
    statLabel: {
        fontSize: '14px',
        color: '#666'
    },
    collegesContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    collegeCard: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #e9ecef'
    },
    collegeHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
    },
    collegeLogo: {
        width: '60px',
        height: '60px',
        borderRadius: '12px',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '20px',
        overflow: 'hidden'
    },
    logoImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    collegeInfo: {
        flex: 1
    },
    collegeName: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
        margin: '0 0 8px 0'
    },
    collegeMeta: {
        display: 'flex',
        gap: '15px'
    },
    collegeType: {
        backgroundColor: '#e9ecef',
        color: '#495057',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    collegeYear: {
        color: '#666',
        fontSize: '14px'
    },
    statusBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        borderRadius: '20px',
        color: 'white',
        fontSize: '14px',
        fontWeight: '500'
    },
    statusText: {
        textTransform: 'capitalize'
    },
    collegeDetails: {
        marginBottom: '20px'
    },
    detailRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '8px',
        fontSize: '14px',
        color: '#666'
    },
    detailIcon: {
        color: '#dc3545',
        fontSize: '14px',
        width: '16px'
    },
    websiteLink: {
        color: '#007bff',
        textDecoration: 'none'
    },
    collegeActions: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
    },
    actionButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        textDecoration: 'none',
        transition: 'background-color 0.2s ease'
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        color: '#999',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e9ecef'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: '12px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'auto'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 25px',
        borderBottom: '1px solid #e9ecef'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        color: '#666'
    },
    modalBody: {
        padding: '25px'
    },
    modalSection: {
        marginBottom: '25px'
    },
    inlineStatus: {
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: '4px',
        color: 'white',
        fontSize: '12px',
        fontWeight: '500',
        marginLeft: '8px',
        textTransform: 'capitalize'
    }
};

export default AdminColleges;
