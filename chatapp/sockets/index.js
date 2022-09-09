'use strict';

let onlineUsers = [];

module.exports = function (server) {

    const socketIo = require('socket.io')(server, { wsEngine: 'ws' });
    const io = socketIo.listen(server);

    io.sockets.on('connection', function (socket) {
        // 投稿モジュールの呼出
        require('./publish')(socket, io);

        // 入室モジュールの呼出
        require('./enter')(socket, io, onlineUsers);

        // 退室モジュールの呼出
        require('./exit')(socket, io, onlineUsers);

        // Socket 切断時の処理
        socket.on('disconnect', () => {
            // 切断された人の index 取得
            const index = onlineUsers.findIndex(user => user.id === socket.id);
            
            // ユーザが存在する場合（例外ない限りこれ）
            if (index >= 0) {
                // ユーザ名取得
                const userName = onlineUsers[index].name;

                // onlineUsers から削除
                onlineUsers.splice(index, 1);
            
                // 退室処理
                socket.broadcast.emit('receiveExitRoomEvent', `${userName}さんが退室しました。`);
                io.sockets.emit('deleteOnlineUsersEvent', onlineUsers);
            }
        });
    });
};
