import { React, useEffect, useState } from 'react';
import axios from 'axios';
import EventComponent from './Event.js'

const Welecome = () => {
    const [events, setEvents] = useState();
    useEffect(() => {
        getEvents();
        // console.log(events, "k");
    }, []);
    const getEvents = async () => {
        console.log("hello");
        await axios.get('http://localhost:5000/events/activism')
            .then((response) => {
                setEvents(response.data.data);
                // console.log(response.data.data);
            })
            .catch((e) => {
                console.log(e);
                return false;
            })
    }

    // const events = getEvents();
    // console.log(events + "k");

    return (
        <div>
            <EventComponent events={events} />
        </div>
    )
}

export default Welecome;