'use strict';

module.exports = function (socket, io) {
    // 入室メッセージをクライアントに送信する
    socket.on('enter', function (userName) {
        if (!userName) {
            return;
        }
        const userId = socket.id
        // io.to(socket.id).emit('receiveEnterEvent', data);
        const message = `${userName}さん（id: ${userId}）が入室しました`
        socket.broadcast.emit('receiveEnterEvent', message);
        socket.emit('receiveEnterEventMyself', userId);
    });
};
