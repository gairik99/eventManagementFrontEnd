import React, { useState } from 'react';
import DayAvailability from './DayAvailability';
import { updateUserProfile } from '../services/action';
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';

const AvailabilityComp = ({ hidden }) => {
    const { user, setUser } = useAuth();
    const [days, setDays] = useState(() => {
        const currentWeekDates = getCurrentWeekDates();
        const defaultDays = [
            { day: "Monday", date: currentWeekDates[0], slots: [], isAllDay: false },
            { day: "Tuesday", date: currentWeekDates[1], slots: [], isAllDay: false },
            { day: "Wednesday", date: currentWeekDates[2], slots: [], isAllDay: false },
            { day: "Thursday", date: currentWeekDates[3], slots: [], isAllDay: false },
            { day: "Friday", date: currentWeekDates[4], slots: [], isAllDay: false },
            { day: "Saturday", date: currentWeekDates[5], slots: [], isAllDay: false },
            { day: "Sunday", date: currentWeekDates[6], slots: [], isAllDay: false }
        ];
        if (user?.availability) {
            return defaultDays.map(defaultDay => {
                const savedDay = user.availability.find(d => d.day === defaultDay.day);
                return savedDay ? {
                    ...defaultDay,
                    isAllDay: savedDay.isAllDay,
                    slots: savedDay.slots
                } : defaultDay;
            });
        }
        return defaultDays;
    });

    function formatLocalDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getCurrentWeekDates() {
        const dates = [];
        const today = new Date();
        const dayOfWeek = today.getDay();
        const monday = new Date(today);
        monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            dates.push(formatLocalDate(date));
        }
        return dates;
    }

    const toggleAllDay = (dayIndex) => {
        setDays(prevDays =>
            prevDays.map((day, index) =>
                index === dayIndex ? {
                    ...day,
                    isAllDay: !day.isAllDay,
                    slots: !day.isAllDay ? [{ start: '00:00', end: '23:59' }] : []
                } : day
            )
        );
    };

    const addSlot = (dayIndex) => {
        setDays(prevDays =>
            prevDays.map((day, index) =>
                index === dayIndex ? {
                    ...day,
                    slots: [...day.slots, { start: "", end: "" }]
                } : day
            )
        );
    };

    const removeSlot = (dayIndex, slotIndex) => {
        setDays(prevDays =>
            prevDays.map((day, index) =>
                index === dayIndex ? {
                    ...day,
                    slots: day.slots.filter((_, i) => i !== slotIndex)
                } : day
            )
        );
    };

    const updateSlot = (dayIndex, slotIndex, field, value) => {
        setDays(prevDays =>
            prevDays.map((day, dIndex) =>
                dIndex === dayIndex ? {
                    ...day,
                    slots: day.slots.map((slot, sIndex) =>
                        sIndex === slotIndex ? { ...slot, [field]: value } : slot
                    )
                } : day
            )
        );
    };

    const prepareAvailabilityData = () => {
        return {
            availability: days.map(day => ({
                day: day.day,
                date: day.date,
                isAllDay: day.isAllDay,
                slots: day.day === 'Sunday' ? [] : day.isAllDay
                    ? [{ start: '00:00', end: '23:59' }]
                    : day.slots.map(slot => ({
                        start: slot.start || '00:00',
                        end: slot.end || '23:59'
                    }))
            }))
        };
    };

    const handleSave = async () => {
        try {
            const formData = prepareAvailabilityData();
            const response = await updateUserProfile(formData, user.token);
            console.log(response);
            if (response.status === 'ok') {
                toast.success(response.message);
                setUser(prev => ({
                    ...prev,
                    availability: response.user.availability
                }));
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "Update failed. Please try again.";
            toast.error(errorMessage);
        }
    };
    console.log(days)
    return (
        <div style={{ padding: '10px', border: '1px solid black', borderRadius: '5px', width: !hidden ? '36vw' : '96vw', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', paddingBottom: '10px' }}>
                <h5>Activity</h5>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h5>Time Zone</h5>
                    <h6 style={{ color: 'blue' }}>Indian Standard Time</h6>
                </div>
            </div>
            {days.map((day, dayIndex) => (
                <DayAvailability
                    key={day.day}
                    day={day.day}
                    slots={day.slots}
                    isAllDay={day.isAllDay}
                    dayIndex={dayIndex}
                    addSlot={() => addSlot(dayIndex)}
                    removeSlot={(slotIndex) => removeSlot(dayIndex, slotIndex)}
                    updateSlot={updateSlot}
                    toggleAllDay={() => toggleAllDay(dayIndex)}
                />
            ))}
            <button
                style={{
                    color: "#ffffff",
                    background: "#1877f2",
                    width: "100px",
                    height: "40px",
                    marginLeft: '72%',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid #1877f2",
                    borderRadius: "20px",
                    fontSize: "20px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    ":hover": {
                        background: "#1877f2",
                        color: "#ffffff",
                    },
                }}
                onClick={handleSave}
            >
                Save
            </button>
        </div>
    );
};

export default AvailabilityComp;