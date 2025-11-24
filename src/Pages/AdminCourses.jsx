import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [collegesById, setCollegesById] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const courseList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(courseList);
      } catch (err) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
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
        // keep silent; courses can still render
      }
    };
    fetchColleges();
  }, []);

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>{error}</div>;

  const visibleCourses = courses.filter((course) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.trim().toLowerCase();
    const collegeName = (collegesById[course.collegeId] || '').toLowerCase();
    return (
      (course.title || '').toLowerCase().includes(q) ||
      (course.department || '').toLowerCase().includes(q) ||
      (course.description || '').toLowerCase().includes(q) ||
      String(course.collegeId || '').toLowerCase().includes(q) ||
      collegeName.includes(q)
    );
  });

  return (
    <div style={{ padding: '24px' }}>
      <h1>All College Courses</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '12px 0' }}>
        <input
          type="text"
          placeholder="Search by title, department, or college"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px 12px', width: 320, border: '2px solid #e1e5e9', borderRadius: 8 }}
        />
      </div>
      {visibleCourses.length === 0 ? (
        <div>No courses found.</div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
          {visibleCourses.map(course => (
            <div key={course.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', minWidth: '320px', background: '#fff' }}>
              <h2>{course.title}</h2>
              <p><strong>Department:</strong> {course.department}</p>
              <p><strong>Type:</strong> {course.courseType}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Eligibility:</strong> {course.eligibility}</p>
              <p><strong>Fees:</strong> ₹{course.fees}</p>
              <p><strong>Intake Capacity:</strong> {course.intakeCapacity}</p>
              <p><strong>Admission Start:</strong> {course.admissionStart?.toDate?.().toLocaleString?.() || String(course.admissionStart)}</p>
              <p><strong>Admission End:</strong> {course.admissionEnd?.toDate?.().toLocaleString?.() || String(course.admissionEnd)}</p>
              <p><strong>Description:</strong> {course.description}</p>
              <p><strong>College:</strong> {collegesById[course.collegeId] ? `${collegesById[course.collegeId]} (ID: ${course.collegeId})` : course.collegeId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminCourses;
