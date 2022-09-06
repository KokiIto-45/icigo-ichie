'use strict';

module.exports = function (socket, io) {
    // 入室メッセージをクライアントに送信する
    socket.on('enter', function (userName) {
        if (!userName) {
            return;
        }
        console.log(userName)
     
        socket.broadcast.emit('receiveEnterEvent', message);

      
    });
};
