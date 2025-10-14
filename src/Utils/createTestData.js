// Comprehensive test script to create both admin user and test college
// Run this once to create test data for the application

import { createTestAdmin } from './createTestAdmin';
import { createTestCollege } from './createTestCollege';

export const createAllTestData = async () => {
    try {
        console.log("🚀 Starting to create test data...");
        
        // Create test admin user
        console.log("\n📝 Creating test admin user...");
        const adminUser = await createTestAdmin();
        
        // Create test college
        console.log("\n🏫 Creating test college...");
        const testCollege = await createTestCollege();
        
        console.log("\n✅ All test data created successfully!");
        console.log("\n📋 Test Credentials:");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🔐 ADMIN LOGIN:");
        console.log("   Email: admin123@gmail.com");
        console.log("   Password: Admin123!@#");
        console.log("   Role: admin (from users collection)");
        console.log("\n🏫 COLLEGE LOGIN:");
        console.log("   Email: testcollege17594666175641@example.com");
        console.log("   Password: [Use the password you set for this college]");
        console.log("   Role: college (from colleges collection)");
        console.log("   College: Demo University");
        console.log("   Status: approved");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        
        return {
            adminUser,
            testCollege
        };
    } catch (error) {
        console.error("❌ Error creating test data:", error);
        throw error;
    }
};

// Individual functions for creating specific test data
export { createTestAdmin, createTestCollege };

// Instructions for using this script:
/*
1. Import this function in your main App.jsx or create a separate script
2. Call createAllTestData() once to create both admin and college test data
3. Use the provided credentials to test the role-based authentication

Example usage:
import { createAllTestData } from './Utils/createTestData';

// Call this once to create all test data
createAllTestData()
    .then(() => console.log("All test data created successfully"))
    .catch((error) => console.error("Failed to create test data:", error));
*/
