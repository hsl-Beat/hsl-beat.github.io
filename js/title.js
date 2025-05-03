var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "/img/beat-icon.png");
        document.title = '你在看什么呢？';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "/img/beat-icon.png");
        document.title = '回来啦！' + OriginTitle;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});