'use strict';
$(function (){ 
    $('.user-menu-for-smart-phone').on('click',function(){
    $('.left-container').not($($(this).attr('href'))).hide();

    // フェードイン・アウトのアニメーション付で、表示・非表示を交互に実行する
    $($(this).attr('href')).fadeToggle();
    });
});

