import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import styles from "../styles/Card.module.css";
// import Switch from "../components/Switch";
import { useMyMeet } from "../context/myMeetingContext";
import { getMyMeetingById } from "../services/action";


const CopyMeeting = () => {
    const { id } = useParams();
    const { setMeet1, meet1 } = useMyMeet();


    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const newdata = await getMyMeetingById(id);
                setMeet1(newdata.meeting);
                // console.log(newdata);
            } catch (error) {
                toast.error(error, "something went wrong");
            }
        };
        fetchLinks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // console.log(meet1);
    const { eventTopic, date, time, duration, ampm, isActive, meetingLink } = meet1 || {};
    const formatDate = (dateString) => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = months[dateObj.getMonth()];
        const year = dateObj.getFullYear();

        return `${day} ${month}, ${year}`;
    };

    const formatTimeRange = (startTime, duration, ampm) => {
        const [hoursStr = '0', minutesStr = '0'] = (startTime || '').split(':');
        const hours = Math.min(23, Math.max(0, parseInt(hoursStr, 10) || 0));
        const minutes = Math.min(59, Math.max(0, parseInt(minutesStr, 10) || 0));

        const startDate = new Date();
        startDate.setHours(
            ampm === "PM" && hours !== 12 ? hours + 12 :
                ampm === "AM" && hours === 12 ? 0 : hours,
            minutes
        );

        const safeDuration = Math.max(0, Number(duration) || 0);
        const endDate = new Date(startDate.getTime() + safeDuration * 60 * 60 * 1000);
        const format = (date) => {
            let h = date.getHours();
            const m = date.getMinutes().toString().padStart(2, '0');
            const period = h >= 12 ? 'PM' : 'AM';
            h = h % 12 || 12;
            return `${h}:${m} ${period}`;
        };

        return `${format(startDate)} - ${format(endDate)}`;
    };



    return (
        <div style={{ background: '#d5f4e6', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
                className={styles.card}
                style={{
                    borderTop: !isActive ? "10px solid rgb(97, 99, 99)" : "", margin: '5px', padding: '10px', borderRadius: '10px', marginTop: '10%', height: '240px'
                }}
            >
                <div className={`${styles.cardRow} ${styles.row1}`}>
                    <span className={styles.cardText}>{eventTopic}</span>
                    <button className={styles.cardButton}>
                        <CiEdit />
                    </button>
                </div>
                <div className={styles.cardRow}>
                    <span className={styles.cardText}>{meetingLink}</span>
                </div>
                <div className={styles.cardRow}>
                    <span className={styles.cardText}>{formatDate(date)}</span>
                </div>
                <div className={styles.cardRow}>
                    <span className={styles.cardText}>
                        {formatTimeRange(time, duration, ampm)}
                    </span>
                </div>
                <div className={styles.cardRow}>
                    <span
                        className={styles.cardText}
                    >{`${duration} hour Group meeting`}</span>
                </div>
                <div className={`${styles.cardRow} ${styles.buttonRow}`}>
                    <div className={styles.buttonGroup}>
                        {/* <Switch isActive={isActive} /> */}
                        <button className={styles.cardButton} >
                            <IoCopyOutline />
                        </button>
                        <button className={styles.cardButton} >
                            <MdDeleteOutline />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CopyMeeting;
