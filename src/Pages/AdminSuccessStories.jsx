import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

function AdminSuccessStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collegesById, setCollegesById] = useState({});

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
    const fetchAllStories = async () => {
      setLoading(true);
      setError(null);
      try {
        const colRef = collection(db, 'successStories');
        const q = query(colRef, orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        if (!mounted) return;
        setStories(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Error fetching successStories (ordered):', err);
        try {
          const snap = await getDocs(collection(db, 'successStories'));
          if (!mounted) return;
          setStories(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (e) {
          console.error('Fallback fetch failed:', e);
          if (!mounted) return;
          setError('Failed to load success stories.');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAllStories();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const snap = await getDocs(collection(db, 'colleges'));
        const map = {};
        snap.forEach(d => {
          const data = d.data();
          map[d.id] = data.collegeName || data.name || '';
        });
        setCollegesById(map);
      } catch (e) {
      }
    };
    fetchColleges();
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading success stories...</div>;
  if (error) return <div style={{ padding: 20, color: 'red' }}>{error}</div>;
  if (stories.length === 0) return <div style={{ padding: 20 }}>No success stories found.</div>;

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>All Success Stories</h2>
      <div style={{ display: 'grid', gap: 16 }}>
        {stories.map(story => (
          <div key={story.id} style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden', display: 'flex', gap: 12 }}>
            <div style={{ minWidth: 180, maxWidth: 220 }}>
              <img
                src={story.studentPhotoUrl || 'https://via.placeholder.com/200x140?text=No+Photo'}
                alt={story.studentName || 'Student'}
                style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ padding: 12, flex: 1 }}>
              <h3 style={{ margin: '0 0 6px' }}>{story.studentName || '—'}</h3>
              <div style={{ fontStyle: 'italic', color: '#555', marginBottom: 8 }}>{story.journeyHighlight || ''}</div>
              <p style={{ margin: '0 0 8px', color: '#333' }}>{story.storyText || ''}</p>
              <div style={{ fontSize: 13, color: '#666', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <div><strong>College ID:</strong> {story.collegeId || '—'}</div>
                <div><strong>College:</strong> {collegesById[story.collegeId] || story.collegeName || '—'}</div>
                <div><strong>Created:</strong> {formatDate(story.createdAt)}</div>
                <div><strong>Updated:</strong> {formatDate(story.updatedAt)}</div>
                <div><strong>Doc ID:</strong> {story.id}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSuccessStories;