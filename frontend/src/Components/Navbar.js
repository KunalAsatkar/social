import './Navbar.css'
import Profile from './Profile';
import { useState, useEffect } from 'react';
import profileImage from './Images/profile.png';
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios';


const Navbar = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const handleClick = () => {
        // console.log(`showProfile`);
        setShowProfile(!showProfile);
    }
    const checkLoggedIn = async () => {
        const token = localStorage.getItem("jwt_token");
        console.log(token);
        const result = await axios.get('http://localhost:5000/auth/user', {
            headers:
            {
                "Content-Type": "appliation/json",
                "Authorization": token
            }
        })
            .then((response) => {
                console.log(response);
                setLoggedIn(true);
                return response.data.status
            })
            .catch((err) => {
                console.log(err);
                setLoggedIn(false);
                return false;
            });
        console.log(result, "Navbar");
        // setLoggedIn(result);
        return result;
    };
    useEffect(() => {
        const check = async () => {
            let result = await checkLoggedIn()
            setLoggedIn(result);
            // console.log(loggedIn);
        }
        check();
    }, []);
    // useEffect(() => {
    //     const check = async () => {
    //         let result = await checkLoggedIn()
    //         setLoggedIn(result);
    //     }
    //     check();
    // }, [loggedIn]);

    return (
        <div>
            <section className="navbar">

                <div className="logo">
                    <Link to={loggedIn ? `/wellcome` : `/`} className='link'>Social</Link>
                </div>
                <div className="navigation">
                    <div>
                        <Link className="head link" to="/AwarenessPrograms">AwarenessPrograms</Link>
                    </div>
                    <div>
                        <Link className="head link" to="/about">Contact</Link>
                    </div>
                    {!loggedIn && (<div>
                        <Link className="head link" to="/auth">login/register</Link>
                    </div>)}
                    {loggedIn && (<div className="profile-container">
                        <button className="user-icon-button" onClick={handleClick} >
                            <img className="profile-image" src={profileImage} alt="" />
                        </button>
                        {showProfile && (<Profile
                            onLogout={checkLoggedIn} />)}
                    </div>)}
                </div>

            </section >
            <div><Outlet /></div>
        </div>
    );
}

export default Navbar;
