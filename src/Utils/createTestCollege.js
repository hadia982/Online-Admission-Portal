// Test script to create a test college in the colleges collection
// Run this once to create a test college

import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

export const createTestCollege = async () => {
    try {
        const collegeData = {
            address: "123 Education Lane",
            city: "Learningville",
            collegeName: "Demo University",
            country: "USA",
            createdAt: serverTimestamp(),
            description: "A leading institution for demo purposes, providing excellent project examples.",
            documents: {
                registrationCertificateUrl: "https://res.cloudinary.com/drrr99dz9/image/upload/v1759467037/jup8eoq4wlerv71u50nf.png"
            },
            email: "testcollege17594666175641@example.com",
            establishedYear: "1998",
            logoUrl: "https://res.cloudinary.com/drrr99dz9/image/upload/v1759467036/zlxbtwhqknqj3b4onmpv.png",
            phone: "+1-555-123-4567",
            postalCode: "90210",
            state: "CA",
            status: "approved", // Fixed the typo from "approve " to "approved"
            type: "private",
            uid: "hT8sghurB0YCcy3mc2IWVPrqfnB3",
            updatedAt: serverTimestamp(),
            website: "https://www.demouniversity.edu"
        };

        console.log("Creating test college...");
        
        // Create the college document in the colleges collection
        const docRef = doc(db, "colleges", collegeData.uid);
        await setDoc(docRef, collegeData);
        
        console.log("✅ Test college created successfully!");
        console.log("College Details:");
        console.log(`College Name: ${collegeData.collegeName}`);
        console.log(`Email: ${collegeData.email}`);
        console.log(`UID: ${collegeData.uid}`);
        console.log(`Status: ${collegeData.status}`);
        console.log(`Type: ${collegeData.type}`);
        console.log(`Location: ${collegeData.city}, ${collegeData.state}, ${collegeData.country}`);
        console.log(`Website: ${collegeData.website}`);
        
        return collegeData;
    } catch (error) {
        console.error("❌ Error creating test college:", error);
        throw error;
    }
};

// Instructions for using this script:
/*
1. Import this function in your main App.jsx or create a separate script
2. Call createTestCollege() once to create the test college
3. The college will be created with status "approved" so it can be used for testing

Example usage:
import { createTestCollege } from './Utils/createTestCollege';

// Call this once to create the test college
createTestCollege()
    .then(() => console.log("Test college created successfully"))
    .catch((error) => console.error("Failed to create test college:", error));
*/
