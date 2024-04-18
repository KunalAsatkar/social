import './Home.css'
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/auth');
    }
    return (
        <div className="home">
            <div className="hero-section">
                <div className="tagline">
                    <p>Discover Meaningful Opportunities to Make a Difference.</p>
                </div>
                <div className="cta-section">
                    <div className="join-us">
                        <span>click here to join</span>
                        <button className="join-button" onClick={handleClick} role="button">Join</button>
                    </div>
                    <div className="message">
                        <p >Join our vibrant community of volunteers and organizations,
                            where every event is a chance to create positive change and leave a lasting impact. </p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home;