'use strict';


$(document).ready(enter());
// 入室メッセージをサーバに送信する
function enter() {
    // 入力されたユーザ名を取得する
    const userName = $('#userName').val();
    // 入室メッセージイベントを送信する
    socket.emit('enter', {'userName': userName});
}

/*
自身への処理。自身のuserIdを格納する。
引数 data = {
    userName: <ユーザ名>,
    userId: <ユーザID>,
    message: <入室メッセージ>,
}
*/
socket.on('receiveEnterEventMyself', function (data) {
    $('#userId').val(data.userId);
});


/*
サーバから受信した入室メッセージを画面上に表示する
引数 data = {
    userName: <ユーザ名>,
    userId: <ユーザID>,
    message: <入室メッセージ>,
}
*/
socket.on('receiveEnterEvent', function (data) {
    $('#thread').prepend('<p>' + data.message + '</p>');
});

socket.on('appendOnlineUsersEvent', function (data) {
    $('#onlineUsers').html('');
    for (let i = 0; i < data.length; i++) {
        let post = '<p>'
        if (data[i].id === socket.id) {
            post += '<span class="my-msg" style="font-weight:700;">' + data[i].name + 'さん' + '</span>'
                    + '</p>';
        } else {
            post += '<span class="member-msg member-name">' + data[i].name + 'さん' + '</span>'
                    + '<input type="hidden" value="' + data[i].id + '">'
                    + '</p>';
        }
        $('#onlineUsers').prepend(post);
    }
});
