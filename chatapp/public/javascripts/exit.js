'use strict';

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    const userName = $('#userName').val();
    // 退室メッセージイベントを送信する
    socket.emit('sendExitRoomEvent', {userName:userName});
    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('receiveExitRoomEvent', function (data) {
    $('#thread').prepend('<span class="member-msg">' + data.userName + 'さん' + '</span>'
    + '<span>が退室しました </span>'
    + '<span style="color:grey;">' + data.exitDate+ '</span>');
});

socket.on('deleteOnlineUsersEvent', function(data) {
    $('#onlineUsers').html('');
    for (let i = 0; i < data.length; i++) {
        let post = '<p>'
        if (data[i].id === socket.id) {
            post += '<span class="my-msg" style="font-weight:700;">' + data[i].name + 'さん' + '</span>'
                    + '</p>';
        } else {
            post += '<span class="member-msg">' + data[i].name + 'さん' + '</span>'
                    + '<input type="hidden" value="' + data[i].id + '">'
                    + '</p>';
        }
        $('#onlineUsers').prepend(post);
    }
})