import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/icon.png";
import styles from "../styles/SignUpForm.module.css";
import { validateForm } from "../utils/validateSignUpForm";
import { registerUser } from "../services/action";


const SignUpForm = ({ hidden }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreed: false,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);
        try {
            // Prepare user data for API call
            // console.log(formData);
            const userData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                agree: formData.agreed,
            };

            const response = await registerUser(userData);

            // Handle successful registration
            if (response.status === "ok") {
                toast.success("Signup successful!");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    agreed: false,
                });

                // Clear errors
                setErrors({});
                navigate("/signin");
            }

            // Reset form
        } catch (error) {
            // Handle errors
            const errorMessage =
                error.response?.data?.message || "Signup failed. Please try again";
            toast.error(errorMessage);

            // Handle specific server validation errors if needed
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className={styles.container} style={{ width: hidden ? '100vw' : '', gap: hidden ? '0.5vh' : '' }}>
            <div className={styles.logoContainer} style={{ marginBottom: hidden ? '1rem' : '' }}>
                <img src={logo} alt="Logo" className={styles.logoImage} />
                <span className={styles.logoText}>
                    CNNCT
                </span>
            </div>
            <h1 className={styles.heading}>Sign up to your CNNCT</h1>
            <form className={styles.form} style={{ width: hidden ? '90vw' : '' }}>
                <div className={styles.authHeader}>
                    <h3>Create an account</h3>
                    <p
                        className={styles.switchButton}
                        onClick={() => navigate("/signin")}
                    >
                        Sign in instead
                    </p>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && (
                        <p className={styles.errorText}>{errors.firstName}</p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && (
                        <p className={styles.errorText}>{errors.lastName}</p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className={styles.errorText}>{errors.email}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <p className={styles.errorText}>{errors.password}</p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <p className={styles.errorText}>{errors.confirmPassword}</p>
                    )}
                </div>
                <div className={styles.checkboxGroup}>
                    <label >
                        <input
                            type="checkbox"
                            name="agreed"
                            checked={formData.agreed}
                            onChange={handleChange}
                        />
                        <span className={styles.checkboxText}>
                            By creating an account, I agree to our{" "}
                            <span className={styles.link}>Terms of use</span> and{" "}
                            <span className={styles.link}>Privacy Policy</span>
                        </span>
                    </label>
                    {errors.agreed && <p className={styles.errorText}>{errors.agreed}</p>}
                </div>
                <button
                    type="submit"
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {" "}
                    {loading ? "Creating account..." : "Create an account"}
                </button>
            </form>
            <span style={{ color: "#676B5F", marginTop: "5vh" }}>
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

export default SignUpForm;
