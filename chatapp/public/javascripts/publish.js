'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // 自身のユーザ名を取得
    const userName = $('#userName').val();
    // 自身のユーザIDを取得
    const userId = $('#userId').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // ダイレクトメッセージ先のユーザID取得
    const toUserId = $('#toUserId').val();

    // 投稿内容を送信
    socket.emit('sendMessageEvent',{message: message, userName: userName, userId: userId, toUserId: toUserId});

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

    // 投稿のユーザ名クリック時の処理。その人へDMできるようにする。
    $(document).on('click', '.member-name', function(){
        // ユーザ名取得
        const toUserName = $(this).html();
        const publishTypeDM = '<div>' + toUserName + 'へDM' + '</div>'
                            + '<button type="button" class="btn-cancel-publish-type common-button">' + '解除' + '</button>';
        // ユーザID取得
        const toUserId = $(this).next().val();
        
        $('#publishType').html(publishTypeDM);
        $('#toUserId').val(toUserId);
    });

    // DM解除ボタン押下時の処理
    $(document).on('click', '.btn-cancel-publish-type', function(){
        // 投稿タイプを「全員に」
        $('#publishType').html('全員に送信');
        // DM先ユーザIDを空に
        $('#toUserId').val('');
    });
});

/*
サーバから受信した投稿メッセージを画面上に表示する
引数 data = {
    message: <投稿文>, 
    userName: <ユーザ名>, 
    userId: <ユーザID>, 
    toUserId: <ダイレクトメッセージ先ユーザID>,
    publishDate: <投稿日>,
}
*/
// 自身への処理
socket.on('receiveMyMessageEvent', function (data) {
    // 画面上にメッセージを表示
    let post = '<div>';
    post += '<p style="margin: 0;">';
    if (data.toUserId) {
        // ダイレクトメッセージの場合
        post += '<span class="badge badge-dm">DM</span>'
                + '<span class="my-msg" style="font-weight:700; margin-right:1rem;">' + data.userName + 'さん' + '</span>';
    } else {
        post += '<span class="my-msg" style="font-weight:700; margin-right:1rem;">' + data.userName + 'さん' + '</span>';    
    }
    post += '<span style="color:grey;">' + data.publishDate + '</span>'
            + '</p>'
            + '<p>' + data.message  + '</p>'
            + '</div>'
    $('#thread').prepend(post);
})
// 他人への処理
socket.on('receiveMemberMessageEvent', function (data) {
    // 画面上にメッセージを表示
    let post = '<div>';
    post += '<p style="margin: 0;">';
    if (data.toUserId) {
        // ダイレクトメッセージの場合
        post += '<span class="badge badge-dm">DM</span>';
    }
    post += '<span class="member-msg member-name" style="margin-right:1rem;">' + data.userName + 'さん' + '</span>'
            + '<input type="hidden" value="' + data.userId + '">'
            + '<span style="color:grey;">' + data.publishDate + '</span>'
            + '</p>'
            + '<p>' + data.message  + '</p>'
            + '</div>';
    $('#thread').prepend(post);
})