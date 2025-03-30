import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Events.module.css";
import Card from "../components/Card";
import { getMyMeeting } from "../services/action";
import { useAuth } from "../context/authContext";
import { useMyMeet } from "../context/myMeetingContext";
import MobileNavBar from "../components/MobileNavBar";
import MobileLogout from "../components/MobileLogout";
const Events = () => {
    const navigate = useNavigate();
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);
    const { user } = useAuth();
    const { meet1, setMeet1 } = useMyMeet();

    const myButton = (
        <button
            style={{
                color: "#1877f2",
                background: "ffffff",
                width: "180px",
                height: "40px",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid #1877f2",
                borderRadius: "20px",
                fontSize: "20px",
            }}
            onClick={() => navigate("/addmeeting1")}
        >
            <span style={{ marginRight: "5px" }}>+</span>
            <span>create</span>
        </button>
    );

    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const newdata = await getMyMeeting(user.token);
                setMeet1(newdata.meetings);
            } catch (error) {
                toast.error(error, "something went wrong");
            }
        };
        fetchLinks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log(meet1);
    return (
        <div className={styles.container} style={{ flexDirection: isHidden ? "column" : "" }}>
            {!isHidden && <SideBar button={myButton} />}
            {isHidden && <MobileLogout />}
            <div
                className={styles.contentArea}
                style={{ padding: isHidden ? "0px" : "", margin: isHidden ? '5px' : '' }}
            >

                <div
                    style={{
                        display: "flex",
                        justifyContent: !isHidden ? "space-between" : "",
                        alignItems: "center",
                    }}
                >
                    <div >
                        {" "}
                        <h2 className={styles.headerTitle}>Create Event</h2>
                        <p
                            className={styles.headerSubtitle}
                            style={{
                                display: isHidden ? "flex" : "",
                                flexDirection: isHidden ? "column" : "",
                            }}
                        >
                            <span>Create events to share for </span>
                            <span>people to book on your calendar</span>
                            <span>New</span>
                        </p>
                    </div>
                    <button
                        style={{
                            color: " #1877f2",
                            background: "ffffff",
                            width: !isHidden ? "180px" : "140px",
                            height: "36px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "2px solid #1877f2",
                            borderRadius: "20px",
                            fontSize: "15px",
                        }}
                        onClick={() => navigate("/addmeeting1")}
                    >
                        <span style={{ marginRight: "5px" }}>+</span>
                        <span>Add New Event</span>
                    </button>
                </div>
                <div className={styles.cardContainer} style={{ gridTemplateColumns: isHidden ? "repeat(1,1fr)" : "" }}>
                    {meet1?.length > 0 ? (
                        meet1.map((meeting) => (
                            <Card
                                key={meeting._id}
                                title={meeting.eventTopic}
                                date={meeting.date}
                                time={`${meeting.time} ${meeting.ampm}`}
                                duration={meeting.duration}
                                ampm={meeting.ampm}
                                id={meeting._id}
                                hidden={isHidden}
                                active={meeting.isActive}
                            />
                        ))
                    ) : (
                        <p>No meetings found. Create your first meeting!</p>
                    )}
                </div>
            </div>
            {isHidden && (
                <div style={{ width: "100%" }}>
                    <MobileNavBar />
                </div>
            )}
        </div>
    );
};

export default Events;
