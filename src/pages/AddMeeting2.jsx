import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SideBar from "../components/SideBar";
import styles from "../styles/Meeting2.module.css";
import person from "../assets/person1.png";
import { useMeet } from "../context/meetContext";
import { useAuth } from "../context/authContext";
import MobileLogout from "../components/MobileLogout";
import { createMeetng, updateMeeting } from "../services/action";

const AddMeeting2 = () => {
    const { id } = useParams();
    const { meet, setMeet } = useMeet();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);
    const navigate = useNavigate();
    const colorOptions = [
        { id: 1, color: "#FFFFFF", background: "#000000" },
        { id: 2, color: "#FFFFFF", background: "#342b26" },
        { id: 3, color: "#000000", background: "#FFFFFF" },
        { id: 4, color: "#FFFFFF", background: "#EF6500" },
    ];

    const handleColorSelect = (option) => {
        setMeet(prev => ({
            ...prev,
            bannerColor: option.background,
            fontColor: option.color
        }));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeet(prev => ({
            ...prev,
            [name]: value
        }));
    };
    // console.log(meet)
    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const parseTimeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const convertTo24Hour = (time12h, ampm) => {
        let [hours, minutes] = time12h.split(':').map(Number);
        if (ampm === 'PM' && hours !== 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    const checkAvailability = () => {
        const selectedDate = user.availability.find(avail =>
            avail.date === meet.date
        );

        if (!selectedDate) {
            toast.error("No availability found for selected date");
            return false;
        }

        if (selectedDate.isAllDay) return true;

        const start24 = convertTo24Hour(meet.time, meet.ampm);
        const duration = parseInt(meet.duration, 10);
        const end24 = calculateEndTime(start24, duration);

        const eventStart = parseTimeToMinutes(start24);
        const eventEnd = parseTimeToMinutes(end24);

        return selectedDate.slots.some(slot => {
            const slotStart = parseTimeToMinutes(slot.start);
            const slotEnd = parseTimeToMinutes(slot.end);
            return eventStart >= slotStart && eventEnd <= slotEnd;
        });
    };

    const calculateEndTime = (start24, duration) => {
        const [hours, minutes] = start24.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + duration * 60;
        const endHours = Math.floor(totalMinutes / 60) % 24;
        const endMinutes = totalMinutes % 60;
        return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    };


    const handleSave = async () => {
        if (!meet.meetingLink || !meet.meeting || !meet.date || !meet.time || !meet.ampm || !meet.timeZone || !meet.meetingLink || !meet.meeting || !meet.duration) {
            toast.error("Please fill all required fields");
            return;
        }

        if (user?.availability && !checkAvailability()) {
            toast.error("Selected time is outside your available slots");
            return;
        }
        setLoading(true);
        try {
            let response;

            if (id) {
                // eslint-disable-next-line no-unused-vars
                const { _id, guests, ...updateData } = meet;
                response = await updateMeeting(updateData, user.token, id);
                if (response.success) {
                    toast.success('meeting updated successfully');
                }
                // console.log(response)
                navigate('/events');
            } else {
                response = await createMeetng(meet, user.token);
                if (response.success) {
                    toast.success('meeting created successfully');
                }
                // console.log(response)
                navigate('/events');

            }

        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            // console.error("Create meeting error:", error);
        } finally {
            setLoading(false);
        }
    };

    const myButton = (
        <button className={styles.createButton}>
            <span className={styles.plusIcon}>+</span>
            <span>Create</span>
        </button>
    );

    return (
        <div className={styles.container} style={{ flexDirection: isHidden ? "column" : "" }}>
            {!isHidden && <SideBar button={myButton} />}
            {isHidden && <MobileLogout />}
            <div className={styles.contentArea} style={{ padding: isHidden ? "0px" : "", margin: isHidden ? '5px' : '' }}>
                <header className={styles.header}>
                    <h2 className={styles.headerTitle}>Create Event</h2>
                    <p className={styles.headerSubtitle}>
                        Create events to share for people to book on your calendar
                    </p>
                </header>

                <div className={styles.card}>
                    <h2 className={styles.cardHeader}>Add Event</h2>
                    <hr className={styles.divider} />

                    <div className={styles.bannerSection}>
                        <h3 className={styles.sectionTitle}>Banner</h3>
                        <div className={styles.previewContainer}
                            style={{
                                backgroundColor: meet?.bannerColor || '#342b26',
                                color: meet?.fontColor || '#ffffff',
                            }}>
                            <div className={styles.avatarWrapper}>
                                <img src={person} alt="User" className={styles.userAvatar} />
                            </div>
                            <span className={styles.username}>@{meet?.eventTopic || "event topic"}</span>
                        </div>

                        <h3 className={styles.sectionTitle}>Custom Background Color</h3>
                        <div className={styles.colorGrid}>
                            {colorOptions.map(option => (
                                <button
                                    key={option.id}
                                    className={styles.colorOption}
                                    style={{ backgroundColor: option.background }}
                                    onClick={() => handleColorSelect(option)}
                                >
                                    {meet?.bannerColor === option.background && (
                                        <span className={styles.selectedIndicator}>✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className={styles.brandingContainer}>
                            <div className={styles.logoPreview} style={{ background: meet.fontColor }} />
                            <div className={styles.textPreview}>
                                {meet.fontColor}
                            </div>
                        </div>
                    </div>
                    <hr className={styles.divider} />
                    <div >
                        <div style={{ display: isHidden ? 'flex' : '', flexDirection: isHidden ? 'column' : '' }}>
                            <span>Add Link <sup style={{ color: 'red' }}>*</sup></span>
                            <input name='meetingLink' type='text' placeholder="Enter URL Here" className={styles.inputField} onChange={handleChange} value={meet.meetingLink || ''} style={{ marginTop: isHidden ? '10px' : '', width: isHidden ? '95%' : '' }} />
                        </div>
                        <div style={{ display: isHidden ? 'flex' : '', flexDirection: isHidden ? 'column' : '' }}>
                            <span>Add Emails<sup style={{ color: 'red' }}>*</sup></span>
                            <input name='meeting' type='text' placeholder="Add member Emails" className={styles.inputField} onChange={handleChange} value={meet.meeting || ''} style={{ marginTop: isHidden ? '10px' : '', width: isHidden ? '95%' : '' }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', padding: '1rem' }}>
                        <button style={{ height: '40px', width: '80px', background: 'grey', borderRadius: '25px', border: 'none' }} onClick={() => navigate('/events')}>cancel</button>
                        <button disabled={loading} style={{ height: '40px', width: '80px', background: '#1877f2', borderRadius: '25px', border: 'none', color: 'white' }} onClick={handleSave}>{loading ? "Saving..." : "Save"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddMeeting2;