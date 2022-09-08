'use strict';
//投稿日を取得
const postDate = () => {
    const date = new Date();
    const nowDate = date.getFullYear()
        + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
        + '/' + ('0' + date.getDate()).slice(-2)
        + ' ' + ('0' + date.getHours()).slice(-2)
        + ':' + ('0' + date.getMinutes()).slice(-2);
    return nowDate}
module.exports = postDate
// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    //投稿日を取得
    const date = new Date();
    const nowDate = date.getFullYear()
            + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
            + '/' + ('0' + date.getDate()).slice(-2)
            + ' ' + ('0' + date.getHours()).slice(-2)
            + ':' + ('0' + date.getMinutes()).slice(-2);
    // メモが入力されていない場合は投稿しない
    if (message && message.match(/\S/g)) {
        // メモの内容を投稿
        $('#thread').prepend('<div>'
        + '<p style="margin: 0;">'
            +'<span class="badge badge-dm">MEMO</span>'+ '<span class="my-msg" style="font-weight:700;">' + userName + 'さん:MEMO ' + '</span>'
            + '<span style="color:grey;">' + postDate() + '</span>'
        + '</p>'
        + '<p>' + message + '</p>'
    + '</div>');
        $('#message').val("");
    }

    return false;
}
