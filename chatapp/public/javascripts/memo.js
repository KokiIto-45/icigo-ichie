'use strict';

// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // メモが入力されていない場合は投稿しない
    if (message && message.match(/\S/g)) {
        // メモの内容を投稿
        const memo = userName + "さんのメモ:<br>" + message;
        $('#thread').prepend('<p>' + memo + '</p>');
        $('#message').val("");
    }

    return false;
}
