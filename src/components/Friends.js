import React from 'react';
import { connect } from 'react-redux';
import '../index.css';
import { getChatroom } from '../actions';
import { useEffect, useState } from 'react';

 const Friends = (props) => {
    const {to, name, clickHandle, dispatch, from} = props;
    const [ chatroom, setChatroom] = useState();
     useEffect(() => {
        dispatch(getChatroom(to, setChatroom));
     },[to, dispatch]);
    return (
        <>
            <div><p onClick={ () => clickHandle(name, chatroom, to, from) }>{name}</p></div>
        </>
    )
}

function mapStateToprops(state){
    return{
       auth:state.auth,
       friends:state.friends,
       messages:state.messages,
    }
}

export default connect(mapStateToprops)(Friends);
