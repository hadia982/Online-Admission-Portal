// import React, { useState, useEffect } from 'react';
// import { db, storage } from '../../firebase'; // Corrected firebase config path
// import { 
//     collection, 
//     addDoc, 
//     getDocs, 
//     doc, 
//     updateDoc, 
//     deleteDoc, 
//     serverTimestamp, 
//     query, 
//     orderBy 
// } from 'firebase/firestore';
// import { 
//     ref, 
//     uploadBytes, 
//     getDownloadURL, 
//     deleteObject 
// } from 'firebase/storage';
// import { FaPlus, FaEdit, FaTrash, FaTimes, FaUserGraduate } from 'react-icons/fa';
// import { uploadImageToCloudinary } from '../Helper/firebaseHelper';

// function SuccessStories() {
//     // State variables
//     const [stories, setStories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showModal, setShowModal] = useState(false);
//     const [editingStory, setEditingStory] = useState(null);
//     const [storyForm, setStoryForm] = useState({ studentName: '', journeyHighlight: '', storyText: '' });
//     const [studentPhoto, setStudentPhoto] = useState(null);
//     const [message, setMessage] = useState('');

//     // Firestore collection reference
//     const storiesCollectionRef = collection(db, 'successStories');

//     // Fetch stories from Firestore
//     const fetchStories = async () => {
//         setLoading(true);
//         const q = query(storiesCollectionRef, orderBy('createdAt', 'desc'));
//         const data = await getDocs(q);
//         setStories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//         setLoading(false);
//     };

//     // useEffect to fetch stories on component mount
//     useEffect(() => {
//         fetchStories();
//     }, []);

//     // Function to show a temporary message
//     const showTempMessage = (msg) => {
//         setMessage(msg);
//         setTimeout(() => setMessage(''), 3000);
//     };

//     // Handle file input change
//     const handleFileChange = (e) => {
//         if (e.target.files[0]) {
//             setStudentPhoto(e.target.files[0]);
//         }
//     };

//     // Handle text input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setStoryForm(prev => ({ ...prev, [name]: value }));
//     };

