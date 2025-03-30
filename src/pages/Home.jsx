import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/authContext";
import styles from "../styles/Home.module.css";
import img1 from "../assets/screen1.png";
import img3 from "../assets/screen3.png";
import logo1 from "../assets/logo1.png";
import imga from "../assets/AutoLayoutHorizontal.png";
import img2 from "../assets/AutoLayoutHorizontal1.png";
import imgc from "../assets/AutoLayoutHorizontal2.png";
import img4 from "../assets/AutoLayoutHorizontal3.png";
import img5 from "../assets/AutoLayoutHorizontal4.png";
import img6 from "../assets/AutoLayoutHorizontal5.png";
import img7 from "../assets/AutoLayoutHorizontal6.png";
import img8 from "../assets/AutoLayoutHorizontal7.png";
import img9 from "../assets/AutoLayoutHorizontal8.png";
import footerImg from "../assets/footerImg.png";
import img32 from "../assets/fantastical.png"
const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        if (user.token) {
            navigate('/events')
        }
        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const images = [imga, img2, imgc, img4, img5, img6, img7, img8, img9];
    const arrFooter1 = [
        "About Spark",
        "Careers",
        "Terms and Conditions",
        "Blog",
        "Getting Started",
        "Privacy Policy",
        "Press",
        "Features",
        "Cookie Notice",
        "Social Good",
        "FAQS",
        "Trust Center",
        "Contact",
        "Report And Violation",
    ];
    return (
        <div
            style={{
                display: "flex",
                overflowY: "auto",
                justifyContent: "center",
                margin: "0px",
                flexDirection: "column",
                overflowX: "hidden",
                position: "relative",
                background: "#F1F6FA",
                alignItems: "center",
            }}
        >
            <NavBar />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    width: isHidden ? "100vw" : "50vw",
                    marginTop: "10rem",
                    alignItems: "center",
                }}
            >
                <h1 style={{ margin: "auto" }}>CNNCT – Easy</h1>
                <h1 style={{ margin: "auto" }}>Scheduling Ahead</h1>
                <button className={styles.navbarButton} onClick={() => navigate('/signup')}>Sign up free</button>
                <div style={{ height: "550px" }}>
                    <img
                        src={img1}
                        alt="icon"
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    width: isHidden ? "100vw" : "60vw",
                    marginTop: "2rem",
                    alignItems: "center",
                    padding: "0.2rem",
                }}
            >
                <h3>Simplified scheduling for you and your team</h3>
                <h4 style={{ textAlign: "center" }}>
                    CNNCT eliminates the back-and-forth of scheduling meetings so you can
                    focus on what matters. Set your availability, share your link, and let
                    others book time with you instantly.
                </h4>
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    width: isHidden ? "100vw" : "60vw",
                    marginTop: "2rem",
                    flexDirection: isHidden ? "column" : "",
                    padding: "0.2rem",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: isHidden ? "90vw" : "60vw",
                    }}
                >
                    <h2>Stay Organized with Your Calendar & Meetings</h2>
                    <p style={{ margin: "1rem" }}>Seamless Event Scheduling</p>
                    <ul>
                        <li style={{ padding: "1rem" }}>
                            View all your upcoming meetings and appointments in one place.
                        </li>
                        <li style={{ padding: "1rem" }}>
                            Syncs with Google Calendar, Outlook, and iCloud to avoid conflicts
                        </li>
                        <li style={{ padding: "1rem" }}>
                            Customize event types: one-on-ones, team meetings, group sessions,
                            and webinars.
                        </li>
                    </ul>
                </div>
                <div style={{ width: isHidden ? "96vw" : "40vw", height: "60vh", position: 'relative' }}>
                    <img src={img3} style={{ width: "100%", height: isHidden ? "80%" : '100%', position: 'absolute', top: '20px', right: '0px' }} alt='img1' />
                    <img src={img32} style={{ width: "100%", height: isHidden ? "80%" : '100%', position: 'absolute', top: '0px', left: '-40px' }} alt='img2' />
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    width: isHidden ? "100vw" : "80%",
                    marginTop: "2rem",
                    marginLeft: !isHidden ? "4rem" : "",
                    flexDirection: isHidden ? "column" : "row",
                    height: "20vh",
                    top: "3rem",
                    zIndex: "4",
                    justifyContent: !isHidden ? "space-between" : "center",
                    alignItems: isHidden ? "center" : "",
                }}
            >
                <div
                    className={styles.container1}
                    style={{
                        paddingLeft: "1rem",
                        paddingTop: "0px",
                        width: isHidden ? "100vw" : "",
                        textAlign: isHidden ? "center" : "",
                        margin: isHidden ? "auto" : "",
                    }}
                >
                    <h1 className={styles.heading} style={{ paddingTop: "0px" }}>
                        Here&apos;s what our{" "}
                        <span style={{ color: "#1877f2" }}>customer</span> has to say
                    </h1>
                    <button
                        className={styles.button}
                        style={{
                            fontSize: "0.8rem",
                            background: "none",
                            color: "#1877f2",
                            border: "1px solid #1877f2",
                            padding: "0.5rem 1rem",
                        }}
                    >
                        Read customer stories
                    </button>
                </div>
                {!isHidden && (
                    <div
                        style={{
                            width: "20%",
                            display: "flex",
                            justifyContent: "center",
                            marginRight: "5vw",
                            alignItems: "flex-start",
                        }}
                    >
                        <img
                            src={logo1}
                            alt="analytics"
                            style={{ width: "15px", height: "15px", objectFit: "contain" }}
                        />
                        <p style={{ marginLeft: "0.5rem" }}>
                            [short description goes in here] lorem ipsum is a placeholder text
                            to demonstrate.
                        </p>
                    </div>
                )}
            </div>
            <div
                className={styles.container2}
                style={{
                    display: isHidden ? "flex" : "",
                    overflowX: isHidden ? "scroll" : "",
                }}
            >
                <div
                    className={styles.box}
                    style={{
                        background: "#D7D6D5",
                        width: isHidden ? "400px" : "",
                        height: isHidden ? "300px" : "",
                    }}
                >
                    <div
                        className={styles.row}
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "520",
                            width: isHidden ? "400px" : "",
                        }}
                    >
                        Amazing Tool! Saved me months
                    </div>
                    <div
                        className={styles.row}
                        style={{ width: isHidden ? "400px" : "" }}
                    >
                        This is a placeholder for your testimonials and what the client has
                        to say,put them here and make sure it is 100% true and meaningful
                    </div>
                    <div className={styles.rowBottom}>
                        <div className={styles.circle}></div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <p className={styles.text}>JK Rowling</p>
                            <p className={styles.text}>Director, Spark.com</p>
                        </div>
                    </div>
                </div>
                <div
                    className={styles.box}
                    style={{
                        width: isHidden ? "400px" : "",
                        height: isHidden ? "300px" : "",
                    }}
                >
                    <div
                        className={styles.row}
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "520",
                            width: isHidden ? "400px" : "",
                        }}
                    >
                        Amazing Tool! Saved me months
                    </div>
                    <div
                        className={styles.row}
                        style={{ width: isHidden ? "400px" : "" }}
                    >
                        This is a placeholder for your testimonials and what the client has
                        to say,put them here and make sure it is 100% true and meaningful
                    </div>
                    <div className={styles.rowBottom}>
                        <div className={styles.circle}></div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <p className={styles.text}>JK Rowling</p>
                            <p className={styles.text}>Director, Spark.com</p>
                        </div>
                    </div>
                </div>
                <div
                    className={styles.box}
                    style={{
                        width: isHidden ? "400px" : "",
                        height: isHidden ? "300px" : "",
                    }}
                >
                    <div
                        className={styles.row}
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "520",
                            width: isHidden ? "400px" : "",
                        }}
                    >
                        Amazing Tool! Saved me months
                    </div>
                    <div
                        className={styles.row}
                        styles={{ width: isHidden ? "400px" : "" }}
                    >
                        This is a placeholder for your testimonials and what the client has
                        to say,put them here and make sure it is 100% true and meaningful
                    </div>
                    <div className={styles.rowBottom}>
                        <div className={styles.circle}></div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <p className={styles.text}>JK Rowling</p>
                            <p className={styles.text}>Director, Spark.com</p>
                        </div>
                    </div>
                </div>
                <div className={styles.box} style={{ background: "#D7D6D5" }}>
                    <div
                        className={styles.row}
                        style={{ fontSize: "1.2rem", fontWeight: "520" }}
                    >
                        Amazing Tool! Saved me months
                    </div>
                    <div className={styles.row}>
                        This is a placeholder for your testimonials and what the client has
                        to say,put them here and make sure it is 100% true and meaningful
                    </div>
                    <div className={styles.rowBottom}>
                        <div className={styles.circle}></div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <p className={styles.text}>JK Rowling</p>
                            <p className={styles.text}>Director, Spark.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <h1
                style={{
                    padding: "2rem",
                    marginLeft: !isHidden ? "2vw" : "",
                    textAlign: isHidden ? "center" : "",
                }}
            >
                All Link Apps and Integrations
            </h1>
            <div
                className={styles.gallery}
                style={{ gridTemplateColumns: isHidden ? "repeat(1, 1fr)" : "" }}
            >
                {images.map((image, index) => (
                    <div key={index} className={styles.imageContainer}>
                        <img
                            src={image}
                            alt={`Gallery item ${index + 1}`}
                            className={styles.image}
                        />
                    </div>
                ))}
            </div>
            <div
                style={{
                    display: "flex",
                    height: isHidden ? '860px' : '35vh',
                    width: "95%",
                    margin: "auto",
                    marginTop: "6vh",
                    background: "white",
                    flexDirection: isHidden ? "column" : "",
                }}
            >
                {!isHidden && (
                    <div style={{ display: "flex", margin: "2rem" }}>
                        <button
                            style={{
                                background: "#D3D3D3",
                                marginRight: "1vw",
                                height: "6vh",
                                width: "4vw",
                                border: "none",
                                borderRadius: "10px",
                            }}
                            onClick={() => navigate("/signin")}
                        >
                            Log in
                        </button>
                        <button
                            className={styles.button1}
                            style={{ height: "6vh", width: "8vw" }}
                            onClick={() => navigate("/signup")}
                        >
                            Sign up
                        </button>
                    </div>
                )}
                <div
                    className={styles.gridContainer}
                    style={{ gridTemplateColumns: isHidden ? "repeat(1, 1fr)" : "" }}
                >
                    {arrFooter1.map((item, index) => (
                        <div key={index} className={styles.gridItem}>
                            {item}
                        </div>
                    ))}
                </div>
                {isHidden && (
                    <div style={{ display: "flex", margin: "2rem", flexDirection: 'column' }}>
                        <button
                            className={styles.button1}
                            style={{ height: "6vh", width: "40vw", borderRadius: "25px" }}
                            onClick={() => navigate("/signup")}
                        >
                            Sign up
                        </button>
                        <div style={{ height: '40px' }}>
                            <img src={footerImg} style={{ height: '30px', width: '200px', margin: '3rem' }} />
                        </div>
                    </div>
                )}
            </div>
            {!isHidden && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "95%",
                        height: "10vh",
                        margin: "auto",
                        background: "white",
                    }}
                >
                    <div
                        style={{
                            width: "40%",
                            margin: "2rem",
                            fontWeight: "600",
                            fontSize: "0.8rem",
                        }}
                    >
                        We acknowledge the Traditional Custodians of the land on which our
                        office stands, The Wurundjeri people of the Kulin Nation, and pay
                        our respects to Elders past, present and emerging.
                    </div>
                    <div>
                        <img
                            src={footerImg}
                            style={{ marginRight: "1rem", margin: "2rem" }}
                        />
                    </div>
                </div>
            )}

        </div>
    );
};

export default Home;
