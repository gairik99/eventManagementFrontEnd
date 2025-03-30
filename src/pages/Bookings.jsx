import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import { useGuestMeet } from "../context/guestMeetingContext";
import SideBar from "../components/SideBar";
import styles from "../styles/Bookings.module.css";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { getGuestMeeting, updateGuestMeeting } from "../services/action";
import { RiForbid2Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import MobileLogout from "../components/MobileLogout";
import MobileNavBar from "../components/MobileNavBar";
const Bookings = () => {
    const { user } = useAuth();
    const { meet2, setMeet2 } = useGuestMeet();
    const [selected, setSelected] = useState("Upcoming");
    const [showDialog, setShowDialog] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);
    const statusItems = ["Upcoming", "Pending", "Canceled", "Past"];
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const newdata = await getGuestMeeting(user.token);
                setMeet2(newdata.meetings);
            } catch (error) {
                toast.error(error, "something went wrong");
                setMeet2([]);
            }
        };
        fetchLinks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const updateStatus = async (data, id) => {
        try {
            const response = await updateGuestMeeting(data, user.token, id);
            console.log(response)
            if (response.success) {
                toast.success("Status updated successfully");
                const newdata = await getGuestMeeting(user.token);
                setMeet2(newdata.meetings);
            }
        } catch (error) {
            toast.error(error, "something went wrong");
            setMeet2([]);
        }
    }

    const getMeetingDateTime = (meeting) => {
        const [year, month, day] = meeting.date.split("-");
        const [hoursStr, minutesStr] = meeting.time.split(":");
        let hours = parseInt(hoursStr, 10);

        // Convert to 24-hour format
        if (meeting.ampm === "PM" && hours !== 12) hours += 12;
        if (meeting.ampm === "AM" && hours === 12) hours = 0;

        return new Date(year, month - 1, day, hours, parseInt(minutesStr, 10));
    };

    const filteredMeetings = meet2?.filter((meeting) => {
        const meetingDate = getMeetingDateTime(meeting);
        const now = new Date();
        const currentUserGuest = meeting.guests.find((g) => g.user === user.id);
        const currentUserStatus = currentUserGuest?.status || "unknown";

        switch (selected) {
            case "Upcoming":
                return meetingDate > now && currentUserStatus !== "rejected";
            case "Past":
                return meetingDate < now && currentUserStatus !== "rejected";
            case "Pending":
                return currentUserStatus === "pending";
            case "Canceled":
                return currentUserStatus === "rejected";
            default:
                return true;
        }
    });
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
        // Validate and parse start time
        const [hoursStr = "0", minutesStr = "0"] = (startTime || "").split(":");
        const hours = Math.min(23, Math.max(0, parseInt(hoursStr, 10) || 0));
        const minutes = Math.min(59, Math.max(0, parseInt(minutesStr, 10) || 0));
        const startDate = new Date();
        startDate.setHours(
            ampm === "PM" && hours !== 12
                ? hours + 12
                : ampm === "AM" && hours === 12
                    ? 0
                    : hours,
            minutes
        );
        const safeDuration = Math.max(0, Number(duration) || 0);
        const endDate = new Date(
            startDate.getTime() + safeDuration * 60 * 60 * 1000
        );
        const format = (date) => {
            let h = date.getHours();
            const m = date.getMinutes().toString().padStart(2, "0");
            const period = h >= 12 ? "PM" : "AM";
            h = h % 12 || 12;
            return `${h}:${m} ${period}`;
        };

        return `${format(startDate)} - ${format(endDate)}`;
    };
    const getUserStatus = (guests, userId) => {
        const guest = guests.find((g) => g.user === userId);
        return guest?.status || "unknown";
    };
    const handlePeopleClick = (meeting) => {
        setSelectedMeeting(meeting);
        setShowDialog(true);
        // console.log('People clicked:', meeting);
    };
    return (
        <div className={styles.container} style={{ flexDirection: isHidden ? "column" : "" }}>
            {!isHidden && <SideBar />}
            {isHidden && <MobileLogout />}
            <div className={styles.contentArea} style={{ padding: isHidden ? "0px" : "", margin: isHidden ? '5px' : '' }}>
                <div>
                    <h2 className={styles.headerTitle}>Booking</h2>
                    <p className={styles.headerSubtitle}>
                        See upcoming and past events booked through your event type links.
                    </p>
                </div>
                <div className={styles.statusContainer}>
                    <div className={styles.horizontalList}>
                        {statusItems.map((item, index) => (
                            <div
                                key={index}
                                className={`${styles.statusItem} ${selected === item ? styles.active : ''}`}
                                onClick={() => setSelected(item)}
                                style={{ padding: isHidden ? '5px 16px' : '' }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                    <div className={styles.meetingsGrid}>
                        {filteredMeetings?.length > 0 ? (
                            filteredMeetings.map((meeting) => (
                                <div key={meeting._id} className={styles.gridRow} style={{ fontSize: isHidden ? '8px' : '' }}>
                                    <div className={styles.dateTimeCell}>
                                        <div>{formatDate(meeting.date)}</div>
                                        <div className={styles.datetime}>
                                            {formatTimeRange(meeting.time, meeting.duration, meeting.ampm)}
                                        </div>
                                    </div>
                                    <div className={styles.eventTopicCell}>{meeting.eventTopic}</div>

                                    {selected !== 'Pending' && (
                                        <div className={`${styles.statusCell} ${styles[getUserStatus(meeting.guests, user.id)]}`} >
                                            {getUserStatus(meeting.guests, user.id)}
                                        </div>
                                    )}

                                    {selected === 'Pending' && (
                                        <div className={styles.actionButtons}>
                                            <button className={styles.rejectButton} onClick={() => updateStatus({ status: 'rejected' }, meeting._id)}>
                                                <RiForbid2Line />
                                                <span>Reject</span>
                                            </button>
                                            <button className={styles.acceptButton} onClick={() => updateStatus({ status: 'accepted' }, meeting._id)}>
                                                <FaCheck />
                                                <span>Accept</span>
                                            </button>
                                        </div>
                                    )}

                                    <div className={styles.peopleCell} onClick={() => handlePeopleClick(meeting)}>
                                        {selected !== "Canceled" && (
                                            <>
                                                <MdOutlinePeopleAlt className={styles.peopleIcon} />
                                                <span>{meeting.guests.length} {!isHidden && <span>people</span>}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.noMeetings}>
                                No {selected.toLowerCase()} meetings found
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showDialog && selectedMeeting && (
                <div className={styles.dialogOverlay}>
                    <div className={styles.dialogBox}>
                        <div className={styles.dialogHeader}>
                            <h3>Participants ({selectedMeeting.guests.length})</h3>
                            <button
                                className={styles.closeButton}
                                onClick={() => setShowDialog(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.participantsList}>
                            {selectedMeeting.guests.map((guest, index) => (
                                <div key={index} className={styles.participantItem}>
                                    <span>{guest.name}</span> {/* You might want to display username instead of ID */}
                                    <span className={`${styles.statusCheckbox} ${styles[guest.status]}`}>
                                        {guest.status === 'accepted' && <FaCheck />}
                                        {guest.status === 'rejected' && <FaTimes />}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {isHidden && (
                <div style={{ width: "100%" }}>
                    <MobileNavBar />
                </div>
            )}
        </div>
    );
};

export default Bookings;
