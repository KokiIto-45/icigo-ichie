'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // ダイレクトメッセージ先のユーザID取得
    const toUserId = $('#toUserId').val();

    // 投稿内容を送信
    socket.emit('sendMessageEvent',{message: message, userName: userName, toUserId: toUserId});

    $('#message').val("");

};

$(function() {
    $(document).on('keydown', 'body', function(e) {
       if ( !(e.key == 'Enter' && (e.metaKey == true || e.ctrlKey == true ) ) ) return;

        var $target = $(e.target);
        if ($target.is('input') || $target.is('textarea') || $target.is('select')) {
         publish();
        }
    });
});

/*
サーバから受信した投稿メッセージを画面上に表示する
引数 data = {
    message: <投稿文>, 
    userName: <ユーザ名>, 
    toUserId: <ダイレクトメッセージ先ユーザID>,
    publishDate: <投稿日>,
}
*/
socket.on('receiveMyMessageEvent', function (data) {
    // 画面上にメッセージを表示
    let post = '<div>';
    if (data.toUserId) {
        // ダイレクトメッセージの場合
        post += '<p style="margin: 0;">ダイレクトメッセージ</p>'
    }
    post += '<p style="margin: 0;">'
            + '<span class="my-msg" style="font-weight:700;">' + data.userName + 'さん ' + '</span>'
            + '<span style="color:grey;">' + data.publishDate + '</span>'
            + '</p>'
            + '<p>' + data.message  + '</p>'
            + '</div>'
    $('#thread').prepend(post);
})
socket.on('receiveMemberMessageEvent', function (data) {
    // 画面上にメッセージを表示
    let post = '<div>';
    if (data.toUserId) {
        // ダイレクトメッセージの場合
        post += '<p style="margin: 0;">' + data.userName + 'さんからのダイレクトメッセージ' + '</p>'
    }
    post += '<p style="margin: 0;">'
            + '<span class="member-msg" style="font-weight:700;">' + data.userName + 'さん ' + '</span>'
            + '<span style="color:grey;">' + data.publishDate + '</span>'
            + '</p>'
            + '<p>' + data.message  + '</p>'
            + '</div>'
    $('#thread').prepend(post);
})