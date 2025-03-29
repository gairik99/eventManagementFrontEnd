import { useContext, useState, createContext, useEffect } from "react";

const MyMeetingContext = createContext();


const MyMeetProvider = ({ children }) => {
    const getInitialUser = () => {
        try {
            return JSON.parse(localStorage.getItem("meet1")) || {};
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return {};
        }
    };

    const [meet1, setMeet1] = useState(getInitialUser);

    useEffect(() => {
        if (meet1) {
            localStorage.setItem("meet1", JSON.stringify(meet1));
        }
    }, [meet1]);

    return (
        <MyMeetingContext.Provider value={{ meet1, setMeet1 }}>
            {children}
        </MyMeetingContext.Provider>
    );
};

const useMyMeet = () => useContext(MyMeetingContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useMyMeet, MyMeetProvider };