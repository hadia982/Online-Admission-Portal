import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { uploadImageToCloudinary } from "../Helper/firebaseHelper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const CollegeSignup = () => {
    // State for all form fields
    const [formData, setFormData] = useState({
        collegeName: "Demo University",
        email: `testcollege${Date.now()}@example.com`,
        password: "password123",
        phone: "+1-555-123-4567",
        address: "123 Education Lane",
        city: "Learningville",
        state: "CA",
        country: "USA",
        postalCode: "90210",
        establishedYear: "1998",
        type: "private", // Default value
        website: "https://www.demouniversity.edu",
        description: "A leading institution for demo purposes, providing excellent project examples.",
    });

    // State for file uploads
    const [logo, setLogo] = useState(null);
    const [registrationCertificate, setRegistrationCertificate] = useState(null);

    // State for loading, error and success messages
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files[0]) {
            if (name === "logo") {
                setLogo(files[0]);
            } else if (name === "registrationCertificate") {
                setRegistrationCertificate(files[0]);
            }
        }
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        // Basic validation
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);

        try {
            // 1. Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // 2. Upload files to Cloudinary
            const logoUrl = logo ? await uploadImageToCloudinary(logo) : null;
            const registrationCertificateUrl = registrationCertificate ? await uploadImageToCloudinary(registrationCertificate) : null;

            // 3. Save college profile in Firestore
            const collegeData = {
                ...formData,
                uid: user.uid,
                logoUrl,
                documents: {
                    registrationCertificateUrl,
                },
                status: "pending", // Initial status
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };
            // Remove password from the data to be stored in Firestore
            delete collegeData.password;

            // Use uid as the document ID in 'colleges' collection
            await setDoc(doc(db, "colleges", user.uid), collegeData);

            setSuccess(true);
        } catch (err) {
            setError(err.message);
            console.error("Signup Error:", err);
        } finally {
            setLoading(false);
        }
    };

    // If registration is successful, show a message
    if (success) {
        return (
            <div style={styles.container}>
                <div style={styles.formContainer}>
                    <h2 style={styles.title}>✅ Registration Submitted!</h2>
                    <p style={styles.subtitle}>
                        Thank you for registering. Your application is under review.
                        Please wait for admin approval before you can log in.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>🎓 College Signup</h2>
                <p style={styles.subtitle}>Join our network by providing your college details.</p>

                <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                    {/* Form fields */}
                    <input style={styles.input} type="text" name="collegeName" placeholder="College Name" value={formData.collegeName} onChange={handleChange} required />
                    <input style={styles.input} type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                    <input style={styles.input} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <input style={styles.input} type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                    <input style={styles.input} type="text" name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} required />
                    <input style={styles.input} type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                    <input style={styles.input} type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                    <input style={styles.input} type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
                    <input style={styles.input} type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
                    <input style={styles.input} type="number" name="establishedYear" placeholder="Established Year" value={formData.establishedYear} onChange={handleChange} required />
                    <input style={styles.input} type="url" name="website" placeholder="Website URL" value={formData.website} onChange={handleChange} />
                    <textarea style={styles.input} name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows="3"></textarea>
                    
                    <select name="type" style={styles.input} onChange={handleChange} value={formData.type}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>

                    {/* File Inputs */}
                    <label style={styles.label}>College Logo (Optional)</label>
                    <input style={styles.input} type="file" name="logo" onChange={handleFileChange} accept="image/*" />

                    <label style={styles.label}>Registration Certificate (Optional)</label>
                    <input style={styles.input} type="file" name="registrationCertificate" onChange={handleFileChange} accept=".pdf,.jpg,.png" />

                    {error && <p style={styles.errorText}>{error}</p>}

                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? "Submitting..." : "Register College"}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Basic styling
const styles = {
    container: {
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 0",
    },
    formContainer: {
        width: "90%",
        maxWidth: "600px",
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    title: { textAlign: "center", color: "#0088cc" },
    subtitle: { textAlign: "center", fontSize: "14px", color: "#555", marginTop: "5px" },
    input: {
        width: "100%",
        padding: "12px",
        margin: "8px 0",
        borderRadius: "6px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
    },
    label: { 
        display: 'block', 
        marginTop: '15px', 
        color: '#333', 
        fontWeight: 'bold' 
    },
    button: {
        marginTop: "20px",
        width: "100%",
        padding: "12px",
        backgroundColor: "#0088cc",
        color: "white",
        fontWeight: "bold",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginTop: "10px",
    },
};

export default CollegeSignup;

