// Utility script to create an initial admin user
// Run this script once to create your first admin account

import { handleSignUp } from '../Helper/firebaseHelper';

export const createInitialAdmin = async () => {
    try {
        const adminData = {
            name: "System Administrator",
            email: "admin@collegeportal.com", // Change this to your desired admin email
            password: "Admin123!@#", // Change this to your desired password
            phone: "+1234567890",
            organization: "College Portal System",
            role: 'admin',
            status: 'active',
            createdAt: new Date().toISOString()
        };

        console.log("Creating initial admin user...");
        const userData = await handleSignUp(adminData.email, adminData.password, adminData);
        
        console.log("✅ Admin user created successfully!");
        console.log("Admin Details:");
        console.log(`Email: ${adminData.email}`);
        console.log(`Password: ${adminData.password}`);
        console.log(`User ID: ${userData.uid}`);
        console.log("\n⚠️  IMPORTANT: Please change the default password after first login!");
        
        return userData;
    } catch (error) {
        console.error("❌ Error creating admin user:", error);
        
        if (error.code === 'auth/email-already-in-use') {
            console.log("ℹ️  Admin user already exists. You can use the existing credentials to login.");
        }
        
        throw error;
    }
};

// Instructions for using this script:
/*
1. Import this function in your main App.jsx or create a separate script
2. Call createInitialAdmin() once to create the first admin
3. After creation, you can use the admin signup page for additional admins
4. Make sure to change the default password after first login

Example usage:
import { createInitialAdmin } from './Utils/createAdminUser';

// Call this once to create the initial admin
createInitialAdmin()
    .then(() => console.log("Admin created successfully"))
    .catch((error) => console.error("Failed to create admin:", error));
*/
