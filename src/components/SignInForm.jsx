import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { toast } from "react-toastify";
import { loginUser } from "../services/action";
import { useAuth } from "../context/authContext";
import logo from "../assets/icon.png";
import styles from "../styles/SignUpForm.module.css";


const SignInForm = ({ hidden }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [visible, setVisible] = useState(false);
    const { setUser } = useAuth();
    // console.log(formData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        setLoading(true);
        try {
            // Prepare user data for API call
            const userData = {
                email: formData.email,
                password: formData.password,
            };

            const response = await loginUser(userData);
            setUser((prev) => ({
                ...prev,
                token: response.token,
                userName: response.user.userName,
                email: response.user.email,
                name: response.user.firstName + " " + response.user.lastName,
                category: response.user.category,
                id: response.user._id,
                availability: response.user.availability
            }));
            // console.log(response);

            // Handle successful registration
            if (response.status === "ok") {
                toast.success("Signin successful!");
                setFormData((prev) => ({
                    ...prev,
                    email: "",
                    password: "",
                }));
                navigate("/usernameupdate");
            }
        } catch (error) {
            // Handle errors
            const errorMessage =
                error.response?.data?.message || "Signin failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container} style={{ justifyContent: "start", width: hidden ? '100vw' : '' }}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Logo" className={styles.logoImage} />
                <span className={styles.logoText}>
                    CNNCT
                </span>
            </div>
            <form
                className={styles.form}
                style={{ alignItems: "start", marginTop: "15vh", width: hidden ? '90vw' : '' }}
            >
                <h1 className={styles.heading} style={{ margin: "1vh" }}>
                    Sign up to your CNNCT
                </h1>
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Spark/Email"
                    />
                </div>
                <div className={styles.formGroup} style={{ position: "relative" }}>
                    <input
                        type={visible ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="password"
                    />
                    <div onClick={() => setVisible(prev => !prev)}>
                        {!visible ? <IoIosEyeOff className={styles.eyeIcon} /> : <IoMdEye className={styles.eyeIcon} />}
                    </div>
                </div>
                <button
                    type="submit"
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    style={{ marginTop: "5vh", backgroundColor: "#DCDED2" }}
                    disabled={loading}
                >
                    {loading ? "Logging In" : "Log in"}
                </button>
            </form>
            <span>
                Don&apos;t have an account?
                <span
                    style={{
                        textDecoration: "underline",
                        color: "#1877f2",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/signup")}
                >
                    Sign up
                </span>
            </span>
            <span style={{ color: "#676B5F", marginTop: "25vh" }}>
                This site is protected by reCAPTCHA and the{" "}
                <span style={{ textDecoration: "underline" }}>
                    Google Privacy Policy{" "}
                </span>{" "}
                and{" "}
                <span style={{ textDecoration: "underline" }}>Terms of Service</span>{" "}
                apply.
            </span>
        </div>
    );
};

export default SignInForm;
