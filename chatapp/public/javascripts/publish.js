'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    //入力した他人のIDを取得
    const toUserId = $('#toUserId').val();

    const userId = String($('#userId').text().replace("(id: " ,"").replace(")",""));

    // 投稿内容を送信
    socket.emit('sendMessageEvent',{message:message,userName:userName,toUserId:toUserId,userId:userId});

    $('#message').val("");

    return userId

};

// サーバから受信した投稿メッセージを画面上に表示する

socket.on('receiveMessageEvent', function (data) {
    // 画面上にメッセージを表示
    //自分のメッセージとメンバーのメッセージを区別
    if(data.userId===publish()){
        $('#thread').prepend('<p class="msg-me">' + data.userName +'さん:'+data.message + '</p>');
    }else{
        $('#thread').prepend('<p class="msg-member">' + data.userName +'さん:'+data.message + '</p>');
    }
})
