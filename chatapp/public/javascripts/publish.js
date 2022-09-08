'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // 自身のユーザ名を取得
    const userName = $('#userName').val();
    // 自身のユーザIDを取得
    const userId = $('#userId').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // 投稿タイプ取得
    const publishType = $('#publishType').val();
    // ダイレクトメッセージ先のユーザ
    let toUserName = '';
    // ダイレクトメッセージ先のユーザID
    let toUserId = '';
    // 返信先の投稿内容
    let toText = '';


    if (publishType === 'dm') {
        // ダイレクトメッセージ先のユーザ名取得
        toUserName = $('#toUserName').html();
        // ダイレクトメッセージ先のユーザID取得
        toUserId = $('#toUserId').val();
    } else if (publishType === 'reply') {
        // 返信先の投稿内容取得
        toText = $('#toText').html();
    }

    // 投稿内容を送信
    socket.emit('sendMessageEvent', { message: message, userName: userName, userId: userId, publishType: publishType, toUserName: toUserName, toUserId: toUserId, toText: toText });

    $('#message').val("");

};

$(function () {
    $(document).on('keydown', 'body', function (e) {
        if (!(e.key == 'Enter' && (e.metaKey == true || e.ctrlKey == true))) return;

        var $target = $(e.target);
        if ($target.is('input') || $target.is('textarea') || $target.is('select')) {
            publish();
        }
    });

    // 投稿のユーザ名クリック時の処理。その人へDMできるようにする。
    $(document).on('click', '.member-name', function () {
        // ユーザ名取得
        const toUserName = $(this).html();
        // ユーザID取得
        const toUserId = $(this).next().val();
        // 投稿タイプメッセージ
        const publishTypeMsgDM = '<div>' + '<span id="toUserName">' + toUserName + '</span>' + 'へDM' + '</div>'
            + '<button type="button" class="btn-cancel-publish-type common-button">' + '解除' + '</button>'
            + '<input id="toUserId" type="hidden" value="' + toUserId + '">';
        // 投稿タイプを「DM」に
        $('#publishType').val('dm');
        // 投稿タイプメッセージをDM用に
        $('#publishTypeMsg').html(publishTypeMsgDM);
    });

    // DM解除ボタン押下時の処理
    $(document).on('click', '.btn-cancel-publish-type', function () {
        // 投稿タイプを「全員に」
        $('#publishType').val('all');
        // 投稿タイプメッセージを全員に送信用に
        $('#publishTypeMsg').html('全員に送信');
    });

    // 返信ボタン押下時の処理
    $(document).on('click', '.btn-change-type-reply', function () {
        // ユーザ名取得
        const quoteUserName = $('.member-name').html();
        const quotePublishDate = $('.member-name').next().next().html();
        // 投稿内容の取得
        const quoteMessage = $('.publish').html();
        // 投稿タイプメッセージ
        const publishTypeMsgReply = '<div class="publish-type-msg-title">'
            + '<div>' + '以下のメッセージに返信' + '</div>'
            + '<button type="button" class="btn-cancel-publish-type common-button">' + '解除' + '</button>'
            + '</div>'
            + '<div id="toText">' + '<blockquote style="margin:0;">'
            + '<p>' + '<span style="margin-right:1rem; font-weight:700">' + quoteUserName + '</span>' + quotePublishDate + '</p>'
            + '<p>' + quoteMessage + '</p>'
            + '</blockquote>' + '</div>';
        // 投稿タイプを「返信」に
        $('#publishType').val('reply');
        // 投稿タイプメッセージを返信用に
        $('#publishTypeMsg').html(publishTypeMsgReply);
    });
});

/*
サーバから受信した投稿メッセージを画面上に表示する
引数 data = {
    message: <投稿文>, 
    userName: <ユーザ名>, 
    userId: <ユーザID>, 
    toUserName: <ダイレクトメッセージ先ユーザ名>,
    toUserId: <ダイレクトメッセージ先ユーザID>,
    publishDate: <投稿日>,
    toText: <返信先投稿内容>,
}
*/
// 自身への処理
socket.on('receiveMyMessageEvent', function (data) {
    // 画面上にメッセージを表示
    let post = '<div>';
    post += '<p style="margin: 0;">';

    if (data.publishType === 'dm' && data.toUserId) {
        // ダイレクトメッセージの場合
        post += '<span class="badge badge-dm">DM</span>'
            + '<span class="my-msg" style="font-weight:700; margin-right:0.5rem;">' + data.userName + 'さん' + '</span>'
            + '<span style="margin-right:0.5rem;">' + 'to' + '</span>'
            + '<span class="member-msg member-name" style="margin-right:1rem;">' + data.toUserName + '</span>'
            + '<span style="color:grey;">' + data.publishDate + '</span>' + '</p>'
            + '<p class="publish">' + data.message + '</p>'
            + '</div>';
    } else if (data.publishType === 'reply' && data.toText) {
        // 返信の場合
        post += '<span class="my-msg" style="font-weight:700; margin-right:0.5rem;">' + data.userName + 'さん' + '</span>'
            + '<span style="color:grey;">' + data.publishDate + '</span>' + '</p>'
            + data.toText
            + '<p class="publish">' + data.message + '</p>'
            + '</div>';
        // 投稿タイプを「全員に」
        $('#publishType').val('all');
        // 投稿タイプメッセージを全員に送信用に
        $('#publishTypeMsg').html('全員に送信');
    } else {
        post += '<span class="my-msg" style="font-weight:700; margin-right:1rem;">' + data.userName + 'さん' + '</span>'
            + '<span style="color:grey;">' + data.publishDate + '</span>' + '</p>'
            + '<p class="publish">' + data.message + '</p>'
            + '</div>';
    }

    $('#thread').prepend(post);
})
// 他人への処理
socket.on('receiveMemberMessageEvent', function (data) {
    // 画面上にメッセージを表示
    let post = '<div>';
    post += '<p style="margin: 0;">';

    if (data.publishType === 'dm' && data.toUserId) {
        // ダイレクトメッセージの場合
        post += '<span class="badge badge-dm">DM</span>'
            + '<span class="member-msg member-name" style="margin-right:1rem;">' + data.userName + 'さん' + '</span>'
            + '<input type="hidden" value="' + data.userId + '">'
            + '<span style="color:grey;">' + data.publishDate + '</span>'
            + '</p>'
            + '<p class="publish">' + data.message + '</p>'
            + '</div>';
    } else if (data.publishType === 'reply') {
        // 返信の場合
        post += '<span class="member-msg member-name" style="margin-right:1rem;">' + data.userName + 'さん' + '</span>'
            + '<input type="hidden" value="' + data.userId + '">'
            + '<span style="color:grey;">' + data.publishDate + '</span>' + '</p>'
            + data.toText
            + '<p class="publish">' + data.message + '</p>'
            + '<button type="button" class="btn-change-type-reply reply-button">返信</button>'
            + '</div>';
        // 投稿タイプを「全員に」
        $('#publishType').val('all');
        // 投稿タイプメッセージを全員に送信用に
        $('#publishTypeMsg').html('全員に送信');
    } else {
        post += '<span class="member-msg member-name" style="margin-right:1rem;">' + data.userName + 'さん' + '</span>'
            + '<input type="hidden" value="' + data.userId + '">'
            + '<span style="color:grey;">' + data.publishDate + '</span>'
            + '</p>'
            + '<p class="publish">' + data.message + '</p>'
            + '<button type="button" class="btn-change-type-reply reply-button">返信</button>'
            + '</div>';
    }

    $('#thread').prepend(post);
})