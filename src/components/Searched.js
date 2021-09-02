import React from 'react';
import { connect } from 'react-redux';
import '../index.css';

 const Searched = ({name, id, clickHandle, handleAddFriend}) => {
    return (
        <div className="searched_friend">
            <div><p onClick={ () => clickHandle(name, id) }>{name}</p></div>
            <div><button onClick={ () => handleAddFriend(id) }>Add</button></div>
        </div>
    )
}

function mapStateToprops(state){
    return{
       friends:state.friends
    }
}


export default connect(mapStateToprops)(Searched);
