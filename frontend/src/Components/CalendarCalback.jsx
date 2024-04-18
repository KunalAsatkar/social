import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CalendarCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const eventId = searchParams.get('eventId');
        console.log('Received eventId:', eventId);
        console.log('Received eventId:', eventId);
        console.log('Received eventId:', eventId);
        navigate(`event/${eventId}`);
    }, [location, navigate]);

    return (
        <div>
            <h1>Google Callback Page</h1>
            <p>Handling the Google OAuth2 callback...</p>
        </div>
    );
};

export default CalendarCallback;