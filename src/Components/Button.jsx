import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Button(props) {
    const location = useLocation();
    const isActive = location.pathname === `/${props.url}`;
    
    return (
        <div style={styles.buttonContainer}>
            <Link to={props.url} style={styles.link}>
                <button 
                    style={{
                        ...styles.button,
                        backgroundColor: isActive ? '#003366' : 'transparent',
                        color: isActive ? 'white' : '#333',
                    }}
                >
                    <span style={styles.icon}>{props.icon}</span>
                    <span style={styles.text}>{props.button}</span>
                </button>
            </Link>
        </div>
    )
}

const styles = {
    buttonContainer: {
        margin: '2px 0',
        padding: '0 15px',
    },
    link: {
        textDecoration: 'none',
        display: 'block',
        width: '100%',
    },
    button: {
        width: '100%',
        padding: '12px 15px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transition: 'all 0.3s ease',
        textAlign: 'left',
        backgroundColor: 'transparent',
        color: '#333',
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '20px',
        height: '20px',
    },
    text: {
        flex: 1,
    },
};

export default Button