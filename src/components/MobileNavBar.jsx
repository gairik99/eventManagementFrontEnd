import { NavLink } from 'react-router-dom'; // Step 1: Import NavLink
import styles from '../styles/MobileNavBar.module.css';
import link1 from "../assets/link1.png";
import link2 from "../assets/link2.png";
import link3 from "../assets/link3.png";
import link4 from "../assets/link4.png";
const MobileNavBar = () => {
    const navItems = [
        { id: 1, text: "Events", icon: link1, alt: 'Events icon', path: "/events", },
        { id: 2, text: "Booking", icon: link2, alt: 'Booking icon', path: "/bookings", },
        { id: 3, text: "Availability", icon: link3, alt: 'Availability icon', path: "/availability", },
        { id: 4, text: "Settings", icon: link4, alt: 'Settings icon', path: "/settings" },
    ];


    return (
        <nav className={styles.navBar}>
            <ul className={styles.navLinks}>
                {navItems.map((item) => (
                    <li key={item.id}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                            }
                            end
                        >
                            <img
                                src={item.icon}
                                alt={item.alt}
                                className={styles.navIcon}
                            />
                            <span className={styles.navText}>{item.text}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MobileNavBar;