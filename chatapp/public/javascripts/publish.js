'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();

    // 投稿内容を送信
    socket.emit('sendMessageEvent',{message:message,userName:userName});

    $('#message').val("");

};


// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMyMessageEvent', function (data) {
    // 画面上にメッセージを表示
    $('#thread').prepend('<p class="my-msg">' + data.userName +'さん:<br>'+data.message + '</p>');
})
socket.on('receiveMemberMessageEvent', function (data) {
    // 画面上にメッセージを表示
    $('#thread').prepend('<p class="member-msg">' + data.userName +'さん:<br>'+data.message + '</p>');
})

