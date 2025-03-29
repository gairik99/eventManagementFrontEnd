import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../styles/MobileLogout.module.css";
import logo from '../assets/icon.png';
import person from "../assets/person1.png";
import { useAuth } from '../context/authContext';

const MobileLogout = () => {
    const { user, setUser } = useAuth();
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        // Add your logout logic here
        setUser({ token: '' });
        navigate('/')
        setShowLogoutPopup(false);
    };

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className={styles.logoContainer} style={{ marginBottom: '10px', padding: '1rem' }}>
                <img src={logo} alt="Logo" className={styles.logoImage} />
                <span className={styles.logoText}>
                    CNNCT
                </span>
            </div>

            <div>
                <img
                    src={person}
                    alt='profile'
                    style={{ width: '80px', height: '80px', padding: '0.5rem', marginRight: '1rem', cursor: 'pointer' }}
                    onClick={() => setShowLogoutPopup(true)}
                />
            </div>

            {/* Logout Popup */}
            {showLogoutPopup && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h3>Are you sure you want to log out?{user.name}</h3>
                        <div style={{ marginTop: '1.5rem' }}>
                            <button
                                style={{
                                    marginRight: '1rem',
                                    padding: '0.5rem 1.5rem',
                                    borderRadius: '4px',
                                    border: 'none',
                                    backgroundColor: '#e0e0e0',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setShowLogoutPopup(false)}
                            >
                                Cancel
                            </button>
                            <button
                                style={{
                                    padding: '0.5rem 1.5rem',
                                    borderRadius: '4px',
                                    border: 'none',
                                    backgroundColor: '#1877f2',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MobileLogout;