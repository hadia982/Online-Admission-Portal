// Script to create a second college in the colleges collection
// Run this to add another college to the database

import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

export const createSecondCollege = async () => {
    try {
        const collegeData = {
            address: "456 Innovation Drive",
            city: "Tech Valley",
            collegeName: "Tech Innovation Institute",
            country: "Canada",
            createdAt: serverTimestamp(),
            description: "A cutting-edge technology institute focused on innovation, research, and preparing students for the digital future. We offer advanced programs in computer science, engineering, and emerging technologies.",
            documents: {
                registrationCertificateUrl: "https://res.cloudinary.com/drrr99dz9/image/upload/v1759467037/jup8eoq4wlerv71u50nf.png",
                affiliationCertificateUrl: "https://res.cloudinary.com/drrr99dz9/image/upload/v1759467037/jup8eoq4wlerv71u50nf.png"
            },
            email: "info@techinnovation.edu",
            establishedYear: "2010",
            logoUrl: "https://res.cloudinary.com/drrr99dz9/image/upload/v1759467036/zlxbtwhqknqj3b4onmpv.png",
            phone: "+1-416-555-9876",
            postalCode: "M5H 2N2",
            state: "Ontario",
            status: "pending", // This one will be pending for testing approval
            type: "private",
            uid: "TECH_INNOVATION_2024_001", // Different UID
            updatedAt: serverTimestamp(),
            website: "https://www.techinnovation.edu"
        };

        console.log("Creating second college...");
        
        // Create the college document in the colleges collection
        const docRef = doc(db, "colleges", collegeData.uid);
        await setDoc(docRef, collegeData);
        
        console.log("✅ Second college created successfully!");
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
        console.error("❌ Error creating second college:", error);
        throw error;
    }
};

// Instructions for using this script:
/*
1. Import this function in your main App.jsx or create a separate script
2. Call createSecondCollege() once to create the second college
3. This college will have status "pending" so you can test the approval process

Example usage:
import { createSecondCollege } from './Utils/createSecondCollege';

// Call this once to create the second college
createSecondCollege()
    .then(() => console.log("Second college created successfully"))
    .catch((error) => console.error("Failed to create second college:", error));
*/
