import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import JoinEvent from './JoinEvent';

const EventDetails = () => {
    const [eventInfo, setEventInfo] = useState({ title: '', description: '', location: '' });
    const [loggedIn, setLoggedIn] = useState(true);
    const params = useParams();
    // console.log(params.eventId);
    const eventId = params.eventId;
    console.log(eventId)
    const fetchEventDetails = async () => {
        const token = localStorage.getItem('jwt_token');
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}` // Set token in Authorization header
            }
        };
        const res = await fetch(`http://localhost:5000/events/activism/${eventId}`, config)
            .then(async (response) => {
                const res = await response.json();
                // eventData = res.data;
                // console.log(res);
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            })
        return res;
    }
    // const eventInfo = fectchEventDetails();
    // console.log(eventInfo + "k");


    useEffect(() => {
        const fetchData = async () => {
            const eventData = await fetchEventDetails();
            // console.log(eventData)
            setEventInfo(eventData === undefined ? { title: '', description: '', location: '' } : eventData); // Update the state with the fetched data
        }

        fetchData();
    }, []);


    return (
        <div>
            <div>
                <div>
                    <p> {eventInfo.title}</p>
                    <p> {eventInfo.description}</p>
                    <p> {eventInfo.location}</p>
                </div>
            </div>
            {loggedIn && (< JoinEvent />)}
            <div>
                <form action={`http://localhost:5000/calendar/${eventId}/google`} method="get">
                    <button type="submit">add event to google calendar</button>
                </form>
            </div>
        </div>
    )
}

export default EventDetails;