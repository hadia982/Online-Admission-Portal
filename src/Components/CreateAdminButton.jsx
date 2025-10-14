import React, { useState } from 'react';
import { createInitialAdmin } from '../Utils/createAdminUser';

const CreateAdminButton = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleCreateAdmin = async () => {
        setLoading(true);
        setMessage('');
        
        try {
            await createInitialAdmin();
            setMessage('✅ Admin user created successfully! Check console for details.');
        } catch (error) {
            setMessage(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#fff',
            border: '2px solid #dc3545',
            borderRadius: '8px',
            padding: '15px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            maxWidth: '300px'
        }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>
                Create Initial Admin
            </h4>
            <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>
                Click to create the first admin user with default credentials
            </p>
            <button
                onClick={handleCreateAdmin}
                disabled={loading}
                style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    fontSize: '14px'
                }}
            >
                {loading ? 'Creating...' : 'Create Admin'}
            </button>
            {message && (
                <p style={{
                    margin: '10px 0 0 0',
                    fontSize: '12px',
                    color: message.includes('✅') ? '#28a745' : '#dc3545'
                }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default CreateAdminButton;
