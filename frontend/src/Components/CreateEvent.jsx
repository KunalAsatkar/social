import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateEvent = () => {
    const [data, setData] = useState({
        title: "",
        description: "",
        details: "",
        location: "",
        startDateTime: "",
        endDateTime: "",
    });
    const [eventCreated, setEventCreated] = useState(false);
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const createEventHandler = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt_token');
        const user = localStorage.getItem('username');
        await axios.post(`http://localhost:5000/events/activism/${user}/addevent`, data, {
            headers: {
                "Authorization": token
            }
        })
            .then((response) => {
                console.log(response);
                setEventCreated(!eventCreated);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const changeState = () => {
        setEventCreated(!eventCreated);
    }
    const username = localStorage.getItem('username');
    useEffect(() => {

    }, [eventCreated])
    return (
        <div className="main">
            {!eventCreated && (<form className="register">
                <label htmlFor="title">title</label>
                <input value={data.title} onChange={changeHandler} type="text" name="title" id="title" placeholder="title" />
                <label htmlFor="description">description</label>
                <input value={data.description} onChange={changeHandler} type="text" name="description" id="description" placeholder="description" />
                <label htmlFor="details">details</label>
                <input value={data.details} onChange={changeHandler} type="text" name="details" id="details" placeholder="details" />
                <label htmlFor="location">location</label>
                <input value={data.location} onChange={changeHandler} type="text" name="location" id="location" placeholder="location" />
                <label htmlFor="startDateTime">Start Date and Time</label>
                <input value={data.startDateTime} onChange={changeHandler} type="datetime-local" name="startDateTime" id="startDateTime" placeholder="Start Date and Time" />
                <label htmlFor="endDateTime">End Date and Time</label>
                <input value={data.endDateTime} onChange={changeHandler} type="datetime-local" name="endDateTime" id="endDateTime" placeholder="End Date and Time" />
                <button onClick={createEventHandler} type="submit">create Event</button>
            </form>)}
            {eventCreated && (
                <div>
                    <span>click here to create next Event</span>
                    <Link to={`/${username}/createEvent`} onClick={changeState}>create</Link>
                </div>
            )}
        </div>

    )
}

export default CreateEvent;