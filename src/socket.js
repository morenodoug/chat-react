import io from 'socket.io-client';
import config from './config'
let socket = io.connect(config.chatHost);

export default {
    /**
     * 
     */
    connectToChat: function(user, newUserConnected, userDisconnected, setChatList) {
        socket.on('users-connected', function(usersConnected) {
            setChatList(usersConnected);

        })
        socket.emit('connect-to-chat', user)


        socket.on('new-user-connected', (newUser) => (newUserConnected(newUser)));
        socket.on('user-disconnected', (data) => (userDisconnected(data)))
    },


}