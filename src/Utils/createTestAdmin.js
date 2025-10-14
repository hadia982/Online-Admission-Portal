// Test script to create an admin user in the users collection
// Run this once to create a test admin user

import { handleSignUp } from '../Helper/firebaseHelper';

export const createTestAdmin = async () => {
    try {
        const adminData = {
            fName: "Admin",
            lName: "User",
            email: "admin123@gmail.com", // Use the email from your sample data
            password: "Admin123!@#", // Change this to your desired password
            phone: "+1234567890",
            organization: "College Portal System",
            role: 'admin',
            status: 'active',
            createdAt: new Date().toISOString()
        };

        console.log("Creating test admin user...");
        const userData = await handleSignUp(adminData.email, adminData.password, adminData);
        
        console.log("✅ Test admin user created successfully!");
        console.log("Admin Details:");
        console.log(`Email: ${adminData.email}`);
        console.log(`Password: ${adminData.password}`);
        console.log(`User ID: ${userData.uid}`);
        console.log(`Role: ${userData.role}`);
        console.log("\n⚠️  IMPORTANT: Please change the default password after first login!");
        
        return userData;
    } catch (error) {
        console.error("❌ Error creating test admin user:", error);
        
        if (error.code === 'auth/email-already-in-use') {
            console.log("ℹ️  Admin user already exists. You can use the existing credentials to login.");
            console.log("Email: admin123@gmail.com");
            console.log("Password: Admin123!@#");
        }
        
        throw error;
    }
};

// Instructions for using this script:
/*
1. Import this function in your main App.jsx or create a separate script
2. Call createTestAdmin() once to create the test admin
3. Use these credentials to login:
   - Email: admin123@gmail.com
   - Password: Admin123!@#

Example usage:
import { createTestAdmin } from './Utils/createTestAdmin';

// Call this once to create the test admin
createTestAdmin()
    .then(() => console.log("Test admin created successfully"))
    .catch((error) => console.error("Failed to create test admin:", error));
*/
