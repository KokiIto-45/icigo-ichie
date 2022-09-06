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
