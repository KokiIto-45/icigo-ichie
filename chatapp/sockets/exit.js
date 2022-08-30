'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('sendExitRoomEvent', function (data) {
        socket.broadcast.emit('receiveExitRoomEvent', data);
    });
};
