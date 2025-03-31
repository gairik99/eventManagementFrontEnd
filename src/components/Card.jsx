import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import styles from "../styles/Card.module.css";
import Switch from "./Switch";
import { deleteMeeting } from "../services/action";
import { useAuth } from "../context/authContext";
import { useMyMeet } from "../context/myMeetingContext";
import { useGuestMeet } from "../context/guestMeetingContext";
import { updateMeeting } from "../services/action";



const Card = ({ title, date, time, duration, id, ampm, hidden, active }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { setMeet1 } = useMyMeet();
    const { meet2 } = useGuestMeet();
    const [hasOverlap, setHasOverlap] = useState(false);
    console.log(meet2);
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

    const convertTo24Hour = (time12h, ampm) => {
        const [hoursStr, minutesStr = '00'] = time12h.split(':');
        const hours = parseInt(hoursStr, 10) || 0;
        const minutes = parseInt(minutesStr, 10) || 0;

        let finalHours = hours;
        if (ampm === 'PM' && hours !== 12) finalHours += 12;
        if (ampm === 'AM' && hours === 12) finalHours = 0;

        return `${String(finalHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    useEffect(() => {
        const checkOverlap = () => {
            if (!meet2?.length) return false;

            // Current meeting
            const currentTime24 = convertTo24Hour(time, ampm);
            const [currentHours, currentMinutes] = currentTime24.split(':').map(Number);
            const currentStart = currentHours * 60 + currentMinutes;
            const currentEnd = currentStart + (Number(duration) || 0) * 60;

            return meet2.some(meeting => {
                if (meeting.date !== date) return false;

                // Compared meeting
                const otherTime24 = convertTo24Hour(meeting.time, meeting.ampm);
                const [otherHours, otherMinutes] = otherTime24.split(':').map(Number);
                const otherStart = otherHours * 60 + otherMinutes;
                const otherEnd = otherStart + (Number(meeting.duration) || 0) * 60;

                // Overlap check
                return currentStart < otherEnd && currentEnd > otherStart;
            });
        };

        setHasOverlap(checkOverlap());
    }, [date, time, duration, ampm, meet2, id]);

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
    const handleSwitchToggle = async () => {
        try {
            const newActiveState = !active;

            // Update the meeting on the server
            const response = await updateMeeting(
                { isActive: newActiveState },
                user.token,
                id
            );
            // console.log(response);
            if (response.success) {
                setMeet1(prev => prev.map(meeting =>
                    meeting._id === id
                        ? { ...meeting, isActive: newActiveState }
                        : meeting
                ));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    const handleDeleteClick = async () => {
        try {
            const response = await deleteMeeting(id, user.token);
            if (response.success) {
                toast.success(response.message);
                setMeet1((prev) => prev.filter((meeting) => meeting._id !== id));
            }
        } catch (error) {
            toast.error(error);
        }
    };
    const handleCopyClick = (id) => {
        const url = `https://eventgairik.netlify.app/copymeeting/${id}`;
        navigator.clipboard.writeText(url).then(() => {
            toast.success("Meeting link copied to clipboard!");
        }).catch(err => {
            toast.error("Failed to copy link: ", err);
        });
    }
    // console.log(hasOverlap)
    return (
        <div
            className={styles.card}
            style={{ borderTop: !active ? "10px solid rgb(97, 99, 99)" : "", width: hidden ? "332px" : "" }}
        >

            {
                hasOverlap &&
                <p className={styles.warning}>
                    ⚠️Conflict of timing
                </p>
            }

            <div className={`${styles.cardRow} ${styles.row1}`}>
                <span className={styles.cardText}>{title}</span>
                <button
                    className={styles.cardButton}
                    onClick={() => navigate(`/addmeeting1/${id}`)}
                >
                    <CiEdit />
                </button>
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
                    <Switch isActive={active} onToggle={handleSwitchToggle} />
                    <button className={styles.cardButton} onClick={() => handleCopyClick(id)}>
                        <IoCopyOutline />
                    </button>
                    <button className={styles.cardButton} onClick={handleDeleteClick}>
                        <MdDeleteOutline />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
