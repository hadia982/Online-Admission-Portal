import React, { useState } from 'react';
import { createAllTestData, createTestAdmin, createTestCollege } from '../Utils/createTestData';
import { createSecondCollege } from '../Utils/createSecondCollege';
import { FaUserShield, FaUniversity, FaDatabase, FaCheck, FaTimes } from 'react-icons/fa';

const TestDataSetup = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [createdData, setCreatedData] = useState({
        admin: false,
        college: false,
        secondCollege: false
    });

    const handleCreateAll = async () => {
        setLoading(true);
        setMessage('');
        
        try {
            await createAllTestData();
            setMessage('✅ All test data created successfully! Check console for credentials.');
            setCreatedData({ admin: true, college: true });
        } catch (error) {
            setMessage(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAdmin = async () => {
        setLoading(true);
        setMessage('');
        
        try {
            await createTestAdmin();
            setMessage('✅ Admin user created successfully!');
            setCreatedData(prev => ({ ...prev, admin: true }));
        } catch (error) {
            setMessage(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCollege = async () => {
        setLoading(true);
        setMessage('');
        
        try {
            await createTestCollege();
            setMessage('✅ Test college created successfully!');
            setCreatedData(prev => ({ ...prev, college: true }));
        } catch (error) {
            setMessage(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSecondCollege = async () => {
        setLoading(true);
        setMessage('');
        
        try {
            await createSecondCollege();
            setMessage('✅ Second college created successfully!');
            setCreatedData(prev => ({ ...prev, secondCollege: true }));
        } catch (error) {
            setMessage(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <FaDatabase size={40} color="#007bff" />
                <h1 style={styles.title}>Test Data Setup</h1>
                <p style={styles.subtitle}>Create test data for development and testing</p>
            </div>

            <div style={styles.content}>
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Quick Setup</h3>
                    <button
                        onClick={handleCreateAll}
                        disabled={loading}
                        style={{
                            ...styles.primaryButton,
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Creating...' : 'Create All Test Data'}
                    </button>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Individual Setup</h3>
                    <div style={styles.buttonGroup}>
                        <button
                            onClick={handleCreateAdmin}
                            disabled={loading}
                            style={{
                                ...styles.secondaryButton,
                                opacity: loading ? 0.7 : 1,
                                backgroundColor: createdData.admin ? '#28a745' : '#dc3545'
                            }}
                        >
                            <FaUserShield size={16} />
                            {createdData.admin ? 'Admin Created' : 'Create Admin'}
                        </button>

                        <button
                            onClick={handleCreateCollege}
                            disabled={loading}
                            style={{
                                ...styles.secondaryButton,
                                opacity: loading ? 0.7 : 1,
                                backgroundColor: createdData.college ? '#28a745' : '#007bff'
                            }}
                        >
                            <FaUniversity size={16} />
                            {createdData.college ? 'College Created' : 'Create College'}
                        </button>

                        <button
                            onClick={handleCreateSecondCollege}
                            disabled={loading}
                            style={{
                                ...styles.secondaryButton,
                                opacity: loading ? 0.7 : 1,
                                backgroundColor: createdData.secondCollege ? '#28a745' : '#6f42c1'
                            }}
                        >
                            <FaUniversity size={16} />
                            {createdData.secondCollege ? 'Second College Created' : 'Create Second College'}
                        </button>
                    </div>
                </div>

                {message && (
                    <div style={{
                        ...styles.messageBox,
                        backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
                        borderColor: message.includes('✅') ? '#c3e6cb' : '#f5c6cb',
                        color: message.includes('✅') ? '#155724' : '#721c24'
                    }}>
                        {message}
                    </div>
                )}

                <div style={styles.credentialsBox}>
                    <h4 style={styles.credentialsTitle}>Test Credentials</h4>
                    <div style={styles.credentials}>
                        <div style={styles.credentialItem}>
                            <strong>Admin Login:</strong>
                            <br />
                            Email: admin123@gmail.com
                            <br />
                            Password: Admin123!@#
                        </div>
                        <div style={styles.credentialItem}>
                            <strong>College Login (Demo University):</strong>
                            <br />
                            Email: testcollege17594666175641@example.com
                            <br />
                            Password: [Set your own password for this college]
                        </div>
                        <div style={styles.credentialItem}>
                            <strong>College Login (Tech Innovation):</strong>
                            <br />
                            Email: info@techinnovation.edu
                            <br />
                            Password: [Set your own password for this college]
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '40px',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px'
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#333',
        margin: '20px 0 10px 0'
    },
    subtitle: {
        fontSize: '16px',
        color: '#666',
        margin: '0'
    },
    content: {
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    section: {
        marginBottom: '30px'
    },
    sectionTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
        margin: '0 0 15px 0'
    },
    primaryButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '15px 30px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        width: '100%'
    },
    buttonGroup: {
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap'
    },
    secondaryButton: {
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 20px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flex: '1',
        minWidth: '150px'
    },
    messageBox: {
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid',
        margin: '20px 0',
        fontSize: '14px'
    },
    credentialsBox: {
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '30px',
        border: '1px solid #e9ecef'
    },
    credentialsTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
        margin: '0 0 15px 0'
    },
    credentials: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
    },
    credentialItem: {
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '6px',
        border: '1px solid #e9ecef',
        fontSize: '14px',
        lineHeight: '1.5'
    }
};

export default TestDataSetup;
