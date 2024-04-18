import { Link } from 'react-router-dom';
const EventComponent = (props) => {
    //console.log("k", typeof (props), props.events);
    // const handleClick = (id) => {
    //     //console.log(id);
    // }

    const { events = [] } = props;
    console.log(props.events);
    const eventsList = events.map((e, index) => (
        <Link to={`/event/${e._id}`} key={e._id}>
            <div className="event" >
                <p>{e.title}</p>
                <p>{e.description}</p>
                <p>{e.location}</p>
                {/* <p>{e._id}</p> */}
            </div>
        </Link>
    ));

    return (
        <div className="events">
            {eventsList}
        </div>
    );
};

export default EventComponent;