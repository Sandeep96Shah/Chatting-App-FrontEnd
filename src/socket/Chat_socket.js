import { io } from "socket.io-client";
import { addMessage } from '../actions/index';
import  jwt_decode from 'jwt-decode';
 
export const handleConnect = (name, id, dispatch, from, to) => {
    const socket = io("https://baatkre.herokuapp.com/", { transports : ['websocket'] });
    socket.on('connect', () => {
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
                if(user._id === data.from){
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
            })
           
    })
}

export const handleSendMessage = (msg,id,name, from) => {
    const socket = io("https://baatkre.herokuapp.com/", { transports : ['websocket'] });
    socket.emit('send_message', {
        message: msg,
        name: name,
        chatRoom: id,
        from,
    });
}