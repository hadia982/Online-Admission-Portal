// firestoreService.js
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase"; // make sure you export both db and auth in firebase.js

//--------------------------------
// 🔹 Firestore Services
//--------------------------------

// ✅ Add data
export const addData = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// ✅ Get all data
export const getAllData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};

// ✅ Get single document
export const getDataById = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
};

// ✅ Update document
export const updateData = async (collectionName, id, newData) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, newData);
    console.log("Document updated successfully");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// ✅ Delete document
export const deleteData = async (collectionName, id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    console.log("Document deleted successfully");
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

//--------------------------------
// 🔹 Firebase Auth Services
//--------------------------------

// ✅ Sign Up
export const handleSignUp = async (email, password, extraData = {}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log(user);

    const userData = {
      uid: user.uid,
      email: user.email,
      createdAt: new Date().toISOString(),
      ...extraData, // merge additional data (e.g. name, phone, etc.)
    };

    await setDoc(doc(db, "users", user.uid), userData);

    console.log(userData);

    return userData;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// ✅ Login
export const loginWithFBase = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

// ✅ Forgot Password
export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent!");
  } catch (error) {
    console.error("Error sending reset email:", error.message);
    throw error;
  }
};

// ✅ Logout
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};

//--------------------------------
// 🔹 College-specific Services
//--------------------------------

// ✅ Get college data by UID - Fixed to use direct document access
export const getCollegeByUID = async (uid) => {
  try {
    const docRef = doc(db, "colleges", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No college document found for UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error getting college data:", error);
    throw error;
  }
};

// ✅ Update college status (for admin use)
export const updateCollegeStatus = async (collegeId, status) => {
  try {
    const docRef = doc(db, "colleges", collegeId);
    await updateDoc(docRef, {
      status: status,
      updatedAt: serverTimestamp()
    });
    console.log("College status updated successfully");
  } catch (error) {
    console.error("Error updating college status:", error);
    throw error;
  }
};

// ✅ Get all colleges (for admin dashboard)
export const getAllColleges = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "colleges"));
    const colleges = [];
    querySnapshot.forEach((doc) => {
      colleges.push({ id: doc.id, ...doc.data() });
    });
    return colleges;
  } catch (error) {
    console.error("Error getting all colleges:", error);
    throw error;
  }
};

// ✅ Check if user is approved college
export const checkCollegeApproval = async (uid) => {
  try {
    const college = await getCollegeByUID(uid);
    return college ? college.status === 'approved' : false;
  } catch (error) {
    console.error("Error checking college approval:", error);
    return false;
  }
};

//--------------------------------
// 🔹 Admin-specific Services
//--------------------------------

// ✅ Get all colleges with admin details
export const getAllCollegesForAdmin = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "colleges"));
    const colleges = [];
    querySnapshot.forEach((doc) => {
      colleges.push({ id: doc.id, ...doc.data() });
    });
    return colleges;
  } catch (error) {
    console.error("Error getting all colleges for admin:", error);
    throw error;
  }
};


// ✅ Delete college
export const deleteCollege = async (collegeId) => {
  try {
    await deleteDoc(doc(db, "colleges", collegeId));
    console.log("College deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting college:", error);
    throw error;
  }
};

// ✅ Get college by ID for admin
export const getCollegeByIdForAdmin = async (collegeId) => {
  try {
    const docRef = doc(db, "colleges", collegeId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No college document found for ID:", collegeId);
      return null;
    }
  } catch (error) {
    console.error("Error getting college by ID:", error);
    throw error;
  }
};

// ✅ Update college information
export const updateCollegeInfo = async (collegeId, updateData) => {
  try {
    const docRef = doc(db, "colleges", collegeId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    console.log("College information updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating college information:", error);
    throw error;
  }
};

// ✅ Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    const [colleges, courses, successStories, users, applications, admissions] = await Promise.all([
      getAllData('colleges'),
      getAllData('courses'),
      getAllData('successStories'),
      getAllData('users'),
      getAllData('applications'),
      getAllData('admissions')
    ]);

    return {
      colleges: colleges?.length || 0,
      courses: courses?.length || 0,
      successStories: successStories?.length || 0,
      users: users?.length || 0,
      applications: applications?.length || 0,
      admissions: admissions?.length || 0
    };
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    throw error;
  }
};

//--------------------------------
// 🔹 Role-based Authentication Services
//--------------------------------

// ✅ Get user role from users collection (for admin login)
export const getUserRoleFromUsersCollection = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const userData = docSnap.data();
      return {
        uid: docSnap.id,
        email: userData.email,
        role: userData.role || 'user',
        fName: userData.fName,
        lName: userData.lName,
        createdAt: userData.createdAt
      };
    } else {
      console.log("No user document found for UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error getting user role from users collection:", error);
    throw error;
  }
};

// ✅ Get user role from colleges collection (for college login)
export const getUserRoleFromCollegesCollection = async (uid) => {
  try {
    const docRef = doc(db, "colleges", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const collegeData = docSnap.data();
      return {
        uid: docSnap.id,
        email: collegeData.email,
        role: 'college', // Always set role as 'college' for college users
        collegeName: collegeData.collegeName,
        status: collegeData.status,
        city: collegeData.city,
        state: collegeData.state,
        createdAt: collegeData.createdAt
      };
    } else {
      console.log("No college document found for UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error getting user role from colleges collection:", error);
    throw error;
  }
};

// ✅ Login with role detection (for admin)
export const loginWithRoleDetection = async (email, password, userType = 'admin') => {
  try {
    // First authenticate with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Then fetch role from appropriate collection
    let userData;
    if (userType === 'admin') {
      userData = await getUserRoleFromUsersCollection(user.uid);
    } else if (userType === 'college') {
      userData = await getUserRoleFromCollegesCollection(user.uid);
    }
    
    if (!userData) {
      throw new Error('User data not found in database');
    }
    
    return userData;
  } catch (error) {
    console.error("Error in login with role detection:", error);
    throw error;
  }
};


export const uploadImageToCloudinary = async (file) => {
  const CLOUD_NAME = "drrr99dz9";
  const UPLOAD_PRESET = "react_native_uploads";

  try {
      const data = new FormData();
      data.append("file", file); // ✅ Just the File object directly
      data.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
              method: "POST",
              body: data,
          }
      );

      const result = await res.json();

      if (!res.ok) {
          console.error("Cloudinary upload failed", result);
          throw new Error(result.error?.message || "Upload failed");
      }

      return result.secure_url;

  } catch (err) {
      console.error("Cloudinary upload failed", err);
      throw err;
  }
};



