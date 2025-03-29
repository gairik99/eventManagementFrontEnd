import React from "react";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";

const DayAvailability = ({
    day,
    slots,
    isAllDay,
    dayIndex,
    addSlot,
    removeSlot,
    updateSlot,
    toggleAllDay,
}) => {
    if (day === "Sunday") {
        return (
            <div
                style={{
                    marginBottom: "20px",
                    opacity: 0.6,
                    padding: "10px",
                    backgroundColor: "#f5f5f5",

                }}
            >
                <h3>{day.slice(0, 3)}</h3>
                <div>Unavailable</div>
            </div>
        );
    }

    return (
        <div style={{
            marginBottom: "20px",
            padding: "10px",
            backgroundColor: "#fff",
            border: "1px solid #eee",
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h6>{day.slice(0, 3)}</h6>
                <label style={{ display: "flex", alignItems: "center", gap: '8px' }}>
                    <input
                        type="checkbox"
                        checked={isAllDay}
                        onChange={toggleAllDay}
                        style={{
                            width: "16px",
                            height: "16px",
                            margin: 0,
                            cursor: 'pointer'
                        }}
                    />
                </label>
            </div>
            {slots.map((slot, slotIndex) => (
                <div
                    key={slotIndex}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        margin: "10px 0",
                        position: 'relative'
                    }}
                >
                    <input
                        type="time"
                        value={slot.start}
                        onChange={(e) => updateSlot(dayIndex, slotIndex, "start", e.target.value)}
                        style={{
                            width: '120px',
                            padding: '6px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px',
                            marginTop: '0px'
                        }}
                        disabled={isAllDay}
                    />

                    <span style={{
                        margin: '8px 8px', // Compensate for input padding
                        lineHeight: '1',
                        fontSize: '14px'
                    }}>–</span>

                    <input
                        type="time"
                        value={slot.end}
                        onChange={(e) => updateSlot(dayIndex, slotIndex, "end", e.target.value)}
                        style={{
                            width: '120px',
                            padding: '6px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px',
                            marginTop: '0px'
                        }}
                        disabled={isAllDay}
                    />

                    {!isAllDay && (
                        <button
                            onClick={() => removeSlot(slotIndex)}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '0',
                                cursor: 'pointer',
                                marginLeft: '8px',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <RxCross2 style={{
                                fontSize: '18px',
                                marginTop: '1px' // Fine-tune alignment
                            }} />
                        </button>
                    )}
                </div>
            ))}
            {!isAllDay && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={addSlot}
                        style={{
                            color: 'black',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '6px 12px',
                            marginTop: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '14px',
                            marginLeft: 'auto',
                            background: 'none'
                        }}
                    >
                        <FaPlus />
                    </button>
                </div>
            )}
        </div>
    );
};

export default DayAvailability;
