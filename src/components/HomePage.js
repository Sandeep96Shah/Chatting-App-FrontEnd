import React from 'react';
import { Link } from 'react-router-dom';

 const HomePage = () => {
    return (
        <>
            <Link to="/login"><div className="register"><p>Register/SignIn</p></div></Link>
            <div className="navbar">
                <div><p>WelCome To The World Of Love</p></div>
            </div>
            <div className="homepage_container">
                <div className="homepage_title">
                    <p>
                        The Internet: transforming society and shaping the future through Chat!
                    </p>
                </div>
            </div>
        </>
    )
}

export default HomePage;
