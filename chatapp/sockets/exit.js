'use strict';

module.exports = function (socket, io, onlineUsers) {
    const postDate = require('../public/javascripts/memo')
    // 退室メッセージをクライアントに送信する
    socket.on('sendExitRoomEvent', function (data) {
        const userId = socket.id;
        const index = onlineUsers.findIndex(user => user.id === userId);
        data.exitDate = postDate()
        onlineUsers.splice(index, 1);
        socket.broadcast.emit('receiveExitRoomEvent', data);
        io.sockets.emit('deleteOnlineUsersEvent', onlineUsers);
    });
};