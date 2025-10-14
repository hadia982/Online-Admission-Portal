
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

function StdMg() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState(null);

    // Replace with your collegeId logic (e.g., from Redux or context)
    const collegeId = "LoBPS6SN6uY0AE9IE1iieMXWhDA3"; // Example: Iqra College

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            const q = query(
                collection(db, 'applications'),
                where('collegeId', '==', collegeId)
            );
            const snapshot = await getDocs(q);
            setApplications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        };
        fetchApplications();
    }, [collegeId]);

    const handleViewForm = (app) => {
        setSelectedApp(app);
    };

    const handleCloseForm = () => {
        setSelectedApp(null);
    };

    const handleStatusChange = async (id, status) => {
        try {
            await updateDoc(doc(db, 'applications', id), { status });
            setApplications(applications.map(app => app.id === id ? { ...app, status } : app));
        } catch (err) {
            alert('Failed to update status');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Student Applications</h2>
            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(app => (
                            <tr key={app.id} style={{ borderBottom: '1px solid #ccc' }}>
                                <td>{app.firstName} {app.lastName}</td>
                                <td>{app.courseName}</td>
                                <td>{app.status}</td>
                                <td>
                                    <button onClick={() => handleViewForm(app)} style={{ marginRight: '8px' }}>View Form</button>
                                    <button onClick={() => handleStatusChange(app.id, 'approved')} style={{ marginRight: '4px', background: '#28a745', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>Approve</button>
                                    <button onClick={() => handleStatusChange(app.id, 'rejected')} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal for viewing application details */}
            {selectedApp && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', maxWidth: '600px', width: '100%', position: 'relative' }}>
                        <button onClick={handleCloseForm} style={{ position: 'absolute', top: 10, right: 10, fontSize: '1.2rem', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
                        <h3>Application Details</h3>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr><td><b>Name:</b></td><td>{selectedApp.firstName} {selectedApp.lastName}</td></tr>
                                <tr><td><b>Email:</b></td><td>{selectedApp.email}</td></tr>
                                <tr><td><b>Course:</b></td><td>{selectedApp.courseName}</td></tr>
                                <tr><td><b>Gender:</b></td><td>{selectedApp.gender}</td></tr>
                                <tr><td><b>Date of Birth:</b></td><td>{selectedApp.dateOfBirth}</td></tr>
                                <tr><td><b>Address:</b></td><td>{selectedApp.address}, {selectedApp.city}, {selectedApp.state}, {selectedApp.country}, {selectedApp.postalCode}</td></tr>
                                <tr><td><b>Phone:</b></td><td>{selectedApp.phone}</td></tr>
                                <tr><td><b>Nationality:</b></td><td>{selectedApp.nationality}</td></tr>
                                <tr><td><b>Previous Education:</b></td><td>{selectedApp.previousEducation} ({selectedApp.previousGrade})</td></tr>
                                <tr><td><b>Previous Institution:</b></td><td>{selectedApp.previousInstitution}</td></tr>
                                <tr><td><b>Previous Year:</b></td><td>{selectedApp.previousYear}</td></tr>
                                <tr><td><b>Emergency Contact:</b></td><td>{selectedApp.emergencyContactName} ({selectedApp.emergencyContactRelation}) - {selectedApp.emergencyContactPhone}</td></tr>
                                <tr><td><b>Motivation:</b></td><td>{selectedApp.motivation}</td></tr>
                                <tr><td><b>Additional Info:</b></td><td>{selectedApp.additionalInfo}</td></tr>
                                <tr><td><b>Photo:</b></td><td><img src={selectedApp.photoFile} alt="Student" style={{ width: '80px', borderRadius: '8px' }} /></td></tr>
                                <tr><td><b>Documents:</b></td><td><a href={selectedApp.documentsFile} target="_blank" rel="noopener noreferrer">View Document</a></td></tr>
                                <tr><td><b>Status:</b></td><td>{selectedApp.status}</td></tr>
                            </tbody>
                        </table>
                        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                            <button onClick={() => handleStatusChange(selectedApp.id, 'approved')} style={{ marginRight: '8px', background: '#28a745', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px' }}>Approve</button>
                            <button onClick={() => handleStatusChange(selectedApp.id, 'rejected')} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px' }}>Reject</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StdMg;