import axios from 'axios'
import { useState, useEffect } from 'react';
import EventList from './EventList';
const Dashboard = () => {
    const [joinedEvnets, setJoinedEvents] = useState([]);
    const [createdEvents, setCreatedEvents] = useState([]);

    const getJoinedEvents = async () => {
        const user = localStorage.getItem('username');
        const token = localStorage.getItem('jwt_token');
        console.log("getJoinedEvents", user, token);
        await axios.get(`http://localhost:5000/events/activism/${user}/createdandjoinedevents`, {
            headers: {
                "Authorization": token
            }
        })
            .then((response) => {
                const data = response.data.data;
                console.log(data.joinedEvents, data.createdEvents);
                setJoinedEvents(data.joinedEvents);
                setCreatedEvents(data.createdEvents);
                console.log(joinedEvnets, createdEvents);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        const fetchData = async () => {
            console.log("first");
            const data = await getJoinedEvents();
        }
        fetchData();
    }, [])

    return (
        <div>
            <EventList events={joinedEvnets} enrolled={true} />
            <EventList events={createdEvents} enrolled={false} />
        </div>
    )
}

export default Dashboard;