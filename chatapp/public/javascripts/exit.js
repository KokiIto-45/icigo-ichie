'use strict';

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    const userName = $('#userName').val();
    // 退室メッセージイベントを送信する
    const message = userName + 'さんが退出しました'
    socket.emit('sendExitRoomEvent', message);
    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('receiveExitRoomEvent', function (data) {
    $('#thread').prepend('<p>' + data + '</p>');
});

socket.on('deleteOnlineUsersEvent', function(data) {
    $('#onlineUsers').html('');
    for (let i = 0; i < data.length; i++) {
        $('#onlineUsers').prepend('<p>' + `${data[i].name}（id: ${data[i].id}）` + '</p>');
    }
})