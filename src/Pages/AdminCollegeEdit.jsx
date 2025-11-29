import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getCollegeByIdForAdmin, updateCollegeInfo, updateCollegeStatus } from '../Helper/firebaseHelper';

function AdminCollegeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [college, setCollege] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getCollegeByIdForAdmin(id);
        setCollege(data);
      } catch (e) {
        setError('Failed to load college');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollege(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!college) return;
    try {
      setSaving(true);
      const { id: docId, ...updateData } = college;
      await updateCollegeInfo(docId, updateData);
      navigate('/admin-colleges');
    } catch (err) {
      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleApprove = async () => {
    try {
      await updateCollegeStatus(id, 'approved');
      setCollege(prev => ({ ...prev, status: 'approved' }));
    } catch (e) {
      setError('Failed to approve college');
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ padding: 20, color: 'red' }}>{error}</div>;
  if (!college) return <div style={{ padding: 20 }}>College not found.</div>;

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1>Edit College</h1>
        <Link to="/admin-colleges" style={{ color: '#007bff' }}>← Back to list</Link>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <span style={{ padding: '6px 10px', background: '#e9ecef', borderRadius: 6 }}>Status: {college.status || '—'}</span>
        {college.status !== 'approved' && (
          <button onClick={handleApprove} style={{ padding: '8px 12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
            Approve
          </button>
        )}
      </div>

      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        <div>
          <label>College Name</label>
          <input name="collegeName" value={college.collegeName || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label>Email</label>
          <input name="email" value={college.email || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label>Phone</label>
          <input name="phone" value={college.phone || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label>Type</label>
          <input name="type" value={college.type || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label>Established Year</label>
          <input name="establishedYear" value={college.establishedYear || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label>Website</label>
          <input name="website" value={college.website || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label>Address</label>
          <input name="address" value={college.address || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label>City</label>
          <input name="city" value={college.city || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label>State</label>
          <input name="state" value={college.state || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label>Postal Code</label>
          <input name="postalCode" value={college.postalCode || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label>Description</label>
          <textarea name="description" value={college.description || ''} onChange={handleChange} style={{ ...inputStyle, minHeight: 100 }} />
        </div>

        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12 }}>
          <button type="submit" disabled={saving} style={{ padding: '10px 16px', background: '#003366', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => navigate('/admin-colleges')} style={{ padding: '10px 16px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '2px solid #e1e5e9',
  borderRadius: 8,
  fontSize: 14,
  outline: 'none'
};

export default AdminCollegeEdit;