'use strict';

const express = require('express');
const router = express.Router();

// ログイン画面の表示
router.get('/', function (request, response, next) {
    let errorMessage = '';
    if (request.query.e == 1) {
        errorMessage = '同一のユーザ名が入室しています。違うユーザ名をご入力ください。'
    }
    response.render('index', { errorMessage: errorMessage });
});

// チャット画面の表示
router.post('/room', function (request, response, next) {
    console.log('ユーザ名：' + request.body.userName);
    response.render('room', { userName: request.body.userName });
});

module.exports = router;