//     // Handle form submission (Add/Edit Story)
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!storyForm.studentName || !storyForm.storyText || !storyForm.journeyHighlight) {
//             alert('Please fill in all fields.');
//             return;
//         }

//         try {
//             let studentPhotoUrl = editingStory ? editingStory.studentPhotoUrl : '';

//             // If a new photo is uploaded, upload it to Firebase Storage
//             if (studentPhoto) {
//               const studentPhotoUrl = await   uploadImageToCloudinary(studentPhoto)


//               alert(studentPhotoUrl)
//                 // const photoRef = ref(storage, `success_stories/${Date.now()}_${studentPhoto.name}`);
//                 // await uploadBytes(photoRef, studentPhoto);
//                 // studentPhotoUrl = await getDownloadURL(photoRef);
//             }

//             const storyData = {
//                 ...storyForm,
//                 studentPhotoUrl,
//                 updatedAt: serverTimestamp()
//             };

//             if (editingStory) {
//                 // Update existing story
//                 const storyDoc = doc(db, 'successStories', editingStory.id);
//                 await updateDoc(storyDoc, storyData);
//                 showTempMessage('Success story updated successfully!');
//             } else {
//                 // Add new story
//                 storyData.createdAt = serverTimestamp();
//                 await addDoc(storiesCollectionRef, storyData);
//                 showTempMessage('Success story added successfully!');
//             }

//             closeModal();
//             fetchStories(); // Refresh the list

//         } catch (error) {
//             console.error('Error saving story:', error);
//             alert('An error occurred. Please try again.');
//         }
//     };

//     // Open the modal for editing a story
//     const handleEdit = (story) => {
//         setEditingStory(story);
//         setStoryForm({ 
//             studentName: story.studentName, 
//             journeyHighlight: story.journeyHighlight, 
//             storyText: story.storyText 
//         });
//         setShowModal(true);
//     };

//     // Handle deleting a story
//     const handleDelete = async (story) => {
//         if (window.confirm('Are you sure you want to delete this story?')) {
//             try {
//                 // Delete the photo from Firebase Storage
//                 if (story.studentPhotoUrl) {
//                     const photoRef = ref(storage, story.studentPhotoUrl);
//                     await deleteObject(photoRef).catch(err => {
//                         // It's okay if the file doesn't exist, just log it
//                         console.log('Could not delete photo from storage or it does not exist:', err.code);
//                     });
//                 }
                
//                 // Delete the document from Firestore
//                 const storyDoc = doc(db, 'successStories', story.id);
//                 await deleteDoc(storyDoc);
                
//                 showTempMessage('Story deleted successfully!');
//                 fetchStories(); // Refresh the list
//             } catch (error) {
//                 console.error('Error deleting story:', error);
//                 alert('Failed to delete story. Please try again.');
//             }
//         }
//     };

//     // Function to open the modal for adding a new story
//     // Function to open the modal for adding a new story
//     const openAddModal = () => {
//         setEditingStory(null);
//         // Pre-fill the form for easier testing
//         setStoryForm({ 
//             studentName: 'Jane Doe', 
//             journeyHighlight: 'A journey of a thousand miles begins with a single step.', 
//             storyText: 'Jane Doe joined our college with a passion for learning and graduated with honors. She is now a successful software engineer at a top tech company, and she credits her success to the strong foundation and supportive environment provided by our institution.' 
//         });
//         setStudentPhoto(null);
//         setShowModal(true);
//     };

//     // Function to close the modal
//     const closeModal = () => {
//         setShowModal(false);
//         setEditingStory(null);
//         setStudentPhoto(null);
//     };

//     if (loading) {
//         return <div style={styles.loadingContainer}>Loading...</div>;
//     }

//     return (
//         <div style={styles.container}>
//             {/* Page Header */}
//             <div style={styles.header}>
//                 <h1 style={styles.title}>College Success Stories</h1>
//                 <button onClick={openAddModal} style={styles.addButton}>
//                     <FaPlus /> Add New Story
//                 </button>
//             </div>

//             {/* Success Message */}
//             {message && <div style={styles.successMessage}>{message}</div>}

//             {/* Stories Grid */}
//             <div style={styles.storiesGrid}>
//                 {stories.length === 0 ? (
//                     <p>No success stories yet. Add one to get started!</p>
//                 ) : (
//                     stories.map((story) => (
//                         <div key={story.id} style={styles.storyCard}>
//                             <img src={story.studentPhotoUrl || 'https://via.placeholder.com/150'} alt={story.studentName} style={styles.studentPhoto} />
//                             <div style={styles.storyContent}>
//                                 <h3 style={styles.studentName}>{story.studentName}</h3>
//                                 <p style={styles.journeyHighlight}>"{story.journeyHighlight}"</p>
//                                 <p style={styles.storyText}>{story.storyText}</p>
//                                 <div style={styles.cardActions}>
//                                     <button onClick={() => handleEdit(story)} style={styles.editButton}><FaEdit /> Edit</button>
//                                     <button onClick={() => handleDelete(story)} style={styles.deleteButton}><FaTrash /> Delete</button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>

//             {/* Add/Edit Modal */}
//             {showModal && (
//                 <div style={styles.modalOverlay}>
//                     <div style={styles.modal}>
//                         <div style={styles.modalHeader}>
//                             <h2>{editingStory ? 'Edit Story' : 'Add New Story'}</h2>
//                             <button onClick={closeModal} style={styles.closeButton}><FaTimes /></button>
//                         </div>
//                         <form onSubmit={handleSubmit} style={styles.form}>
//                             <div style={styles.formGroup}>
//                                 <label>Student Name</label>
//                                 <input type="text" name="studentName" value={storyForm.studentName} onChange={handleInputChange} style={styles.input} required />
//                             </div>
//                             <div style={styles.formGroup}>
//                                 <label>Journey Highlight (a short quote)</label>
//                                 <input type="text" name="journeyHighlight" value={storyForm.journeyHighlight} onChange={handleInputChange} style={styles.input} required />
//                             </div>
//                             <div style={styles.formGroup}>
//                                 <label>Full Story</label>
//                                 <textarea name="storyText" value={storyForm.storyText} onChange={handleInputChange} style={styles.textarea} rows="6" required />
//                             </div>
//                             <div style={styles.formGroup}>
//                                 <label>Student Photo</label>
//                                 <input type="file" onChange={handleFileChange} style={styles.input} accept="image/*" />
//                                 {editingStory && editingStory.studentPhotoUrl && (
//                                     <img src={editingStory.studentPhotoUrl} alt="Current" style={{ width: '100px', marginTop: '10px' }} />
//                                 )}
//                             </div>
//                             <div style={styles.modalActions}>
//                                 <button type="button" onClick={closeModal} style={styles.cancelButton}>Cancel</button>
//                                 <button type="submit" style={styles.saveButton}>{editingStory ? 'Update Story' : 'Add Story'}</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// // Styles
// const styles = {
//     container: { padding: '2rem', fontFamily: 'Arial, sans-serif' },
//     header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
//     title: { fontSize: '2rem', color: '#333' },
//     addButton: { backgroundColor: '#007bff', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' },
//     successMessage: { backgroundColor: '#d4edda', color: '#155724', padding: '1rem', borderRadius: '5px', marginBottom: '1rem' },
//     storiesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
//     storyCard: { backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', overflow: 'hidden' },
//     studentPhoto: { width: '100%', height: '200px', objectFit: 'cover' },
//     storyContent: { padding: '1rem' },
//     studentName: { fontSize: '1.25rem', margin: '0 0 0.5rem 0' },
//     journeyHighlight: { fontStyle: 'italic', color: '#555', marginBottom: '1rem' },
//     storyText: { color: '#666', fontSize: '0.9rem' },
//     cardActions: { display: 'flex', gap: '0.5rem', marginTop: '1rem' },
//     editButton: { backgroundColor: '#ffc107', color: 'black', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' },
//     deleteButton: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' },
//     modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
//     modal: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '500px', maxWidth: '90%' },
//     modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
//     closeButton: { background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' },
//     form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
//     formGroup: { display: 'flex', flexDirection: 'column' },
//     input: { padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' },
//     textarea: { padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' },
//     modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' },
//     cancelButton: { backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '5px', cursor: 'pointer' },
//     saveButton: { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '5px', cursor: 'pointer' },
//     loadingContainer: { textAlign: 'center', padding: '2rem', fontSize: '1.2rem' }
// };

// export default SuccessStories;
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
// import { useSelector } from 'react-redux'; // Uncomment if using Redux for collegeId

function SuccessStories() {
    const [stories, setStories] = useState([]);
    const [form, setForm] = useState({
        studentName: '',
        storyText: '',
        journeyHighlight: '',
        studentPhotoUrl: ''
    });
    // Replace with your logic to get collegeId (e.g., from Redux, Context, or props)
    const collegeId = "LoBPS6SN6uY0AE9IE1iieMXWhDA3"; // Example: Iqra College

    useEffect(() => {
        const fetchStories = async () => {
            const snapshot = await getDocs(collection(db, 'successStories'));
            setStories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchStories();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.studentName || !form.storyText || !form.journeyHighlight) {
            alert('Please fill all fields');
            return;
        }
        await addDoc(collection(db, 'successStories'), {
            ...form,
            collegeId, // <-- Insert collegeId here
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        setForm({
            studentName: '',
            storyText: '',
            journeyHighlight: '',
            studentPhotoUrl: ''
        });
        // Refresh stories
        const snapshot = await getDocs(collection(db, 'successStories'));
        setStories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Success Stories</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                <input
                    type="text"
                    name="studentName"
                    placeholder="Student Name"
                    value={form.studentName}
                    onChange={handleChange}
                    style={{ marginRight: '1rem' }}
                />
                <input
                    type="text"
                    name="journeyHighlight"
                    placeholder="Journey Highlight"
                    value={form.journeyHighlight}
                    onChange={handleChange}
                    style={{ marginRight: '1rem' }}
                />
                <input
                    type="text"
                    name="studentPhotoUrl"
                    placeholder="Photo URL"
                    value={form.studentPhotoUrl}
                    onChange={handleChange}
                    style={{ marginRight: '1rem' }}
                />
                <textarea
                    name="storyText"
                    placeholder="Story Text"
                    value={form.storyText}
                    onChange={handleChange}
                    style={{ marginRight: '1rem', verticalAlign: 'top' }}
                />
                <button type="submit">Add Story</button>
            </form>
            <div>
                {stories.map(story => (
                    <div key={story.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: '1rem', marginBottom: '1rem' }}>
                        <h3>{story.studentName}</h3>
                        <p><b>Highlight:</b> {story.journeyHighlight}</p>
                        <p>{story.storyText}</p>
                        {story.studentPhotoUrl && <img src={story.studentPhotoUrl} alt="Student" style={{ width: 80, borderRadius: 8 }} />}
                        <p><b>College ID:</b> {story.collegeId}</p>
                        <p><b>Created At:</b> {story.createdAt?.toDate?.().toLocaleString?.() || ''}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SuccessStories;
