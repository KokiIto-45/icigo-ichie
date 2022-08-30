'use strict';

module.exports = function (socket, io) {
    // 入室メッセージをクライアントに送信する
    socket.on('enter', function (data) {
        if (!data) {
            return;
        }
        socket.broadcast.emit('receiveEnterEvent', data);
    });
};
