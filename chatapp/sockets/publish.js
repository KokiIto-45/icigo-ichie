'use strict';

module.exports = function (socket, io) {
    /*
    投稿メッセージを送信する
    引数 data = {
        message: <投稿文>, 
        userName: <ユーザ名>, 
        userId: <ユーザID>, 
        publishType: 'all' | 'dm' | 'reply',
        toUserName: <ダイレクトメッセージ先ユーザ名> | '',
        toUserId: <ダイレクトメッセージ先ユーザID> | '',
        toText: <返信先投稿内容> | '',
    }
    */
    socket.on('sendMessageEvent', function (data) {
        if (!data.message || !data.message.match(/\S/g)) {
            return;
        }

        // 投稿日を取得
        const date = new Date();
        const nowDate = date.getFullYear()
            + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
            + '/' + ('0' + date.getDate()).slice(-2)
            + ' ' + ('0' + date.getHours()).slice(-2)
            + ':' + ('0' + date.getMinutes()).slice(-2);
        // 投稿日を data に追加
        data.publishDate = nowDate;

        //自分だけに送信するメッセージ表示イベント
        socket.emit('receiveMyMessageEvent', data);

        //メンバー送信するメッセージ表示イベント
        if (data.publishType === 'dm' && data.toUserId) {
            // ダイレクトメッセージ
            io.to(data.toUserId).emit('receiveMemberMessageEvent', data);
        } else {
            // 全員に送信
            socket.broadcast.emit('receiveMemberMessageEvent', data)
        }
    });
};
