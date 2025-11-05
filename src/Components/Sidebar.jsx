import React from 'react'
import Button from './Button'
import { MdLogout } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaHome, FaUserGraduate, FaStar, FaLock, FaUniversity } from "react-icons/fa";
import { IoChatbubblesOutline, IoBookOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/Slices/HomeDataSlice';
import { NavLink } from 'react-router-dom';

export default function Sidebar(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.home.user);
    
    const handleLogout = () => {
        dispatch(setUser({}));
    }

    // define menu items and exclude "Users" and "Admissions"
    const menuItems = [
        { label: "Dashboard", url: 'ClgDashboard', icon: <FaHome size={18} /> },
        { label: "Student Management", url: "StdMg", icon: <FaUserGraduate size={18} /> },
        { label: "Course Management", url: 'CourseMg', icon: <IoBookOutline size={18} /> },
        { label: "Chat/Messages", url: 'Chat', icon: <IoChatbubblesOutline size={18}/> },
        { label: "Profile Management", url: 'ProfileMg', icon: <IoPersonCircleOutline size={18}/> },
        { label: "Success Stories", url: 'SuccessStories', icon: <FaStar size={18}/> },
        // { label: "Status Display", url: 'Status', icon: <MdDashboard size={18}/> },
        { label: "Security Settings", url: 'Security', icon: <FaLock size={18}/> },
        // intentionally do not include "Users" or "Admissions"
    ];

    return (
        <div style={styles.sidebar}>
            {/* Header */}
            <div style={styles.header}>
                <FaUniversity size={32} color="#003366" />
                <div style={styles.headerText}>
                    <h2 style={styles.title}>College Portal</h2>
                    <p style={styles.subtitle}>Management Dashboard</p>
                </div>
            </div>

            {/* User Info */}
            <div style={styles.userInfo}>
                <div style={styles.userAvatar}>
                    <FaUniversity size={24} color="#003366" />
                </div>
                <div style={styles.userDetails}>
                    <h4 style={styles.userName}>{user?.email || 'College User'}</h4>
                    <p style={styles.userRole}>College Admin</p>
                </div>
            </div>

            {/* Navigation Menu */}
            <div style={styles.menuContainer}>
                {menuItems.map(item => (
                    <Button key={item.url} button={item.label} url={item.url} icon={item.icon} />
                ))}
             </div>

             {/* Logout Section */}
             <div style={styles.logoutSection}>
                 <button onClick={handleLogout} style={styles.logoutButton}>
                     <MdLogout size={18} />
                     Logout
                 </button>
             </div>
         </div>
     )
 }
 
 // Modern sidebar styles matching the login page design
 const styles = {
     sidebar: {
         width: '250px',
         height: '100vh',
         backgroundColor: 'white',
         borderRight: '1px solid #e1e5e9',
         display: 'flex',
         flexDirection: 'column',
         boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
         fontFamily: 'Arial, sans-serif',
     },
     header: {
         padding: '20px',
         borderBottom: '1px solid #e1e5e9',
         display: 'flex',
         alignItems: 'center',
         gap: '12px',
         backgroundColor: '#f8f9fa',
     },
     headerText: {
         flex: 1,
     },
     title: {
         color: '#003366',
         fontSize: '18px',
         fontWeight: 'bold',
         margin: '0 0 2px 0',
     },
     subtitle: {
         color: '#666',
         fontSize: '12px',
         margin: '0',
     },
     userInfo: {
         padding: '15px 20px',
         borderBottom: '1px solid #e1e5e9',
         display: 'flex',
         alignItems: 'center',
         gap: '12px',
         backgroundColor: '#f8f9fa',
     },
     userAvatar: {
         width: '40px',
         height: '40px',
         borderRadius: '50%',
         backgroundColor: '#e3f2fd',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
     },
     userDetails: {
         flex: 1,
     },
     userName: {
         color: '#003366',
         fontSize: '14px',
         fontWeight: '600',
         margin: '0 0 2px 0',
         overflow: 'hidden',
         textOverflow: 'ellipsis',
         whiteSpace: 'nowrap',
     },
     userRole: {
         color: '#666',
         fontSize: '12px',
         margin: '0',
     },
     menuContainer: {
         flex: 1,
         padding: '10px 0',
         overflowY: 'auto',
     },
     logoutSection: {
         padding: '15px 20px',
         borderTop: '1px solid #e1e5e9',
         backgroundColor: '#f8f9fa',
     },
     logoutButton: {
         width: '100%',
         backgroundColor: '#dc3545',
         color: 'white',
         border: 'none',
         borderRadius: '8px',
         padding: '12px',
         fontSize: '14px',
         fontWeight: '600',
         cursor: 'pointer',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         gap: '8px',
         transition: 'background-color 0.3s ease',
     },
 };
