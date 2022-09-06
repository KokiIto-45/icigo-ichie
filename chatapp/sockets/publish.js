'use strict';

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('sendMessageEvent', function (data) {
        if (!data.message || !data.message.match(/\S/g)) {
            return;
        }
        const userId = String(socket.id)

        // 全クライアントが受信するメッセージ表示イベント（receiveMessageEvent）を送信する
        if (data.toUserId) {
            // 個別で送信
            io.to(data.toUserId).emit('receiveMessageEvent', data);
        } else {
            // 全クライアントが受信するメッセージ表示イベント（receiveMessageEvent）を送信する
            io.sockets.emit('receiveMessageEvent', {userId:userId,userName:data.userName,message:data.message})
            io.socket.emit('receiveMessageEvent',{data})
        }

    });
};