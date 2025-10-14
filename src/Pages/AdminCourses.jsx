import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '24px' }}>
      <h1>All College Courses</h1>
      {courses.length === 0 ? (
        <div>No courses found.</div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
          {courses.map(course => (
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
              <p><strong>College ID:</strong> {course.collegeId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminCourses;
