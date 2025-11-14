import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (ts) => {
    if (!ts) return '';
    try {
      return typeof ts.toDate === 'function' ? ts.toDate().toLocaleString() : new Date(ts).toLocaleString();
    } catch {
      return String(ts);
    }
  };

  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const colRef = collection(db, 'applications');
        const q = query(colRef, orderBy('appliedAt', 'desc'));
        const snap = await getDocs(q);
        if (!mounted) return;
        setApplications(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Error fetching applications (ordered):', err);
        try {
          const snap = await getDocs(collection(db, 'applications'));
          if (!mounted) return;
          setApplications(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (e) {
          console.error('Fallback fetch failed:', e);
          if (!mounted) return;
          setError('Failed to load applications.');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAll();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading applications...</div>;
  if (error) return <div style={{ padding: 20, color: 'red' }}>{error}</div>;
  if (applications.length === 0) return <div style={{ padding: 20 }}>No applications found.</div>;

  const visibleApps = applications.filter(app => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.trim().toLowerCase();
    const name = (app.collegeName || '').toLowerCase();
    return name.includes(q);
  });

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>All Student Applications</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search by college name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px 12px', width: 300, border: '2px solid #e1e5e9', borderRadius: 8 }}
        />
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {visibleApps.map(app => (
          <div key={app.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <strong>{app.firstName} {app.lastName}</strong>
              <span style={{ color: '#666' }}>{formatDate(app.appliedAt)}</span>
            </div>
            <div style={{ fontSize: 14, color: '#333' }}>
              <div><b>College:</b> {app.collegeName || app.collegeId}</div>
              <div><b>Course:</b> {app.courseName || app.courseId}</div>
              <div><b>Email:</b> {app.email}</div>
              <div><b>Phone:</b> {app.phone}</div>
              <div><b>City:</b> {app.city}, <b>State:</b> {app.state}</div>
              <div style={{ marginTop: 8 }}><b>Motivation:</b> {app.motivation}</div>
              <div style={{ marginTop: 8, color: '#555' }}><b>Document:</b> {app.documentsFile && app.documentsFile !== 'null' ? <a href={app.documentsFile} target="_blank" rel="noreferrer">View</a> : 'No document'}</div>
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: '#666' }}><b>Doc ID:</b> {app.id} — <b>Status:</b> {app.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminApplications;