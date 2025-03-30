import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SideBar from "../components/SideBar";
import { useAuth } from "../context/authContext";
import { validateUpdateForm } from "../utils/validateUpdateForm";
import { updateUserProfile } from "../services/action";
import styles from "../styles/Settings.module.css";
import MobileLogout from "../components/MobileLogout";
import MobileNavBar from "../components/MobileNavBar";
const Settings = () => {
    const navigate = useNavigate();
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { user, setUser } = useAuth();
    const [formData, setFormData] = useState({
        firstName: user?.name.split(" ")[0] || "",
        lastName: user?.name.split(" ")[1] || "",
        email: user?.email || "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async () => {
        // Handle form submission
        try {
            const err = validateUpdateForm(formData);
            if (err) {
                toast.error(err);
                return;
            }

            const payload = {};
            if (formData.firstName) payload.firstName = formData.firstName;
            if (formData.lastName) payload.lastName = formData.lastName;
            if (formData.email) payload.email = formData.email;
            if (formData.password) payload.password = formData.password;
            const response = await updateUserProfile(payload, user.token);
            if (response.status == "ok") {
                setUser({ token: '' });
                navigate('/')
                toast.success("profile update successfully");
            }
        } catch (err) {
            toast.error("could not update profile", err);
        }
    };
    // console.log(formData);
    return (
        <div
            style={{
                display: "flex",
                background: " #F1F6FA",
                overflow: "auto",
                position: "realtive",
                paddingBottom: isHidden ? '' : "1rem",
            }}
        >
            {!isHidden && <SideBar />}
            <div style={{ display: "flex", flexDirection: "column", width: isHidden ? '100%' : '' }}>
                {!isHidden && <div
                    style={{ display: "flex", flexDirection: "column", padding: "1rem" }}
                >
                    <h3>
                        Profile
                    </h3>
                    <span>Manage settings for your profile</span>
                </div>}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        marginLeft: !isHidden ? "20px" : '0px',
                        position: "relative",
                        marginBottom: isHidden ? '0vh' : "10vh",
                        background: "white",
                        borderRadius: "8px",
                        width: isHidden ? '100vw' : ''
                    }}
                >

                    {isHidden && <MobileLogout />}
                    <form className={styles.formContainer} style={{ width: isHidden ? '100vw' : '' }}>
                        <div className={styles.heading}>
                            <span className={styles.headingText}>Edit Profile</span>
                            <hr />
                        </div>

                        <div className={styles.nameFields}>
                            <div className={styles.formGroup}>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className={styles.inputField}
                                    value={formData.firstName}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            firstName: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className={styles.inputField}
                                    value={formData.lastName}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            lastName: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className={styles.inputField}
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                                }
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className={styles.inputField}
                                placeholder="Enter new password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                                }
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className={styles.inputField}
                                placeholder="Confirm new password"
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        confirmPassword: e.target.value,
                                    }))
                                }
                                value={formData.confirmPassword}
                            />
                        </div>

                        <button
                            type="button"
                            className={styles.submitButton}
                            onClick={handleSubmit}
                            style={{ left: isHidden ? '6px' : '', right: !isHidden ? '6px' : '' }}
                        >
                            Save
                        </button>
                    </form>
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

export default Settings;
