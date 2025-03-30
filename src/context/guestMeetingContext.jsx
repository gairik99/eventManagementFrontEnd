import { useContext, useState, createContext, useEffect } from "react";

const GuestMeetingContext = createContext();

const GuestMeetProvider = ({ children }) => {
    const getInitialUser = () => {
        try {
            return JSON.parse(localStorage.getItem("meet2")) || [];
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return [];
        }
    };

    const [meet2, setMeet2] = useState(getInitialUser);

    useEffect(() => {
        if (meet2) {
            localStorage.setItem("meet2", JSON.stringify(meet2));
        }
    }, [meet2]);

    return (
        <GuestMeetingContext.Provider value={{ meet2, setMeet2 }}>
            {children}
        </GuestMeetingContext.Provider>
    );
};

const useGuestMeet = () => useContext(GuestMeetingContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useGuestMeet, GuestMeetProvider };