import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';

const JoinEvent = () => {
    const params = useParams();
    const eventId = params.eventId;
    // console.log(eventId);
    const register = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt_token');
        const data = {}
        // const config = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `${token}` // Set token in Authorization header
        //     },
        //     body: JSON.stringify(data)
        // };
        console.log(token);
        await axios.post(`http://localhost:5000/events/activism/${eventId}`, data, {
            headers:
            {
                "Content-Type": "appliation/json",
                "Authorization": token
            }
        })
            .then((response) => {
                console.log(response);
                setRegistered(!registered)
            })
            .catch((err) => {
                console.log(err);
            })
        // await fetch(`http://localhost:5000/events/activism/${eventId}`, config)
        //     .then((response) => {
        //         console.log(response)
        //         console.log(err.message)
        //     })
        //     .catch((err) => {
        //         setRegistered(!registered);
        //     });

    }
    const checkAlreadyJoined = async () => {
        const token = localStorage.getItem('jwt_token');
        // const data = {}
        await axios.get(`http://localhost:5000/events/activism/${eventId}/check`, {
            headers:
            {
                "Content-Type": "appliation/json",
                "Authorization": token
            }
        })
            .then((response) => {
                // console.log(response.data.status);
                if (response.data.status) {
                    setRegistered(!registered)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [registered, setRegistered] = useState(false);
    useEffect(() => {
        checkAlreadyJoined();
    }, [])
    return (
        <div className='event-attendance'>
            {!registered && (<form className='term-condition'>
                <label>
                    <input
                        type="checkbox"
                        checked={checkbox1}
                        onChange={() => setCheckbox1(!checkbox1)}
                    />
                    Agree with term and conditions
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={checkbox2}
                        onChange={() => setCheckbox2(!checkbox2)}
                    />
                    Notify for further events
                </label>
                <button type="submit" disabled={!checkbox1 || !checkbox2} onClick={register}>submit</button>
            </form >)
            }

            {registered && (
                <div>
                    <h1>Thank you</h1>
                    <p>you have successfully registered for the event</p>
                </div>
            )}
        </div>
    )
}

export default JoinEvent;