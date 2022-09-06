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

$(function() {
    $(document).on('keydown', 'body', function(e) {
       if ( !(e.key == 'Enter' && (e.metaKey == true || e.ctrlKey == true ) ) ) return;

        var $target = $(e.target);
        if ($target.is('input') || $target.is('textarea') || $target.is('select')) {
         publish();
        }
    });
});

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMyMessageEvent', function (data) {
    // 画面上にメッセージを表示
    $('#thread').prepend('<div>'
                            + '<p style="margin: 0;">'
                                + '<span class="my-msg" style="font-weight:700;">' + data.userName + 'さん ' + '</span>'
                                + '<span style="color:grey;">' + data.publishDate + '</span>'
                            + '</p>'
                            + '<p>' + data.message  + '</p>'
                        + '</div>');
})
socket.on('receiveMemberMessageEvent', function (data) {
    // 画面上にメッセージを表示
    $('#thread').prepend('<div>'
                            + '<p style="margin: 0;">'
                                + '<span class="member-msg" style="font-weight:700;">' + data.userName + 'さん ' + '</span>'
                                + '<span style="color:grey;">' + data.publishDate + '</span>'
                            + '</p>'
                            + '<p>' + data.message  + '</p>'
                        + '</div>');
})


