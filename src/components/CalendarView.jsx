import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import moment from 'moment';
import styles from '../styles/CalendarView.module.css';
import { useGuestMeet } from "../context/guestMeetingContext";
import { useAuth } from '../context/authContext';
import { CiSearch } from "react-icons/ci";
const CalendarView = ({ hidden }) => {
    const { meet2 } = useGuestMeet();
    const { user } = useAuth();
    const [currentView, setCurrentView] = useState('dayGridMonth');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter meetings based on search query
    const filteredMeetings = meet2.filter(meeting =>
        meeting.eventTopic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Convert filtered meetings to calendar events
    const events = filteredMeetings.map(meeting => {
        const isRejected = meeting.guests?.some(guest =>
            guest.user === user?.id && guest.status === 'rejected'
        );

        const startMoment = moment(
            `${meeting.date} ${meeting.time} ${meeting.ampm}`,
            'YYYY-MM-DD h:mm A'
        );

        const endMoment = startMoment.clone().add(meeting.duration, 'hours');

        return {
            id: meeting._id,
            title: meeting.eventTopic,
            start: startMoment.toISOString(),
            end: endMoment.toISOString(),
            backgroundColor: isRejected ? '#cccccc' : '#1877f2',
            borderColor: isRejected ? '#999999' : '#1877f2',
            textColor: 'white',
            extendedProps: {
                isRejected,
                host: meeting.hostName,
                description: meeting.description,
                duration: meeting.duration
            }
        };
    });

    const eventContent = (eventInfo) => {
        const startTime = moment(eventInfo.event.start).format('h:mm A');
        const endTime = moment(eventInfo.event.end).format('h:mm A');

        return (
            <div className={styles.eventContent} style={{ backgroundColor: eventInfo.event.backgroundColor, color: 'white' }}>
                <div className={styles.eventTime}>
                    {startTime} - {endTime}
                </div>
                <div className={styles.eventTitle}>
                    {eventInfo.event.title}
                </div>
            </div>
        );
    };

    return (
        <div className={`${styles.calendarContainer} ${hidden ? styles.mobile : ''}`}>
            <div className={styles.calendarHeader}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {!hidden && <div style={{ display: 'flex', gap: '4rem', }}>
                        <p style={{ fontWeight: '600' }}>Activity</p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                            <p style={{ fontWeight: '600' }}>Time Zone</p>
                            <p style={{ color: 'blue' }}>Indian Time Standard</p>
                        </div>
                    </div>}
                    <div className={styles.searchContainer}>
                        <CiSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                            style={{ marginTop: '0px' }}
                        />
                    </div>
                </div>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                    initialView={currentView}
                    headerToolbar={{
                        left: 'dayGridMonth,timeGridWeek,timeGridDay,listYear',
                        center: !hidden ? 'title' : '',
                        right: 'prev,next,today'
                    }}
                    events={events}
                    height="auto"
                    eventContent={eventContent}
                    eventDidMount={(info) => {
                        info.el.style.cursor = 'pointer';
                        info.el.style.borderRadius = '4px';
                    }}
                    // eventClick={(info) => {
                    //     console.log('Event clicked:', info.event);
                    // }}
                    datesSet={(dateInfo) => {
                        setCurrentView(dateInfo.view.type);
                    }}
                />
            </div>
        </div>
    );
};

export default CalendarView;