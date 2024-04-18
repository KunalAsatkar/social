import { Link } from 'react-router-dom';
const EventList = (props) => {
    console.log(props, "props");
    return (
        <div className="joined-created-events">
            <div className='eventlist-heading'>
                {props.enrolled ? (<p>JoinedEvents</p>) : (<p>CreatedEvents</p>)}
            </div>
            <div className='list-events'>
                {
                    props.events.map((event) => {
                        return (<Link className="link" to={`user/${event._id}`}>{event.title}</Link>)
                    })
                }
            </div>
        </div >
    )
}

export default EventList;