import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import { updateUserProfile } from "../services/action";
import signupImage from "../assets/person.png";
import styles from "../styles/UserNameUpdatePage.module.css";
import logo from "../assets/icon.png";


const buttonArr = [
    { name: "Sales", id: 1, logo: "🏢" },
    { name: "Education", id: 2, logo: "📚" },
    { name: "Finance", id: 3, logo: "💹" },
    { name: 'Goverment and Politics', id: 4, logo: '⚖️' },
    { name: 'Consulting', id: 5, logo: '💼' },
    { name: 'Recruiting', id: 6, logo: '📝' },
    { name: 'Tech', id: 7, logo: '🖥️' },
    { name: 'Marketing', id: 8, logo: '🚀' },
];

const UserNameUpdatePage = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [formData, setFormData] = useState({
        userName: user.userName || "",
        category: user.category || "",
    });
    const [loading, setLoading] = useState(false);
    const handleCategorySelect = (categoryId) => {
        setFormData(prev => ({
            ...prev,
            category: categoryId
        }));
    };

    const handleUsernameChange = (e) => {
        setFormData(prev => ({
            ...prev,
            userName: e.target.value
        }));
    };
    // console.log(formData);
    // console.log(user.token)

    const handleSubmit = async () => {
        setLoading(true);

        try {
            if (formData.userName === "" || formData.category === "") {
                toast.error("Please fill all the fields");
                return;
            }
            const response = await updateUserProfile(formData, user.token);
            if (response.message) {
                toast.success(response.message);
                setUser(prev => ({
                    ...prev,
                    userName: response.user.userName,
                    category: response.user.category
                }));
                if (user.token)
                    navigate("/events");
            }


        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "Update failed. Please try again.";
            toast.error(errorMessage);

        } finally {
            setLoading(false);
        }
    };

    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div style={{ display: "flex", overflow: "hidden" }}>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="Logo" className={styles.logoImage} />
                    <span className={styles.logoText}>
                        CNNCT
                    </span>
                </div>
                <h1 className={styles.heading}>Your Preferences </h1>
                <input type="text" placeholder="Tell us your username" value={formData.userName}
                    onChange={handleUsernameChange} />
                <span style={{ marginTop: '5vh' }}>Select one category that best describes your CNNCT:</span>
                <div className={styles.buttonsContainer} >
                    {buttonArr.map((button) => (
                        <button
                            key={button.id}
                            className={`${styles.categoryButton} ${formData.category === button.id.toString() ? styles.selected : ""
                                }`}
                            onClick={() => handleCategorySelect(button.id.toString())}
                        >
                            <span>{button.logo}</span>
                            {button.name}
                        </button>
                    ))}
                </div>
                <button className={styles.submitButton} onClick={handleSubmit} disabled={loading}>{loading ? 'wait' : 'Continue'}</button>
            </div>
            {!isHidden && <div style={{ height: "100vh", width: "30vw" }}>
                <img
                    src={signupImage}
                    alt="image"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>}
        </div>
    );
};

export default UserNameUpdatePage;