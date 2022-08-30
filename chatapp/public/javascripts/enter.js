'use strict';

$(document).ready(enter());
// 入室メッセージをサーバに送信する
function enter() {
    // 入力されたユーザ名を取得する
    const userName = $('#userName').val();
    const message = userName + 'さんが入室しました'
    // 入室メッセージイベントを送信する
    socket.emit('enter', message);
}

// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveEnterEvent', function (data) {
    $('#thread').prepend('<p>' + data + '</p>');
});
