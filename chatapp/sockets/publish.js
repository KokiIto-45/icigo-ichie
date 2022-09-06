'use strict';

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('sendMessageEvent', function (data) {
        if (!data.message || !data.message.match(/\S/g)) {
            return;
        }

        // 全クライアントが受信するメッセージ表示イベント（receiveMessageEvent）を送信する
        //自分だけに送信するメッセージ表示イベント
        socket.emit('receiveMyMessageEvent',data);
        //メンバー送信するメッセージ表示イベント
        socket.broadcast.emit('receiveMemberMessageEvent',data)

        


    });
};
