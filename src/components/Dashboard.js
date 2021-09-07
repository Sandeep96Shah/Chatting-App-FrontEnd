import React from 'react';
import Fuse from 'fuse.js';
import { Link } from 'react-router-dom';
import '../index.css';
import { handleConnect } from '../socket/Chat_socket';
import Friends from './Friends';
import { connect } from 'react-redux';
import Searched from './Searched';

import { makeFriend, show_users, show_friends, add_message, privateMessage } from '../actions/index';
import { useState, useEffect } from 'react';
import { handleSendMessage } from '../socket/Chat_socket';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { FaLaughBeam, FaTimes } from 'react-icons/fa';

toast.configure();
const Dashboard = (props) => {

    const [message, setMessage] =useState("");
    const [search, setSearch] = useState("");
    const [chatroom, setChatroom] = useState(null);
    const [ to, setTo] = useState(null);
    const [ showFriends, setShowFriends] = useState(true);
    const [ showChattingWith, setShowChattingWith ] = useState(false);
    const [ chattingWith, setChattingWith ] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setMessage(message + emoji);
      };

    const { friends } = props.friends;
    
   useEffect(() => {
        props.dispatch(show_users());
        props.dispatch(show_friends());
        if(window.innerWidth<=600){
            setShowFriends(false);
        }
        // eslint-disable-next-line
   },[search]);

   console.log("props", props);

    const { name, _id } = props.location.state.user;
   useEffect(() => {
    toast.success(`Welcome ${name}`,{autoClose:3000});
   },[name]);

   const fuse = new Fuse(props.friends.users, {
    keys: [
      'name',
    ],
    includeScore: true
  });
  const results = fuse.search(search);
    const characterResults = results.map(character => character.item);

     const clickHandle = (name, id, to, from) => {
         setChatroom(id);
         setTo(to);
        props.dispatch(privateMessage(to));
        handleConnect(name,id, props.dispatch, from, to );
        setShowFriends(false);
        setShowChattingWith(true)
        setChattingWith(name);
        toast.success(`Chatting With ${name}`);
    }

    const sendMessage = (from) => {
        if(chatroom === null){
            toast.warn("please select your friend to send message!");
            setMessage("");
        }
        else if(message === ""){
            toast.warn("Please Type something!");
        }else{
            props.dispatch(add_message(message, to));
            handleSendMessage(message, chatroom, name, from);
            setMessage("");
            setShowEmojis(false);
        }
        
    }

    const handleSignOut= () => {
        toast.success("SignOut Successfully!");
        localStorage.removeItem('token');
    }

    const handleName = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if(characterResults.length === 0){
            toast("No user found!");
        }
    }

    const handleSearched = () => {
        setSearch("");
    }

    const handleAddFriend = (id) => {
        const index = props.friends.friends.findIndex(friend => friend._id === id);
        if(index === -1){
            props.dispatch(makeFriend(props.location.state.user._id, id));
        }else{
            toast.info("Friendship Already Exists!");
        }
    }

    const handleshowFriends = () => {
        setShowFriends(!showFriends);
    }
    
    const handleKeyDown = (_id) => {
        sendMessage(_id);
    }

        // const { friends } = props.friends;
        // const { name, _id } = props.location.state.user;

        return (
            <>
            <div className="dashboard">
            <Link to="/login"><div className="logout" onClick={ () => handleSignOut() }>LogOut</div></Link>
                <div className="friendsList" >
                    <div className="friends_header" >
                        <input type="text" value={search} onChange={ (e) => handleName(e) } placeholder="Search Friend" />
                        <button onClick={ (e) => handleSearch(e) }>Search</button>
                    </div>
                    {
                        characterResults.length>0 && 
                        <div className="close" onClick={ () => handleSearched() }>Close</div>
                    }
                    
                    { 
                        characterResults.length>0 &&  
                        <div className="searched">{
                            characterResults.map((search) => <Searched key={search._id} handleAddFriend={handleAddFriend} name={search.name} id={search._id} clickHandle={clickHandle}/>)
                        }</div>
                    }
                    <div className="friends">
                        {
                            friends.map((friend,index) => <Friends from={_id} dispatch={props.dispatch} clickHandle={clickHandle}  key={friend._id} name={friend.name} to={friend._id}/>)
                        }
                    </div>
                </div>
                <div className="message_container">
                    <p className="message_container_p">{name}</p>
                    <div className="smallScreen">
                        <div className="showFriends" onClick={ () => handleshowFriends() }>
                            {
                                showFriends ? <p>Close</p> : <p>Friends</p>
                            }    
                        </div> 
                        {
                            showFriends && 
                            <div className="friends">
                            {
                                showFriends &&
                                friends.map((friend,index) => <Friends from={_id} dispatch={props.dispatch} clickHandle={clickHandle}  key={friend._id} name={friend.name} to={friend._id}/>)
                            }
                        </div>
                        }
                        <div className="showSearch">
                            <input type="text" value={search} onChange={ (e) => handleName(e) } placeholder="Search Friend" />
                            {
                                characterResults.length>0 && <div><p className="search_close" onClick={ () => handleSearched() } >Close</p></div> 
                            }
                        </div> 
                        { 
                            characterResults.length>0 &&  
                            <div className="searched">{
                                characterResults.map((search) => <Searched key={search._id} handleAddFriend={handleAddFriend} name={search.name} id={search._id} clickHandle={clickHandle}/>)
                            }</div>
                        }
                    </div>
                    <div>
                        { showChattingWith && <div><p className="chattingWith">{chattingWith}</p></div> }
                        <div className="message">
                            { 
                                props.messages.messages.map((pm, index) => (
                                    pm.user_id === _id ? <p key={index} className="self_message">{pm.msg}</p> :
                                    <p key={index} className="other_message">{pm.msg}</p>
                                ) )
                            }
                            {
                                showEmojis &&
                                <div className="emoji_div" ><Picker onSelect={addEmoji} /></div>
                            }
                        </div>
                        <div className="type_message">
                            <div  onClick={ () => setShowEmojis(!showEmojis) }>
                                {
                                    !showEmojis ?
                                    <p ><FaLaughBeam className="emoji" /></p> : 
                                    <p ><FaTimes className="emoji" /></p>
                                }
                            </div>
                            <input 
                            type="text"
                            name="message"
                            placeholder="Type Your Message"
                            onChange={ (e) => setMessage(e.target.value) }
                            value={message}
                            onKeyDown={e => e.key === 'Enter' && handleKeyDown(_id)}
                            />
                            <button  onClick={ () => sendMessage(_id) }>Send</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
}

function mapStateToprops(state){
    return{
       auth:state.auth, 
       friends:state.friends,
       messages:state.messages
    }
}

export default connect(mapStateToprops)(Dashboard);
