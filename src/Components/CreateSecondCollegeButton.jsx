import React, { useState } from 'react';
import { createSecondCollege } from '../Utils/createSecondCollege';

const CreateSecondCollegeButton = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleCreateCollege = async () => {
        setLoading(true);
        setMessage('');
        
        try {
            await createSecondCollege();
            setMessage('✅ Second college created successfully! Check console for details.');
        } catch (error) {
            setMessage(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            backgroundColor: '#fff',
            border: '2px solid #6f42c1',
            borderRadius: '8px',
            padding: '15px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            maxWidth: '300px'
        }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#6f42c1' }}>
                Create Second College
            </h4>
            <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>
                Click to create Tech Innovation Institute (pending status)
            </p>
            <button
                onClick={handleCreateCollege}
                disabled={loading}
                style={{
                    backgroundColor: '#6f42c1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    fontSize: '14px'
                }}
            >
                {loading ? 'Creating...' : 'Create Second College'}
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

export default CreateSecondCollegeButton;
