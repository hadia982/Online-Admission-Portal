import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Helper/firebaseHelper';
import { 
    FaTachometerAlt, 
    FaUniversity, 
    FaGraduationCap, 
    FaTrophy, 
    FaUsers, 
    FaFileAlt, 
    FaUserGraduate,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from 'react-icons/fa';

const AdminSidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            dispatch({ type: 'home/setUser', payload: null });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const menuItems = [
        {
            path: '/admin-dashboard',
            icon: FaTachometerAlt,
            label: 'Dashboard',
            color: '#003366'
        },
        {
            path: '/admin-colleges',
            icon: FaUniversity,
            label: 'Colleges',
            color: '#003366'
        },
        {
            path: '/admin-courses',
            icon: FaGraduationCap,
            label: 'Courses',
            color: '#003366'
        },
        {
            path: '/admin-success-stories',
            icon: FaTrophy,
            label: 'Success Stories',
            color: '#003366'
        },
        // {
        //     path: '/admin-users',
        //     icon: FaUsers,
        //     label: 'Users',
        //     color: '#6f42c1'
        // },
        {
            path: '/admin-applications',
            icon: FaFileAlt,
            label: 'Applications',
            color: '#003366'
        },
        // {
        //     path: '/admin-admissions',
        //     icon: FaUserGraduate,
        //     label: 'Admissions',
        //     color: '#20c997'
        // }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{
            ...styles.sidebar,
            width: isCollapsed ? '70px' : '250px'
        }}>
            {/* Header */}
            <div style={styles.header}>
                {!isCollapsed && (
                    <div style={styles.logoContainer}>
                        <FaUniversity size={24} color="#003366" />
                        <span style={styles.logoText}>Admin Portal</span>
                    </div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={styles.toggleButton}
                >
                    {isCollapsed ? <FaBars /> : <FaTimes />}
                </button>
            </div>

            {/* Navigation Menu */}
            <nav style={styles.nav}>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                ...styles.menuItem,
                                backgroundColor: isActive(item.path) ? item.color : 'transparent',
                                color: isActive(item.path) ? 'white' : '#333',
                                justifyContent: isCollapsed ? 'center' : 'flex-start'
                            }}
                        >
                            <Icon size={20} />
                            {!isCollapsed && (
                                <span style={styles.menuLabel}>{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div style={styles.footer}>
                <button
                    onClick={handleLogout}
                    style={{
                        ...styles.logoutButton,
                        justifyContent: isCollapsed ? 'center' : 'flex-start'
                    }}
                >
                    <FaSignOutAlt size={20} />
                    {!isCollapsed && (
                        <span style={styles.logoutText}>Logout</span>
                    )}
                </button>
            </div>
        </div>
    );
};

const styles = {
    sidebar: {
        height: '100vh',
        backgroundColor: '#f8f9fa',
        borderRight: '1px solid #dee2e6',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    },
    header: {
        padding: '20px',
        borderBottom: '1px solid #dee2e6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    logoText: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#003366'
    },
    toggleButton: {
        background: 'none',
        border: 'none',
        fontSize: '18px',
        color: '#666',
        cursor: 'pointer',
        padding: '5px',
        borderRadius: '4px',
        transition: 'background-color 0.2s ease'
    },
    nav: {
        flex: 1,
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 20px',
        textDecoration: 'none',
        color: '#333',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        borderLeft: '3px solid transparent',
        margin: '0 10px',
        borderRadius: '8px'
    },
    menuLabel: {
        fontSize: '14px'
    },
    footer: {
        padding: '20px',
        borderTop: '1px solid #dee2e6',
        backgroundColor: 'white'
    },
    logoutButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 20px',
        backgroundColor: '#003366',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        width: '100%',
        margin: '0 10px'
    },
    logoutText: {
        fontSize: '14px'
    }
};

export default AdminSidebar;
