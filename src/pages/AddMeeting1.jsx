import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TimezoneSelect from 'react-timezone-select';
import SideBar from "../components/SideBar";
import styles from "../styles/Meeting.module.css";
import { useMeet } from "../context/meetContext";
import { useMyMeet } from "../context/myMeetingContext";
import MobileLogout from "../components/MobileLogout";

const AddMeeting1 = () => {
    const navigate = useNavigate();
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);
    const { id } = useParams();
    const { meet, setMeet } = useMeet();
    const { meet1 } = useMyMeet();
    // console.log(meet)
    useEffect(() => {
        if (id) {
            const selectedMeeting = meet1.find((m) => m._id === id);
            if (selectedMeeting) {
                setMeet(selectedMeeting);
            }
        } else {
            setMeet({ timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, });
        }
    }, [id, meet1, setMeet]);

    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeet((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const myButton = (
        <button
            style={{
                color: "#ffffff",
                background: "#1877f2",
                width: "160px",
                height: "40px",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid #1877f2",
                borderRadius: "20px",
                fontSize: "20px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                ":hover": {
                    background: "#1877f2",
                    color: "#ffffff",
                },
            }}
        >
            <span style={{ marginRight: "5px" }}>+</span>
            <span>Create</span>
        </button>
    );

    const handleTimezoneChange = (tz) => {
        setMeet(prev => ({
            ...prev,
            timeZone: tz.value // tz is an object containing timezone details
        }));
    };

    return (
        <div
            className={styles.container}
            style={{ flexDirection: isHidden ? "column" : "" }}
        >
            {!isHidden && <SideBar button={myButton} />}
            {isHidden && <MobileLogout />}
            <div
                className={styles.contentArea}
                style={{
                    padding: isHidden ? "0px" : "",
                    margin: isHidden ? "5px" : "",
                }}
            >
                <div>
                    <h2 className={styles.headerTitle}>Create Event</h2>
                    <p className={styles.headerSubtitle}>
                        Create events to share for people to book on your calendar
                    </p>
                </div>

                <div className={styles.card}>
                    <h2 className={styles.cardHeader}>Add Event</h2>
                    <hr className={styles.divider} />
                    <div
                        className={styles.formSection}
                        style={{
                            marginLeft: isHidden ? "5px" : "",
                            padding: isHidden ? "5px" : "",
                        }}
                    >
                        <div
                            className={styles.formRow}
                            style={{
                                flexDirection: isHidden ? "column" : "",
                                alignItems: isHidden ? "flex-start" : "",
                            }}
                        >
                            <span className={styles.label}>
                                Event Topic <sup className={styles.required}>*</sup>
                            </span>
                            <input
                                type="text"
                                name="eventTopic"
                                value={meet.eventTopic || ""}
                                placeholder="Enter event topic"
                                className={styles.input}
                                onChange={handleChange}
                            />
                        </div>

                        <div
                            className={styles.formRow}
                            style={{
                                flexDirection: isHidden ? "column" : "",
                                alignItems: isHidden ? "flex-start" : "",
                            }}
                        >
                            <span className={styles.label}>Password</span>
                            <input
                                type="password"
                                name="password"
                                value={meet.password || ""}
                                placeholder="Enter password (optional)"
                                className={styles.input}
                                onChange={handleChange}
                            />
                        </div>

                        <div
                            className={styles.formRow}
                            style={{
                                flexDirection: isHidden ? "column" : "",
                                alignItems: isHidden ? "flex-start" : "",
                            }}
                        >
                            <span className={styles.label}>
                                Host Name <sup className={styles.required}>*</sup>
                            </span>
                            <input
                                type="text"
                                name="hostName"
                                placeholder="Enter host name"
                                className={styles.input}
                                value={meet.hostName || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div
                            className={styles.formRow}
                            style={{
                                flexDirection: isHidden ? "column" : "",
                                alignItems: isHidden ? "flex-start" : "",
                            }}
                        >
                            <span className={styles.label}>Description</span>
                            <textarea
                                name="description"
                                placeholder="Enter event description"
                                className={styles.textarea}
                                value={meet.description || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <hr className={styles.divider} />

                    <div
                        className={styles.formSection}
                        style={{
                            marginLeft: isHidden ? "5px" : "",
                            padding: isHidden ? "5px" : "",
                        }}
                    >
                        <div
                            className={styles.formRow}
                            style={{
                                flexDirection: isHidden ? "column" : "",
                                alignItems: isHidden ? "flex-start" : "",
                            }}
                        >
                            <span className={styles.label}>
                                Date and Time <sup className={styles.required}>*</sup>
                            </span>
                            <div className={styles.timeInputs}>
                                <input
                                    name="date"
                                    type="date"
                                    className={styles.input}
                                    value={meet.date || ""}
                                    onChange={handleChange}
                                />
                                <input
                                    name="time"
                                    type="time"
                                    className={styles.input}
                                    value={meet.time || ""}
                                    onChange={handleChange}
                                />
                                <select
                                    name="ampm"
                                    id="ampm"
                                    className={styles.select}
                                    defaultValue=""
                                    onChange={handleChange}
                                >
                                    <option value="">Select AM/PM</option>
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                                <TimezoneSelect
                                    value={meet.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone}
                                    onChange={handleTimezoneChange}
                                    className={styles.timezoneSelect}
                                    menuPlacement="auto"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            minHeight: '40px',
                                            width: '250px'
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <span className={styles.label}>Duration <sup className={styles.required}>*</sup></span>
                            <select
                                name="duration"
                                id="duration"
                                className={styles.select}
                                defaultValue=""
                                onChange={handleChange}
                            >
                                <option value="">select Duration</option>
                                <option value="1">1 hour</option>
                                <option value="2">2 hours</option>
                                <option value="3">3 hours</option>
                            </select>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "1rem",
                            padding: "1rem",
                        }}
                    >
                        <button
                            style={{
                                height: "40px",
                                width: "80px",
                                background: "grey",
                                borderRadius: "25px",
                                border: "none",
                            }}
                            onClick={() => navigate("/events")}
                        >
                            cancel
                        </button>
                        <button
                            style={{
                                height: "40px",
                                width: "80px",
                                background: "#1877f2",
                                borderRadius: "25px",
                                border: "none",
                                color: "white",
                            }}
                            onClick={() =>
                                navigate(id ? `/addmeeting2/${id}` : "/addmeeting2")
                            }
                        >
                            save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddMeeting1;
