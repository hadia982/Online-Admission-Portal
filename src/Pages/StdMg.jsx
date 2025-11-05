import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { collection, getDocs, query, where, orderBy, updateDoc, doc } from 'firebase/firestore';

function StdMg() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all'); // all | pending | approved | rejected
  const [search, setSearch] = useState('');

  // read logged in college id from redux (adjust path if different)
  const loggedInCollegeId = useSelector(state => state?.home?.user?.uid) || '';

  const formatDate = (ts) => {
    if (!ts) return '';
    try {
      return typeof ts.toDate === 'function' ? ts.toDate().toLocaleString() : new Date(ts).toLocaleString();
    } catch {
      return String(ts);
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const appsRef = collection(db, 'applications');
      // try query by collegeId and ordered by appliedAt
      let q;
      if (loggedInCollegeId) {
        try {
          q = query(appsRef, where('collegeId', '==', loggedInCollegeId), orderBy('appliedAt', 'desc'));
          const snap = await getDocs(q);
          setApplications(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (err) {
          // fallback without orderBy if index missing
          const q2 = query(appsRef, where('collegeId', '==', loggedInCollegeId));
          const snap = await getDocs(q2);
          setApplications(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        }
      } else {
        // no college id -> show none or fetch all (admin). here fetch none and end loading
        setApplications([]);
      }
    } catch (err) {
      console.error('Failed to fetch applications:', err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [loggedInCollegeId]);

  const handleViewForm = (app) => setSelectedApp(app);
  const handleCloseForm = () => setSelectedApp(null);

  const handleStatusChange = async (id, status) => {
    try {
      await updateDoc(doc(db, 'applications', id), { status });
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update status');
    }
  };

  // filtered + searched applications for display
  const visibleApps = applications
    .filter(a => statusFilter === 'all' ? true : (a.status === statusFilter))
    .filter(a => {
      if (!search.trim()) return true;
      const q = search.trim().toLowerCase();
      return `${a.firstName || ''} ${a.lastName || ''}`.toLowerCase().includes(q) ||
             (a.email || '').toLowerCase().includes(q);
    });

  if (loading) return <div style={{ padding: 20 }}>Loading applications...</div>;

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2>Student Applications</h2>

      <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
        <div>
          <label style={{ marginRight: 8 }}>Status:</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <input
            placeholder="Search by name or email"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '6px 8px', width: 260 }}
          />
        </div>
      </div>

      {visibleApps.length === 0 ? (
        <div>No applications found.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
              <th style={{ padding: '8px' }}>Name</th>
              <th style={{ padding: '8px' }}>Course</th>
              <th style={{ padding: '8px' }}>Applied At</th>
              <th style={{ padding: '8px' }}>Phone / Email</th>
              <th style={{ padding: '8px' }}>Status</th>
              <th style={{ padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleApps.map(app => (
              <tr key={app.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '8px' }}>{app.firstName} {app.lastName}</td>
                <td style={{ padding: '8px' }}>{app.courseName || app.courseId}</td>
                <td style={{ padding: '8px' }}>{formatDate(app.appliedAt)}</td>
                <td style={{ padding: '8px' }}>{app.phone} / {app.email}</td>
                <td style={{ padding: '8px' }}>{app.status}</td>
                <td style={{ padding: '8px' }}>
                  <button onClick={() => handleViewForm(app)} style={{ marginRight: 8 }}>View</button>
                  <button onClick={() => handleStatusChange(app.id, 'approved')} style={{ marginRight: 6, background: '#28a745', color: '#fff', border: 'none', padding: '6px 8px', borderRadius: 4 }}>Approve</button>
                  <button onClick={() => handleStatusChange(app.id, 'rejected')} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '6px 8px', borderRadius: 4 }}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedApp && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: '#fff', padding: 20, borderRadius: 8, maxWidth: 700, width: '95%' }}>
            <button onClick={handleCloseForm} style={{ float: 'right' }}>Close</button>
            <h3>Application Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div><b>Name:</b> {selectedApp.firstName} {selectedApp.lastName}</div>
              <div><b>Email:</b> {selectedApp.email}</div>
              <div><b>Course:</b> {selectedApp.courseName}</div>
              <div><b>Applied At:</b> {formatDate(selectedApp.appliedAt)}</div>
              <div><b>Phone:</b> {selectedApp.phone}</div>
              <div><b>City / State:</b> {selectedApp.city} / {selectedApp.state}</div>
              <div style={{ gridColumn: '1 / -1' }}><b>Address:</b> {selectedApp.address}</div>
              <div style={{ gridColumn: '1 / -1' }}><b>Motivation:</b> {selectedApp.motivation}</div>
              <div style={{ gridColumn: '1 / -1' }}><b>Additional Info:</b> {selectedApp.additionalInfo}</div>
              <div style={{ gridColumn: '1 / -1' }}>
                <b>Documents:</b>{' '}
                {selectedApp.documentsFile && selectedApp.documentsFile !== 'null'
                  ? <a href={selectedApp.documentsFile} target="_blank" rel="noreferrer">View</a>
                  : 'No document'}
              </div>
            </div>

            <div style={{ marginTop: 12, textAlign: 'right' }}>
              <button onClick={() => handleStatusChange(selectedApp.id, 'approved')} style={{ marginRight: 8, background: '#28a745', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 4 }}>Approve</button>
              <button onClick={() => handleStatusChange(selectedApp.id, 'rejected')} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 4 }}>Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StdMg;