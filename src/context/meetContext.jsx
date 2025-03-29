import { useContext, useState, createContext, useEffect } from "react";

const MeetContext = createContext();


const MeetProvider = ({ children }) => {
    const getInitialUser = () => {
        try {
            return JSON.parse(localStorage.getItem("meet")) || {};
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return {};
        }
    };

    const [meet, setMeet] = useState(getInitialUser);

    useEffect(() => {
        if (meet) {
            localStorage.setItem("meet", JSON.stringify(meet));
        }
    }, [meet]);

    return (
        <MeetContext.Provider value={{ meet, setMeet }}>
            {children}
        </MeetContext.Provider>
    );
};

const useMeet = () => useContext(MeetContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useMeet, MeetProvider };