import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../index.css';
import { user, user_validate } from '../actions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const Navbar = (props) => {
    const [email, setEmail] =useState(false);
    const [OTP, setOTP] =useState();
    const [userName, setUserName] = useState("");
    const history = useHistory();

    useEffect(() => {
        if(props.auth.isValid){
            toast.error("Invalid Token");
        }
    },[props.auth.isValid]);

    const handleClick = (e,email) => {
        e.preventDefault();
        props.dispatch(user(email));
    }
    
    const handleValidate = (e, otp, email, userName) => {
        e.preventDefault();
        props.dispatch(user_validate(otp, email, history, userName));
    }

    const { name, otp } = props.auth;
    return (
        <>
        <Link to="/"><div className="homepage"><p>Home</p></div></Link>
        <div className="navbar">
            <div><h1>Connecting People Through Messaging!</h1></div>
        </div>
        <div className="sign_container sign_top">
            <div className="sign_header">
                <h1>{"Register/SignIn"}</h1>
            </div>
            <div className="form_container">
                <form>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {
                        name && <>
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text"
                                name="name"
                                onChange={ (e) => setUserName(e.target.value) }
                            />
                        </>
                    }
                   {
                       otp && <>
                            <label htmlFor="otp">OTP</label>
                            <input 
                                type="text"
                                name="otp"
                                onChange={(e) => setOTP(e.target.value)}
                            />
                       </>
                   }
                    <div className="submit_btn">
                        {
                            !otp && 
                            <button onClick={ (e) => handleClick(e, email)  } className="submit_btn_input">Request For OTP</button>
                        }
                        {
                            otp && 
                            <button onClick={  (e) =>  handleValidate(e, OTP, email, userName) } className="submit_btn_input">Sign IN</button>
                        }
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }

export default connect(mapStateToProps)(Navbar);
