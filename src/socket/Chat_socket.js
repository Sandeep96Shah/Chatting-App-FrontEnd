import { io } from "socket.io-client";
import { addMessage } from '../actions/index';
import  jwt_decode from 'jwt-decode';
 
export const handleConnect = (name, id, dispatch, from, to) => {
    // console.log("ddddispatchhhhh", dispatch);
    const socket = io("https://baatkre.herokuapp.com:7000", { transports : ['websocket'] });
    socket.on('connect', () => {
      //console.log("connected to the server via Socket.io!");
      socket.emit('joinroom',
            {
                userName: name,
                chatRoom : id, 
            });
            socket.on('user-joined',function(data)
            {
                //console.log('a user joined Here',data);
            })
            socket.on('receive_message', function(data){
                const token = localStorage.getItem('token');
                const user = jwt_decode(token);
                //console.log("user token  checking", user);
                if(user._id == data.from){
                    const receive = {
                        msg : data.message,
                        user_id : from,
                    }
                    dispatch(addMessage(receive))
                }else{
                    const receive = {
                        msg : data.message,
                        user_id : to,
                    }
                    dispatch(addMessage(receive))
                }
                //console.log("receive_message", data)
            })
           
    })
}

export const handleSendMessage = (msg,id,name, from) => {
    const socket = io("https://baatkre.herokuapp.com:7000", { transports : ['websocket'] });
    //console.log("message", msg);
    //console.log("idddddd", id);
    socket.emit('send_message', {
        message: msg,
        name: name,
        chatRoom: id,
        from,
    });
}