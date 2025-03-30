import { useState, useEffect } from "react"
import SideBar from "../components/SideBar"
import AvailabilityComp from "../components/AvailabilityComp"
import CalendarView from "../components/CalendarView"
import styles from "../styles/Availablity.module.css"
import { FaList } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import MobileLogout from "../components/MobileLogout"
import MobileNavBar from "../components/MobileNavBar"

const Availability = () => {
    const [view, setView] = useState("availability");
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div className={styles.container} style={{ flexDirection: isHidden ? "column" : "" }}>
            {!isHidden && <SideBar />}
            {isHidden && <MobileLogout />}
            <div className={styles.contentArea} style={{ padding: isHidden ? "0px" : "", margin: isHidden ? '5px' : '' }}>
                <div
                >
                    <div >
                        {" "}
                        <h2 className={styles.headerTitle}>Create Event</h2>
                        <p className={styles.headerSubtitle}>
                            <span>Create events to share for</span>
                            <span>people to book on your calendar</span>
                        </p>
                        <div className={styles.toggleContainer}>
                            <button
                                onClick={() => setView("availability")}
                                style={{
                                    backgroundColor: view === "availability" ? "#ffffff" : "",
                                    color: view === "availability" ? "black" : "",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}
                            >
                                <FaList /> <span>List View</span>
                            </button>
                            <button
                                onClick={() => setView("calendar")}
                                style={{
                                    backgroundColor: view === "calendar" ? "#ffffff" : "",
                                    color: view === "calendar" ? "black" : '',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}
                            >
                                <CiCalendar /> <span>Calendar View</span>
                            </button>
                        </div>
                    </div>

                </div>
                {view == 'availability' ? <AvailabilityComp hidden={isHidden} /> : <CalendarView hidden={isHidden} />}

            </div>
            {isHidden && (
                <div style={{ width: "100%" }}>
                    <MobileNavBar />
                </div>
            )}
        </div>
    )
}

export default Availability