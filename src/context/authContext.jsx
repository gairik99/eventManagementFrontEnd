/* eslint-disable react-refresh/only-export-components */
import { useContext, useState, createContext, useEffect } from "react";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const getInitialUser = () => {
        try {
            return JSON.parse(localStorage.getItem("user")) || { token: "", userName: "" };
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return { token: "", userName: "" };
        }
    };

    const [user, setUser] = useState(getInitialUser);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };